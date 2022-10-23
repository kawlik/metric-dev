import { doc, DocumentSnapshot } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { FirestoreService } from './@.service';
import { BillDataType } from '../types/@';
import { FirebaseDocument } from './utils/@';
import { FunctionComponent } from 'react';
import {
	Attractions,
	Checkroom,
	ConnectWithoutContact,
	EvStation,
	Fastfood,
	HealthAndSafety,
	Home,
	QuestionMark,
	Receipt,
	School,
} from '@mui/icons-material';

// define service
class BillDataService<T> extends FirebaseDocument<T> {
	constructor() {
		super(new Subject<T>());
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
export default new BillDataService<BillDataType | null>();
