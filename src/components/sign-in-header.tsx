import { Avatar, Box, Stack, Typography } from '@mui/material';

export default function (props: { srcAvatar: string }) {
	// component logic

	// component layout
	return (
		<Stack
			component={'header'}
			gap={2}
			justifyContent={'center'}
			marginTop={'auto'}
			padding={1}
		>
			<Box mx={'auto'}>
				<Avatar
					src={props.srcAvatar}
					sx={{ height: 96, width: 96 }}
					variant="rounded"
				/>
			</Box>
			<Box>
				<Typography textAlign={'center'} variant={'h5'}>
					Login to be up to <Highlight text={'Metric'} />
				</Typography>
				<Typography textAlign={'center'} variant={'subtitle1'}>
					Use a One-Time Password for secure login
				</Typography>
			</Box>
		</Stack>
	);
}

function Highlight(props: { text: string }) {
	return (
		<Typography
			color={(theme) => theme.palette.primary.main}
			component={'span'}
			variant={'inherit'}
		>
			{props.text}
		</Typography>
	);
}
