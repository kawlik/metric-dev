import moment from 'moment';
import { QuestionMark, Receipt } from '@mui/icons-material';
import { BillPlanIconMap, BillTypeIconMap } from '../configs/@';

// define dervice
class AppNormsService {
	constructor(private format = Intl.NumberFormat('en', { notation: 'compact' })) {}

	normalizeBillPlanIcon = (value: string) => {
		return BillPlanIconMap.get(value) || QuestionMark;
	};

	normalizeBillTypeIcon = (value: string) => {
		return BillTypeIconMap.get(value) || Receipt;
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
