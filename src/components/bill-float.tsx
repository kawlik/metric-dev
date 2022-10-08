import { Add } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';

export default function (props: { openBillCreate(): void }) {
	// component logic

	// component layout
	return (
		<Box padding={2} position={'absolute'} sx={{ bottom: 0, right: 0 }}>
			<Fab color={'primary'} onClick={props.openBillCreate} variant={'circular'}>
				<Add />
			</Fab>
		</Box>
	);
}
