import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { FirebaseService } from './@.service';

// define service
class StorageCloudService {
	constructor(private userPicture = 'user-picture') {}

	uploadUserPicture = async (data: string): Promise<string> => {
		const snapshot = await uploadString(this.getUserPictureRef(), data, 'data_url');

		return getDownloadURL(snapshot.ref);
	};

	private getUserPictureRef() {
		return ref(FirebaseService.Storage, this.getUserPictureUrl());
	}

	private getUserPictureUrl() {
		return `${this.userPicture}/${FirebaseService.Auth.currentUser?.phoneNumber!}`;
	}
}

// export service
export default new StorageCloudService();
