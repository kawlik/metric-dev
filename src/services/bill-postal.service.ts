import { arrayRemove, arrayUnion, doc, runTransaction, Timestamp } from 'firebase/firestore';
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

	private updateInfo = (updatedBalance: number) => {
		return {
			balance: updatedBalance,
			timestampUpdated: Timestamp.now(),
		};
	};

	post = async (document: string, balance: number, text: string): Promise<void> => {
		const post: BillPostType = {
			time: Timestamp.now(),
			user: FirebaseService.Auth.currentUser?.phoneNumber!,
			post: {
				text: text,
				type: 'Post',
			},
		};

		await runTransaction(FirebaseService.Firestore, async (transaction) => {
			transaction.update(this.getDataRef(document), this.updateData(post));
			transaction.update(this.getInfoRef(document), this.updateInfo(balance));
		});
	};

	postExpense = async (
		document: string,
		balance: number,
		data: {
			cost: number;
			plan: string;
			text: string;
		},
	): Promise<void> => {
		const post: BillPostType = {
			time: Timestamp.now(),
			user: FirebaseService.Auth.currentUser?.phoneNumber!,
			post: {
				cost: data.cost,
				plan: data.plan,
				text: data.text,
				type: 'Expense',
			},
		};

		await runTransaction(FirebaseService.Firestore, async (transaction) => {
			transaction.update(this.getDataRef(document), this.updateData(post));
			transaction.update(this.getInfoRef(document), this.updateInfo(balance + data.cost));
		});
	};

	postObjective = async (
		document: string,
		balance: number,
		data: {
			more: string;
			text: string;
		},
	): Promise<void> => {
		const post: BillPostType = {
			time: Timestamp.now(),
			user: FirebaseService.Auth.currentUser?.phoneNumber!,
			post: {
				done: false,
				more: data.more,
				text: data.text,
				type: 'Objective',
			},
		};

		await runTransaction(FirebaseService.Firestore, async (transaction) => {
			transaction.update(this.getDataRef(document), this.updateData(post));
			transaction.update(this.getInfoRef(document), this.updateInfo(balance));
		});
	};

	postObjectiveDone = async (document: string, objective: BillPostType): Promise<void> => {
		if (objective.post.type !== 'Objective') {
			throw 'Invalid post type!';
		}

		const updated: BillPostType = {
			time: Timestamp.now(),
			user: objective.user,
			post: {
				done: true,
				more: objective.post.more,
				text: objective.post.text,
				type: 'Objective',
			},
		};

		await runTransaction(FirebaseService.Firestore, async (transaction) => {
			transaction.update(this.getDataRef(document), { posts: arrayRemove(objective) });
			transaction.update(this.getDataRef(document), { posts: arrayUnion(updated) });
		});
	};
}

export default new BillPostalService();
