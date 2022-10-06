import { ArrowBack } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

export default function (props: { goBack(): void; label: string }) {
	// component logic

	// component layout
	return (
		<AppBar color={'inherit'} elevation={0} position={'static'}>
			<Toolbar>
				<IconButton onClick={props.goBack}>
					<ArrowBack />
				</IconButton>
				<Typography
					marginX={1}
					noWrap={true}
					textTransform={'capitalize'}
					variant={'h6'}
				>
					{props.label}
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
