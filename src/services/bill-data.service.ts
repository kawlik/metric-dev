import { doc, DocumentSnapshot } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { FirestoreService } from './@.service';
import { BillDataType } from '../types/@';
import { FirebaseDocument } from './utils/@';

// define service
class BillDataService<T> extends FirebaseDocument<T> {
	constructor() {
		super(new Subject<T>());
	}

	override register = (document: string) => {
		return doc(FirestoreService.collectionBillData, document);
	};

	override callback = (snapshot: DocumentSnapshot) => {
		const payload = { ...snapshot.data(), id: snapshot.id } || null;

		this.subject$.next(payload as T);
	};
}

// export service
export default new BillDataService<BillDataType | null>();
