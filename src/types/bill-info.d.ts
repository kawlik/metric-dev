import { Timestamp } from 'firebase/firestore';

export default interface BillInfo {
	id?: string;
	participants: string[];
	timestampClosed: Timestamp | null;
	timestampCreated: Timestamp;
	timestampUpdated: Timestamp;
	title: string;
}
