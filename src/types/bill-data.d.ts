import { BillPlanType, BillPostType } from './@';

export default interface BillData {
	plans: BillPlanType[];
	posts: BillPostType[];
}
