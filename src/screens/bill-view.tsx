import { useEffect } from 'react';
import { Outlet as PageOutlet, useNavigate, useParams } from 'react-router-dom';
import { BillViewTopbar } from '../components/@';
import { useContexts } from '../contexts/@';
import { BillInfoService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();
	const pathname = useParams();

	const billID = pathname['billID']?.split('/')[0];
	const label = contexts.billCurrent.get()?.title || '';

	function goBack() {
		navigate(-1);
	}

	// component lifecycle
	useEffect(() => {
		BillInfoService.subscribeOn(billID!).subscribe((billInfo) => {
			contexts.billCurrent.set(billInfo);
		});

		return () => BillInfoService.unsubscribe();
	}, []);

	// component layout
	return (
		<>
			<BillViewTopbar goBack={goBack} label={label} />
			<PageOutlet />
		</>
	);
}
