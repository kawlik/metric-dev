import { AppBar, BottomNavigation, BottomNavigationAction, SvgIcon } from '@mui/material/';
import { ReactNode } from 'react';

export default function (props: {
	route: string;
	setRoute(value: string): void;
	tabs: {
		icon: ReactNode;
		page: string;
	}[];
}) {
	// component logic

	// component layout
	return (
		<AppBar color="inherit" elevation={0} position="static">
			<BottomNavigation
				onChange={(event, value) => props.setRoute(value)}
				value={props.route}
			>
				{props.tabs.map((tab, index) => (
					<BottomNavigationAction
						icon={tab.icon || <SvgIcon />}
						key={tab.page}
						label={tab.page}
						sx={{ textTransform: 'capitalize' }}
						value={tab.page}
					/>
				))}
			</BottomNavigation>
		</AppBar>
	);
}
