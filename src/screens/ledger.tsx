import { useNavigate } from 'react-router-dom';
import { LedgerScreenView } from './views/@';

export default function (props: {}) {
	// component logic
	const navigate = useNavigate();

	// component layout
	return <LedgerScreenView />;
}
