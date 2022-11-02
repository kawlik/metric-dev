import jsPDF from 'jspdf';
import moment from 'moment';
import html2canvas from 'html2canvas';

import { AttachMoney, QuestionMark } from '@mui/icons-material';
import { BillPlanIconMap, BillTypeIconMap } from '../configs/@';

// define dervice
class AppNormsService {
	constructor(
		private formatPhone = Intl.NumberFormat('en', { notation: 'compact' }),
		private formatPDFA4 = { x: 595.28, y: 841.89 },
	) {}

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
		return this.formatPhone.format(value);
	};

	normalizePDF = async (documentHTML: HTMLElement, filename?: string): Promise<void> => {
		const canvas = await html2canvas(documentHTML);
		const worker = new jsPDF();

		const offsetX = (100 * canvas.width) / this.formatPDFA4.x;
		const offsetY = (100 * canvas.height) / this.formatPDFA4.x;

		worker.addImage(canvas, 'JPEG', 0, 0, offsetX, offsetY);
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
