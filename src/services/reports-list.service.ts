import { collection, Query, query, QuerySnapshot, where } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService, FirestoreService } from './@';
import { BillInfoType } from '../types/@';
import { FirebaseCollection } from './utils/@';

// define service
class ReportsListService<T> extends FirebaseCollection<T> {
	constructor(feed: T) {
		super(new BehaviorSubject<T>(feed));
	}

	override register = (document: string): Query => {
		return query(
			collection(FirebaseService.Firestore, FirestoreService.BillInfo),
			where('participants', 'array-contains', document),
			where('timestampClosed', '==', null),
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
export default new ReportsListService<BillInfoType[]>([]);
