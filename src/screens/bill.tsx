import { useEffect } from 'react';
import { Outlet as PageOutlet, useNavigate, useParams } from 'react-router-dom';
import { BillTopbar } from '../components/@';
import { useContexts } from '../contexts/@';
import { BillItemService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();
	const pathname = useParams();

	const billID = pathname['billID']?.split('/')[0];
	const label = contexts.activeBill.get()?.title!;

	function goBack() {
		navigate(-1);
	}

	// component lifecycle
	useEffect(() => {
		BillItemService.subscribeOn(billID!).subscribe((billInfo) =>
			contexts.activeBill.set(billInfo),
		);

		return () => BillItemService.unsubscribe();
	}, []);

	// component layout
	return (
		<>
			<BillTopbar goBack={goBack} label={label} />
			<PageOutlet />
		</>
	);
}
