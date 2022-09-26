import { LibraryAdd, Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDialog, AppPageUI } from '../components/@';
import { useContexts } from '../contexts/@';
import { LedgersListService } from '../services/@.service';
import { BillInfoType } from '../types/@';
import { LedgersDial, LedgersList } from './utils/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	// component state
	const [ledgersList, setLedgersList] = useState<BillInfoType[]>([]);
	const [promptModal, setPromptModal] = useState(false);
	const [searchedText, setSearchedText] = useState('');

	const discardSearch = () => {
		setPromptModal(false);
		setSearchedText('');
	};

	const processSearch = () => {
		setPromptModal(false);
	};

	const navigateBill = (billID: string) => navigate(`/ledger/${billID}`);

	// component lifecycle
	useEffect(() => {
		LedgersListService.subscribeOn(contexts.user.get()?.phoneNumber!).subscribe((list) =>
			setLedgersList(list),
		);

		return () => LedgersListService.unsubscribe();
	}, []);

	// component layout
	return (
		<>
			<AppPageUI paddingBottom={3} sx={{ paddingX: 1, paddingBottom: 3 }}>
				<LedgersList ledgersList={ledgersList} navigate={navigateBill} />
				<LedgersDial
					actions={[
						{
							action: () => {},
							icon: <LibraryAdd />,
							title: 'Add ledger',
						},
						{
							action: () => setPromptModal(true),
							icon: <Search />,
							title: 'Search list',
						},
					]}
				/>
			</AppPageUI>
			<AppDialog
				actionDiscard={discardSearch}
				actionProcess={processSearch}
				input={{
					label: 'Searched keyword',
					onChange: setSearchedText,
					type: 'text',
					value: searchedText,
				}}
				isOpen={promptModal}
				label=""
				title="Search"
			/>
		</>
	);
}
