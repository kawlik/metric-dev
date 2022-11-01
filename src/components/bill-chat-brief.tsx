import { AppBar, Button, Toolbar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function (props: {}) {
	// component logic
	const location = useLocation();
	const navigate = useNavigate();

	function downladPDF() {
		navigate(location.pathname + 'more/downlad');
	}

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
