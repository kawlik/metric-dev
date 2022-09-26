import { ArrowBack } from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppTopbar } from '../components/@';

export default function (props: {}) {
	// component logic
	const navigate = useNavigate();

	// component layout
	return (
		<>
			<AppTopbar
				label="Ledger"
				utilL={{
					action: () => navigate(-1),
					icon: <ArrowBack />,
				}}
			/>
			<Outlet />
		</>
	);
}
