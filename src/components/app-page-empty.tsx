import { Avatar, Box } from '@mui/material';

// assets
import Gif from '../assets/desert.gif';

export default function (props: {}) {
	// component logic

	// component layout
	return (
		<Box
			sx={{
				position: 'absolute',
				right: '50%',
				top: '50%',
				transform: 'translate(50%, -50%)',
			}}
		>
			<Avatar src={Gif} sx={{ height: 128, width: 128 }} variant={'rounded'} />
		</Box>
	);
}
