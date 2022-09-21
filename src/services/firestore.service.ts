import { collection } from 'firebase/firestore';
import { FirebaseService } from './@';

// define service
class FirestoreService {
	constructor(private billData = 'bill-data', private listInfo = 'bill-info') {}

	get BillData() {
		return this.billData;
	}

	get BillInfo() {
		return this.listInfo;
	}

	get collectionBillData() {
		return collection(FirebaseService.Firestore, this.BillData);
	}

	get collectionBillInfo() {
		return collection(FirebaseService.Firestore, this.BillInfo);
	}
}

// export service
export default new FirestoreService();
