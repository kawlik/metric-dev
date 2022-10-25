import { AppBar, Button, Toolbar } from '@mui/material';

export default function (props: {}) {
	// component logic
	function downladPDF() {}

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
			<Toolbar>
				<Button fullWidth={true} onClick={downladPDF}>
					Downlad PDF
				</Button>
			</Toolbar>
		</AppBar>
	);
}
