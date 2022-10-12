import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	AppPageEmpty,
	AppViewLoading,
	AppViewStack,
	BillViewChart,
	BillViewList,
} from '../components/@';
import { useContexts } from '../contexts/@';
import { BillReportService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const billsList = contexts.savedReports.get();
	const isLoading = billsList === undefined;

	function openBillView(billID: string) {
		navigate(`/report/${billID}/`);
	}

	// component lifecycle
	useEffect(() => {
		BillReportService.subscribeOn(contexts.userAuth.get()?.phoneNumber!).subscribe(
			(bills) => contexts.savedReports.set(bills),
		);

		return () => BillReportService.unsubscribe();
	}, []);

	// component layout
	return (
		<>
			<AppViewLoading isLoading={isLoading} />
			<AppViewStack flex={1} sx={{ overflowX: 'hidden', overflowY: 'scroll' }}>
				{Array.isArray(billsList) && billsList?.length === 0 && <AppPageEmpty />}
				{Array.isArray(billsList) && billsList?.length !== 0 && (
					<>
						<BillViewChart bills={billsList} />
						<BillViewList
							bills={billsList}
							filters={[]}
							openBillView={openBillView}
						/>
					</>
				)}
			</AppViewStack>
		</>
	);
}
