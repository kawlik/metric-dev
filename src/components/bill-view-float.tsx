import { Add } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';

export default function (props: { openBillForm(): void }) {
	// component logic

	// component layout
	return (
		<Box
			padding={2}
			position={'sticky'}
			marginLeft={'auto'}
			marginTop={'auto'}
			sx={{ bottom: 0, right: 0 }}
		>
			<Fab color={'primary'} onClick={props.openBillForm} variant={'circular'}>
				<Add />
			</Fab>
		</Box>
	);
}
