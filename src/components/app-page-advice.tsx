import { Avatar, Stack, Typography } from '@mui/material';

// assets
import AdviceGif from '../assets/desert.gif';

export default function (props: {}) {
	// component logic

	// component layout
	return (
		<Stack alignItems={'center'} flex={1} gap={1} justifyContent={'center'}>
			<Avatar src={AdviceGif} sx={{ height: 96, width: 96 }} />
			<Typography textAlign={'center'} variant={'h6'}>
				There is nothing here yet.
			</Typography>
		</Stack>
	);
}
