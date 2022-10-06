import { collection, orderBy, Query, query, QuerySnapshot, where } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService, FirestoreService } from './@.service';
import { BillInfoType } from '../types/@';
import { FirebaseCollection } from './utils/@';

// define service
class ReportsListService<T> extends FirebaseCollection<T> {
	constructor(feed: T, private billType: 'ledgers' | 'reports' = 'ledgers') {
		super(new BehaviorSubject<T>(feed));
	}

	useBillType = (type: 'ledgers' | 'reports'): void => {
		this.billType = type;
	};

	override register = (document: string): Query => {
		return this.billType === 'ledgers'
			? this.useLedger(document)
			: this.useReport(document);
	};

	override callback = (snapshot: QuerySnapshot): void => {
		const payload = snapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));

		this.subject$.next(payload as T);
	};

	private useLedger = (document: string) => {
		return query(
			collection(FirebaseService.Firestore, FirestoreService.BillInfo),
			where('participants', 'array-contains', document),
			where('timestampClosed', '==', null),
		);
	};

	private useReport = (document: string) => {
		return query(
			collection(FirebaseService.Firestore, FirestoreService.BillInfo),
			where('participants', 'array-contains', document),
			where('timestampClosed', '!=', null),
			orderBy('timestampClosed', 'desc'),
		);
	};
}

// export service
export default new ReportsListService<BillInfoType[]>([]);
