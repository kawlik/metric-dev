import { collection } from 'firebase/firestore';
import { FirebaseService } from './@.service';

// define service
class FirestoreService {
	constructor(private listInfo = 'bill-info', private billMemo = 'bill-memo') {}

	get BillInfo() {
		return this.listInfo;
	}

	get BillMemo() {
		return this.billMemo;
	}

	get collectionBillInfo() {
		return collection(FirebaseService.Firestore, this.BillInfo);
	}

	get collectionBillMemo() {
		return collection(FirebaseService.Firestore, this.BillMemo);
	}
}

// export service
export default new FirestoreService();
