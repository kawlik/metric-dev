import { UserPostType } from './@';

export default interface BillPost {
	post: UserPostType;
	time: Timestamp;
	user: string;
}
