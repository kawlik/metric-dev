import { Backdrop, CircularProgress } from '@mui/material';

export default function (props: { isLoading: boolean }) {
	// component logic

	// component layout
	return (
		<Backdrop open={props.isLoading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}
