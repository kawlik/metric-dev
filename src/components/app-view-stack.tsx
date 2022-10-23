import { Grow, Stack, StackProps } from '@mui/material';

export default function (props: StackProps) {
	// component logic

	// component layout
	return (
		<Grow in={true}>
			<Stack component={'main'} position={'relative'} {...props} />
		</Grow>
	);
}
