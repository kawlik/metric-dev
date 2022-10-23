import { Timestamp } from 'firebase/firestore';
import UserBillTypes from './user-bill-types';

export default interface BillInfo {
	id?: string;
	balance: number;
	participants: string[];
	timestampCreated: Timestamp;
	timestampUpdated: Timestamp;
	timestampValidTo: Timestamp;
	title: string;
	type: UserBillTypes;
}
