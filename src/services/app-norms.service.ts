import moment from 'moment';
import { QuestionMark } from '@mui/icons-material';
import { BillPlanIcon, BillTypeIcon } from '../configs/@';
import { UserBillPlansType, UserBillTypesType } from '../types/@';

// define dervice
class AppNormsService {
	constructor(private format = Intl.NumberFormat('en', { notation: 'compact' })) {}

	normalizeBillPlanIcon = (value: UserBillPlansType) => {
		return BillPlanIcon.get(value) || QuestionMark;
	};

	normalizeBillTypeIcon = (value: UserBillTypesType) => {
		return BillTypeIcon.get(value) || QuestionMark;
	};

	normalizeColor = (value: string): string => {
		const base = (this.prepareHash(value) & 0x00ffffff).toString(16).toUpperCase();

		return '#' + '000000'.substring(0, 6 - base.length) + base;
	};

	normalizeMoment = (value?: moment.MomentInput) => moment(value);

	normalizeNumber = (value: number): string => {
		return this.format.format(value);
	};

	private prepareHash = (base: string): number => {
		let hash = 0;

		for (let i = 0; i < base.length; i++) {
			hash = base.charCodeAt(i) + ((hash << 5) - hash);
		}

		return hash;
	};
}

// export service
export default new AppNormsService();
