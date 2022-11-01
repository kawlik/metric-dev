import jsPDF from 'jspdf';
import moment from 'moment';
import html2canvas from 'html2canvas';

import { AttachMoney, QuestionMark } from '@mui/icons-material';
import { BillPlanIconMap, BillTypeIconMap } from '../configs/@';

// define dervice
class AppNormsService {
	constructor(private format = Intl.NumberFormat('en', { notation: 'compact' })) {}

	normalizeBillPlanIcon = (value: string) => {
		return BillPlanIconMap.get(value) || QuestionMark;
	};

	normalizeBillTypeIcon = (value: string) => {
		return BillTypeIconMap.get(value) || AttachMoney;
	};

	normalizeColor = (value: string): string => {
		const base = (this.prepareHash(value) & 0x00ffffff).toString(16).toUpperCase();

		return '#' + '000000'.substring(0, 6 - base.length) + base;
	};

	normalizeMoment = (value?: moment.MomentInput) => moment(value);

	normalizeNumber = (value: number): string => {
		return this.format.format(value);
	};

	normalizePDF = async (documentHTML: HTMLElement, filename?: string): Promise<void> => {
		const canvas = await html2canvas(documentHTML);
		const worker = new jsPDF();

		worker.addImage(canvas, 'JPEG', 0, 0, canvas.width / 5, canvas.height / 5);
		worker.save(filename);
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
