import { useEffect, useState } from 'react';
import { Outlet as PageOutlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppViewIOSChin, AppViewLoading, BillViewTopbar } from '../components/@';
import { useContexts } from '../contexts/@';
import {
	AppAlertService,
	AppNormsService,
	BillDataService,
	BillInfoService,
	BillLedgerService,
} from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();
	const location = useLocation();
	const pathname = useParams();

	const actionMore = location.pathname.includes('more');
	const actionPost = location.pathname.includes('post');
	const billID = pathname['billID']?.split('/')[0];
	const billValid = contexts.billInfo.get()?.timestampValidTo.toMillis();
	const billLabel = contexts.billInfo.get()?.title;
	const isLoading = contexts.billInfo.get() === null;

	const timestampBill = AppNormsService.normalizeMoment(billValid).valueOf();
	const timestampUnix = AppNormsService.normalizeMoment().valueOf();

	const isLedger = timestampBill > timestampUnix;
	const isReport = timestampBill < timestampUnix;

	// component state
	const [isPending, setIsPending] = useState(false);

	function goBack() {
		navigate(-1);
	}

	function openModify() {
		navigate(location.pathname + 'more/modify/');
	}

	function openStats() {
		navigate(location.pathname + 'more/statistics/');
	}

	async function openReport() {
		if (confirm('Are you sure you want to close the current ledger?')) {
			setIsPending(true);

			try {
				await BillLedgerService.closeLedger(billID!);
			} catch (error) {
				AppAlertService.error();
			}

			setIsPending(false);
		}
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
		// if (isLedger) navigate(`/ledger/${billID}`, { replace: true });
		// if (isReport) navigate(`/report/${billID}`, { replace: true });
	}, [isLedger, isReport]);

	// component layout
	return (
		<>
			<AppViewLoading isLoading={isLoading || isPending} />
			<BillViewTopbar
				goBack={goBack}
				isAction={actionMore || actionPost}
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
