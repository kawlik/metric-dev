import {
	collection,
	orderBy,
	Query,
	query,
	QuerySnapshot,
	Timestamp,
	where,
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService, FirestoreService } from './@.service';
import { BillInfoType } from '../types/@';
import { FirebaseCollection } from './utils/@';

// define service
class BillReport<T> extends FirebaseCollection<T> {
	constructor(feed: T, private billType: 'ledgers' | 'reports' = 'ledgers') {
		super(new BehaviorSubject<T>(feed));
	}

	override register = (document: string): Query => {
		return query(
			collection(FirebaseService.Firestore, FirestoreService.BillInfo),
			where('participants', 'array-contains', document),
			where('timestampClosed', '<=', Timestamp.now()),
			orderBy('timestampClosed', 'desc'),
			orderBy('timestampUpdated', 'desc'),
		);
	};

	override callback = (snapshot: QuerySnapshot): void => {
		const payload = snapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));

		this.subject$.next(payload as T);
	};
}

// export service
export default new BillReport<BillInfoType[] | undefined>(undefined);
