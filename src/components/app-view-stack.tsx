import { Grow, Stack, StackProps } from '@mui/material';

export default function (props: StackProps) {
	// component logic

	// component layout
	return (
		<Grow in={true} timeout={400}>
			<Stack component={'main'} position={'relative'} {...props} />
		</Grow>
	);
}
