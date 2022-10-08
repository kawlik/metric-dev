import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	AppPageAdvice,
	AppViewLoading,
	AppViewStack,
	BillChart,
	BillFLoat,
	BillList,
} from '../components/@';
import { useContexts } from '../contexts/@';
import { BillLedgerService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const billsList = contexts.savedLedgers.get();
	const isLoading = billsList === undefined;

	function openBillCreate() {}

	function openBillView(billID: string) {
		navigate(`/ledger/${billID}/`);
	}

	// component lifecycle
	useEffect(() => {
		BillLedgerService.subscribeOn(contexts.userAuth.get()?.phoneNumber!).subscribe(
			(bills) => contexts.savedLedgers.set(bills),
		);

		return () => BillLedgerService.unsubscribe();
	}, []);

	// component layout
	return (
		<>
			<AppViewLoading isLoading={isLoading} />
			<AppViewStack flex={1} sx={{ overflowX: 'hidden', overflowY: 'scroll' }}>
				<BillFLoat openBillCreate={openBillCreate} />
				{Array.isArray(billsList) && billsList?.length === 0 && <AppPageAdvice />}
				{Array.isArray(billsList) && billsList?.length !== 0 && (
					<>
						<BillChart bills={billsList} />
						<BillList bills={billsList} filters={[]} openBillView={openBillView} />
					</>
				)}
			</AppViewStack>
		</>
	);
}
