import { Avatar, LinearProgress, Stack, Typography } from '@mui/material';

// assets
import Gif from '../assets/checklist.gif';

export default function (props: {}) {
	// component logic

	// component layout
	return (
		<Stack alignItems={'center'} flex={1} gap={1} justifyContent={'center'}>
			<Avatar src={Gif} sx={{ height: 128, width: 128 }} variant={'rounded'} />
			<Typography textAlign={'center'} variant={'h6'}>
				<LinearProgress />
				Warming up the pens...
			</Typography>
		</Stack>
	);
}
