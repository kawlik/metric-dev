import { collection } from 'firebase/firestore';
import { FirebaseService } from './@.service';

// define service
class FirestoreService {
	constructor(
		private billInfo = 'bill-info',
		private billData = 'bill-data',
		private userData = 'user-data',
	) {}

	get BillInfo() {
		return this.billInfo;
	}

	get BillData() {
		return this.billData;
	}

	get UserData() {
		return this.userData;
	}

	get collectionBillInfo() {
		return collection(FirebaseService.Firestore, this.BillInfo);
	}

	get collectionBillData() {
		return collection(FirebaseService.Firestore, this.BillData);
	}

	get collectionUserData() {
		return collection(FirebaseService.Firestore, this.UserData);
	}
}

// export service
export default new FirestoreService();
