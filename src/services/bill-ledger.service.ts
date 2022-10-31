import {
	collection,
	doc,
	orderBy,
	Query,
	query,
	QuerySnapshot,
	runTransaction,
	Timestamp,
	where,
	writeBatch,
} from 'firebase/firestore';
import { async, Subject } from 'rxjs';
import { FirebaseService, FirestoreService } from './@.service';
import { BillDataType, BillInfoType } from '../types/@';
import { FirebaseCollection } from './utils/@';

// define service
class BillLedger<T> extends FirebaseCollection<T> {
	constructor() {
		super(new Subject<T>());
	}

	override register = (document: string): Query => {
		return query(
			collection(FirebaseService.Firestore, FirestoreService.BillInfo),
			where('participants', 'array-contains', document),
			where('timestampValidTo', '>=', Timestamp.now()),
			orderBy('timestampValidTo', 'desc'),
			orderBy('timestampUpdated', 'desc'),
		);
	};

	override callback = (snapshot: QuerySnapshot): void => {
		const payload = snapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));

		this.subject$.next(payload as T);
	};

	openLedger = async (data: {
		deadline: number;
		expensesPlan: string[];
		participants: string[];
		title: string;
		type: string;
	}): Promise<string> => {
		const batch = writeBatch(FirebaseService.Firestore);

		const billDataRef = doc(FirestoreService.collectionBillData);
		const billInfoRef = doc(FirestoreService.collectionBillInfo, billDataRef.id);

		batch.set(billDataRef, <BillDataType>{
			posts: [],
			plans: data.expensesPlan.map((plan) => ({
				limit: 0,
				title: plan,
			})),
		});

		batch.set(billInfoRef, <BillInfoType>{
			balance: 0,
			participants: data.participants,
			timestampCreated: Timestamp.now(),
			timestampUpdated: Timestamp.now(),
			timestampValidTo: Timestamp.fromMillis(data.deadline),
			title: data.title,
			type: data.type,
		});

		await batch.commit();

		return billInfoRef.id;
	};

	closeLedger = async (document: string): Promise<void> => {
		await runTransaction(FirebaseService.Firestore, async (transaction) => {
			transaction.update(doc(FirestoreService.collectionBillInfo, document), {
				timestampValidTo: Timestamp.now(),
			});
		});
	};
}

// export service
export default new BillLedger<BillInfoType[]>();
