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
	constructor(private plansMap = new Map<string, FunctionComponent>()) {
		super(new Subject<T>());

		this.plansMap.set('Clothing', Checkroom);
		this.plansMap.set('Education', School);
		this.plansMap.set('Entertainment', Attractions);
		this.plansMap.set('Food', Fastfood);
		this.plansMap.set('Fees', Receipt);
		this.plansMap.set('Health', HealthAndSafety);
		this.plansMap.set('Household', Home);
		this.plansMap.set('Mobility', EvStation);
		this.plansMap.set('Other', QuestionMark);
	}

	override register = (document: string) => {
		return doc(FirestoreService.collectionBillInfo, document);
	};

	override callback = (snapshot: DocumentSnapshot) => {
		const payload = snapshot.data() || null;

		this.subject$.next(payload as T);
	};

	get AvailablePlansMap() {
		return this.plansMap;
	}
}

// export service
export default new BillDataService<BillDataType | null>();
