import { AppBar, Toolbar } from '@mui/material';

export default function (props: {}) {
	// component logic

	// component layout
	return (
		<AppBar
			color={'inherit'}
			elevation={0}
			position={'static'}
			sx={{
				borderTopColor: (theme) => theme.palette.action.disabledBackground,
				borderTopStyle: 'solid',
				borderTopWidth: 1,
			}}
		>
			<Toolbar></Toolbar>
		</AppBar>
	);
}
