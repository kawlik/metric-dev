import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { FirebaseConfig } from '../configs/@';

// define service
class FirestoreService {
	constructor(
		private auth = getAuth(FirebaseConfig),
		private firestore = initializeFirestore(FirebaseConfig, {}),
	) {}

	get Auth() {
		return this.auth;
	}

	get Firestore() {
		return this.firestore;
	}
}

// export service
export default new FirestoreService();
