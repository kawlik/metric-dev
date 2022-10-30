import { arrayUnion, doc, Timestamp, writeBatch } from 'firebase/firestore';
import { BillPostType } from '../types/@';
import { FirebaseService, FirestoreService } from './@.service';

class BillPostalService {
	private getDataRef = (document: string) => {
		return doc(FirestoreService.collectionBillData, document);
	};

	private getInfoRef = (document: string) => {
		return doc(FirestoreService.collectionBillInfo, document);
	};

	private updateData = (payload: BillPostType) => {
		return {
			posts: arrayUnion(payload),
		};
	};

	private updateInfo = () => {
		return {
			timestampUpdated: Timestamp.now(),
		};
	};

	post = async (document: string, postMessage: string): Promise<void> => {
		const batch = writeBatch(FirebaseService.Firestore);

		const post: BillPostType = {
			time: Timestamp.now(),
			user: FirebaseService.Auth.currentUser?.phoneNumber!,
			post: {
				post: postMessage,
				type: 'Post',
			},
		};

		batch.update(this.getDataRef(document), this.updateData(post));
		batch.update(this.getInfoRef(document), this.updateInfo());

		await batch.commit();
	};
}

export default new BillPostalService();
