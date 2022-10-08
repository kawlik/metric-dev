import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	AppPageAdvice,
	AppViewLoading,
	AppViewStack,
	BillChart,
	BillList,
} from '../components/@';
import { useContexts } from '../contexts/@';
import { BillListService } from '../services/@.service';
import { BillInfoType } from '../types/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	// component state
	const [bills, setBills] = useState<BillInfoType[]>([]);

	function openBillView(billID: string) {
		navigate(`/report/${billID}/`);
	}

	// component lifecycle
	useEffect(() => {
		BillListService.useBillType('reports');
		BillListService.subscribeOn(contexts.userAuth.get()?.phoneNumber!).subscribe((bills) =>
			setBills(bills),
		);

		return () => BillListService.unsubscribe();
	}, []);

	// component layout
	return (
		<>
			<AppViewLoading isLoading={!bills.length} />
			<AppViewStack flex={1} sx={{ overflowX: 'hidden', overflowY: 'scroll' }}>
				{!bills.length ? (
					<>
						<AppPageAdvice />
					</>
				) : (
					<>
						<BillChart bills={bills} />
						<BillList bills={bills} filters={[]} openBillView={openBillView} />
					</>
				)}
			</AppViewStack>
		</>
	);
}
