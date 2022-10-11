import { doc, DocumentSnapshot } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { FirestoreService } from './@.service';
import { BillInfoType, BillDataType } from '../types/@';
import { FirebaseDocument } from './utils/@';

// define service
class BillDataService<T> extends FirebaseDocument<T> {
	constructor(feed: T) {
		super(new BehaviorSubject<T>(feed));
	}

	override register = (document: string) => {
		return doc(FirestoreService.collectionBillInfo, document);
	};

	override callback = (snapshot: DocumentSnapshot) => {
		const payload = snapshot.data() || null;

		this.subject$.next(payload as T);
	};
}

// export service
export default new BillDataService<BillDataType | null>(null);
