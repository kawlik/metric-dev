import { collection, orderBy, Query, query, QuerySnapshot, where } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { FirebaseService, FirestoreService } from './@.service';
import { BillInfoType } from '../types/@';
import { FirebaseCollection } from './utils/@';

// define service
class LedgerListService<T> extends FirebaseCollection<T> {
	constructor() {
		super(new Subject<T>());
	}

	override register = (document: string): Query => {
		return query(
			collection(FirebaseService.Firestore, FirestoreService.BillInfo),
			where('participants', 'array-contains', document),
			where('timestampClosed', '!=', null),
			orderBy('timestampClosed', 'desc'),
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
export default new LedgerListService<BillInfoType[]>();
