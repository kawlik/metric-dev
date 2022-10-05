import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { UserDataType } from '../types/@';
import { FirebaseService, FirestoreService } from './@.service';

// define service
class UserDataService {
	private get userProfileDoc() {
		return doc(
			FirestoreService.collectionUserData,
			FirebaseService.Auth.currentUser?.phoneNumber!,
		);
	}

	saveUser = async (userData: UserDataType) => {
		await updateProfile(FirebaseService.Auth.currentUser!, {
			displayName: userData.displayName,
			photoURL: userData.displayPict,
		});

		return setDoc(this.userProfileDoc, userData);
	};
}

// export service
export default new UserDataService();
