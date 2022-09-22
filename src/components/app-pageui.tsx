import { Fade, Stack, StackProps } from '@mui/material';

export default function (props: StackProps) {
	// component logic

	// component layout
	return (
		<Fade in>
			<Stack
				{...props}
				component="main"
				sx={{ flex: 1, overflowX: 'hidden', overflowY: 'scroll' }}
			>
				{props.children}
			</Stack>
		</Fade>
	);
}
