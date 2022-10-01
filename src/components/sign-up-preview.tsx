import { Avatar, Stack, Typography } from '@mui/material';

export default function (props: {
	displayname: string;
	userPicture: string;
	userPhoneNumber: string;
}) {
	// component logic

	// component layout
	return (
		<Stack gap={2} alignItems={'center'} justifyContent={'center'}>
			<Avatar src={props.userPicture} sx={{ height: 128, width: 128 }} />
			<Typography textAlign={'center'} variant={'h5'}>
				{props.displayname}
			</Typography>
			<Typography textAlign={'center'} variant={'subtitle1'}>
				{props.userPhoneNumber}
			</Typography>
		</Stack>
	);
}
