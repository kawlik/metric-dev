import { Add } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';

export default function (props: { openBillCreate(): void }) {
	// component logic

	// component layout
	return (
		<Box bottom={0} marginLeft={'auto'} marginTop={'auto'} padding={2} position={'sticky'}>
			<Fab color={'primary'} onClick={props.openBillCreate} variant={'circular'}>
				<Add />
			</Fab>
		</Box>
	);
}
