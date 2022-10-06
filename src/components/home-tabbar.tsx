import { AccountCircle, Leaderboard, Notifications, ReceiptLong } from '@mui/icons-material';
import { AppBar, BottomNavigation, BottomNavigationAction } from '@mui/material';

export default function (props: { page: string; setPage(route: string): void }) {
	// component logic
	const tabs = [
		{ icon: <ReceiptLong />, route: 'ledgers' },
		{ icon: <Leaderboard />, route: 'reports' },
		{ icon: <Notifications />, route: 'updates' },
		{ icon: <AccountCircle />, route: 'account' },
	];

	// component layout
	return (
		<AppBar color={'inherit'} elevation={0} position={'static'}>
			<BottomNavigation
				onChange={(event, page) => props.setPage(page)}
				value={props.page}
			>
				{tabs.map((tab) => (
					<BottomNavigationAction
						key={tab.route}
						icon={tab.icon}
						label={tab.route}
						value={tab.route}
					/>
				))}
			</BottomNavigation>
		</AppBar>
	);
}
