import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { FirebaseConfig } from '../configs/@';

// define service
class FirestoreService {
	constructor(
		private auth = getAuth(FirebaseConfig),
		private firestore = initializeFirestore(FirebaseConfig, {}),
		private storage = getStorage(),
	) {}

	get Auth() {
		return this.auth;
	}

	get Firestore() {
		return this.firestore;
	}

	get Storage() {
		return this.storage;
	}
}

// export service
export default new FirestoreService();
