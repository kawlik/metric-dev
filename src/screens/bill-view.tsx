import { useEffect } from 'react';
import { Outlet as PageOutlet, useNavigate, useParams } from 'react-router-dom';
import { AppViewIOSChin, AppViewLoading, BillViewTopbar } from '../components/@';
import { useContexts } from '../contexts/@';
import { BillInfoService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();
	const pathname = useParams();

	const billID = pathname['billID']?.split('/')[0];
	const billLabel = contexts.billCurrent.get()?.title || '';
	const isLoading = contexts.billCurrent.get() === null;

	function goBack() {
		navigate(-1);
	}

	// component lifecycle
	useEffect(() => {
		BillInfoService.subscribeOn(billID!).subscribe((billInfo) => {
			contexts.billCurrent.set(billInfo);
		});

		return () => {
			contexts.billCurrent.set(null);
			BillInfoService.unsubscribe();
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
