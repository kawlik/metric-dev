import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	AppPageEmpty,
	AppViewLoading,
	AppViewStack,
	BillViewChart,
	BillViewFLoat,
	BillViewList,
} from '../components/@';
import { useContexts } from '../contexts/@';
import { BillLedgerService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const billsList = contexts.savedLedgers.get();
	const isLoading = billsList === undefined;

	function openBillForm() {
		navigate(`/create/`);
	}

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
				<BillViewFLoat openBillForm={openBillForm} />
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
