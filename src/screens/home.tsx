import { AccountCircle, Leaderboard, Notifications, ReceiptLong } from '@mui/icons-material';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { AppTopbar, AppTabbar } from '../components/@';

export default function (props: {}) {
	// component logic
	const navigate = useNavigate();
	const paramset = useParams();

	const getRoute = paramset['*']?.split('/')[0] || 'Home';
	const setRoute = (value: string) => navigate(`/${value}`, { replace: true });

	// component layout
	return (
		<>
			<AppTopbar label={getRoute} />
			<Outlet />
			<AppTabbar
				route={getRoute}
				setRoute={setRoute}
				tabs={[
					{
						icon: <ReceiptLong />,
						page: 'ledgers',
					},
					{
						icon: <Leaderboard />,
						page: 'reports',
					},
					{
						icon: <Notifications />,
						page: 'updates',
					},
					{
						icon: <AccountCircle />,
						page: 'account',
					},
				]}
			/>
		</>
	);
}
