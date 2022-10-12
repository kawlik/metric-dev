import { Timestamp } from 'firebase/firestore';

export default interface BillInfo {
	id?: string;
	balance: number;
	participants: string[];
	timestampClosed: Timestamp;
	timestampCreated: Timestamp;
	timestampUpdated: Timestamp;
	title: string;
}
