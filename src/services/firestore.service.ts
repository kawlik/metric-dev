import { collection } from 'firebase/firestore';
import { FirebaseService } from './@.service';

// define service
class FirestoreService {
	constructor(
		private listInfo = 'bill-info',
		private billMemo = 'bill-memo',
		private userData = 'user-data',
	) {}

	get BillInfo() {
		return this.listInfo;
	}

	get BillMemo() {
		return this.billMemo;
	}

	get UserData() {
		return this.userData;
	}

	get collectionBillInfo() {
		return collection(FirebaseService.Firestore, this.BillInfo);
	}

	get collectionBillMemo() {
		return collection(FirebaseService.Firestore, this.BillMemo);
	}

	get collectionUserData() {
		return collection(FirebaseService.Firestore, this.UserData);
	}
}

// export service
export default new FirestoreService();
