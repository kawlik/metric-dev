import { Avatar, Stack, Typography } from '@mui/material';

// assets
import LoadingGif from '../assets/checklist.gif';

export default function (props: {}) {
	// component logic

	// component layout
	return (
		<Stack alignItems={'center'} flex={1} gap={1} justifyContent={'center'}>
			<Avatar src={LoadingGif} sx={{ height: 96, width: 96 }} />
			<Typography textAlign={'center'} variant={'h6'}>
				Fetching data...
			</Typography>
		</Stack>
	);
}
