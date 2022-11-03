import { ArrowBackIosNew } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppViewStack, SettingsTheme } from '../components/@';

export default function (props: {}) {
	// component logic
	const navigate = useNavigate();

	function goBack() {
		navigate(-1);
	}

	// component layout
	return (
		<>
			<AppBar color={'inherit'} elevation={0} position={'static'}>
				<Toolbar>
					<IconButton onClick={goBack}>
						<ArrowBackIosNew />
					</IconButton>
					<Typography
						marginX={1}
						noWrap={true}
						textTransform={'capitalize'}
						variant={'h6'}
					>
						Settings
					</Typography>
				</Toolbar>
			</AppBar>
			<AppViewStack flex={1}>
				<SettingsTheme />
			</AppViewStack>
		</>
	);
}
