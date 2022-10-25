import { useEffect } from 'react';
import { Outlet as PageOutlet, useNavigate, useParams } from 'react-router-dom';
import { AppViewIOSChin, AppViewLoading, BillViewTopbar } from '../components/@';
import { useContexts } from '../contexts/@';
import { BillDataService, BillInfoService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();
	const pathname = useParams();

	const billID = pathname['billID']?.split('/')[0];
	const billLabel = contexts.billInfo.get()?.title || '';
	const isLoading = contexts.billInfo.get() === null;

	function goBack() {
		navigate(-1);
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

	// component layout
	return (
		<>
			<AppViewLoading isLoading={isLoading} />
			<BillViewTopbar goBack={goBack} label={billLabel} />
			<PageOutlet />
			<AppViewIOSChin />
		</>
	);
}
