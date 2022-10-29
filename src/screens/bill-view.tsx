import { useEffect } from 'react';
import { Outlet as PageOutlet, useNavigate, useParams } from 'react-router-dom';
import { AppViewIOSChin, AppViewLoading, BillViewTopbar } from '../components/@';
import { useContexts } from '../contexts/@';
import { AppNormsService, BillDataService, BillInfoService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();
	const pathname = useParams();

	const billID = pathname['billID']?.split('/')[0];
	const billValid = contexts.billInfo.get()?.timestampValidTo.toMillis();
	const billLabel = contexts.billInfo.get()?.title;
	const isLoading = contexts.billInfo.get() === null;

	const timestampBill = AppNormsService.normalizeMoment(billValid).valueOf();
	const timestampUnix = AppNormsService.normalizeMoment().valueOf();

	const isLedger = timestampBill > timestampUnix;
	const isReport = timestampBill < timestampUnix;

	function goBack() {
		navigate(-1);
	}

	function openModify() {
		alert('Sorry, the selected functionality is not available yet.');
	}

	function openReport() {
		alert('Sorry, the selected functionality is not available yet.');
	}

	function openStats() {
		alert('Sorry, the selected functionality is not available yet.');
	}

	// component lifecycle
	useEffect(() => {
		BillDataService.subscribeOn(billID!).subscribe((billData) => {
			contexts.billData.set(billData);
		});

		BillInfoService.subscribeOn(billID!).subscribe((billInfo) => {
			contexts.billInfo.set(billInfo);
		});

		return () => {
			BillDataService.unsubscribe();
			BillInfoService.unsubscribe();

			contexts.billData.set(null);
			contexts.billInfo.set(null);
		};
	}, []);

	useEffect(() => {
		if (isLedger) navigate(`/ledger/${billID}`, { replace: true });
		if (isReport) navigate(`/report/${billID}`, { replace: true });
	}, [isLedger, isReport]);

	// component layout
	return (
		<>
			<AppViewLoading isLoading={isLoading} />
			<BillViewTopbar
				goBack={goBack}
				isLedger={isLedger}
				isReport={isReport}
				label={billLabel || ''}
				openModify={openModify}
				openReport={openReport}
				openStats={openStats}
			/>
			<PageOutlet />
			<AppViewIOSChin />
		</>
	);
}
