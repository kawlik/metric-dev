import { Share } from '@mui/icons-material';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { AppViewStack } from '../components/@';
import { useContexts } from '../contexts/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();

	const userName = contexts.userAuth.get()?.displayName || '';
	const userPhone = contexts.userAuth.get()?.phoneNumber || '';
	const userPhoto = contexts.userAuth.get()?.photoURL || '';

	function shareAccount() {
		alert('Sorry, the selected functionality is not available yet.');
	}

	// component layout
	return (
		<AppViewStack flex={1} padding={1}>
			<Stack alignItems={'center'} gap={2} marginY={'auto'}>
				<Avatar src={userPhoto} sx={{ height: 128, width: 128 }} />
				<Typography textAlign={'center'} variant={'h5'}>
					{userName}
				</Typography>
				<Typography textAlign={'center'} variant={'subtitle1'}>
					{userPhone}
				</Typography>
			</Stack>
			<Button
				color={'success'}
				endIcon={<Share />}
				fullWidth={true}
				onClick={shareAccount}
			>
				Share
			</Button>
		</AppViewStack>
	);
}
