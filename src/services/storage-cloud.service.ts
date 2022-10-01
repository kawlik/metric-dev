import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FirebaseService } from './@.service';

// define service
class StorageCloudService {
	constructor(private userPicture = 'user-picture') {}

	uploadUserPicture = async (file: File): Promise<string> => {
		console.log(file);

		const snapshot = await uploadBytes(this.getUserPictureRef(file), file);

		return getDownloadURL(snapshot.ref);
	};

	private getUserPictureRef(file: File) {
		return ref(FirebaseService.Storage, this.getUserPictureUrl(file));
	}

	private getUserPictureUrl(file: File) {
		return `${this.userPicture}/${FirebaseService.Auth.currentUser?.uid!}`;
	}
}

// export service
export default new StorageCloudService();
