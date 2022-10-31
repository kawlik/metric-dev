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

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const billsList = contexts.billLedgers.get();
	const isLoading = billsList === undefined;

	function openBillForm() {
		navigate(`/create/`);
	}

	function openBillView(billID: string) {
		navigate(`/ledger/${billID}/`);
	}

	// component layout
	return (
		<>
			<AppViewLoading isLoading={isLoading} />
			<AppViewStack flex={1}>
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
				<BillViewFLoat openBillForm={openBillForm} />
			</AppViewStack>
		</>
	);
}
