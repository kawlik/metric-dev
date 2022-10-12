import { ArrowBackIosNew } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

export default function (props: { goBack(): void }) {
	// component logic

	// component layout
	return (
		<AppBar color={'inherit'} elevation={0} position={'static'}>
			<Toolbar>
				<IconButton onClick={props.goBack}>
					<ArrowBackIosNew />
				</IconButton>
				<Typography marginX={1} noWrap={true} variant={'h6'}>
					Open new ledger
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
