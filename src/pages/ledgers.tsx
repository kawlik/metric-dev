import { LibraryAdd, Search } from '@mui/icons-material';
import { useState } from 'react';
import { AppDialog, AppPageUI } from '../components/@';
import { LedgersDial, LedgersList } from './utils/@';

export default function (props: {}) {
	// component logic

	const [searchedText, setSearchedText] = useState('');
	const [promptModal, setPromptModal] = useState(false);

	const discardSearch = () => {
		setPromptModal(false);
		setSearchedText('');
	};

	const processSearch = () => {
		setPromptModal(false);
	};

	// component layout
	return (
		<>
			<AppPageUI padding={1} paddingBottom={3}>
				<LedgersList />
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
