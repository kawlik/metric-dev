import { BillInfoType } from '../types/@';

// define service
class StorageLocalService {
	private readonly keyStorageLedgers = 'metric-storage-ledgers';
	private readonly keyStorageReports = 'metric-storage-reports';

	get Ledgers(): BillInfoType[] | undefined {
		if (!localStorage.getItem(this.keyStorageLedgers)) return undefined;

		return JSON.parse(localStorage.getItem(this.keyStorageLedgers)!);
	}

	get Reports(): BillInfoType[] | undefined {
		if (!localStorage.getItem(this.keyStorageReports)) return undefined;

		return JSON.parse(localStorage.getItem(this.keyStorageReports)!);
	}

	saveLedgers = (ledgers: BillInfoType[] | undefined): void => {
		if (!ledgers) return;

		localStorage.setItem(this.keyStorageLedgers, JSON.stringify(ledgers));
	};

	saveReports = (reports: BillInfoType[] | undefined): void => {
		if (!reports) return;

		localStorage.setItem(this.keyStorageReports, JSON.stringify(reports));
	};
}

// export service
export default new StorageLocalService();
