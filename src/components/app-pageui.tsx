import { Fade, Stack, StackProps } from '@mui/material';

export default function (props: StackProps) {
	// component logic

	// component layout
	return (
		<Fade in>
			<Stack {...props} flex={1} sx={{ overflowX: 'hidden', overflowY: 'scroll' }}>
				{props.children}
			</Stack>
		</Fade>
	);
}
