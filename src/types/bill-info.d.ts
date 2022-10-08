import { Timestamp } from 'firebase/firestore';

export default interface BillInfo {
	id?: string;
	balance: number;
	participants: string[];
	timestampClosed: Timestamp | null;
	timestampCreated: Timestamp;
	timestampUpdated: Timestamp;
	title: string;
}
