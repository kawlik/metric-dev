import { Typography } from '@mui/material';
import { AppPageUI, AppPicture } from '../components/@';

// assets
import WorkInProgress from '../assets/work-in-progress.png';

export default function (props: {}) {
	// component logic

	// component layout
	return (
		<AppPageUI sx={{ padding: 1 }}>
			<AppPicture
				alt="https://www.flaticon.com/authors/smashingstocks"
				src={WorkInProgress}
			/>
			<Typography noWrap textAlign="center" variant="subtitle1">
				Account - Work in progress
			</Typography>
		</AppPageUI>
	);
}
