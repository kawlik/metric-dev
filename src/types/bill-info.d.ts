import { Timestamp } from 'firebase/firestore';

export default interface BillInfo {
	id?: string;
	balance: number;
	participants: string[];
	timestampCreated: Timestamp;
	timestampUpdated: Timestamp;
	timestampValidTo: Timestamp;
	title: string;
	type: string;
}
