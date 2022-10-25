import { DeleteForever } from '@mui/icons-material';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { AppViewStack } from '../components/@';
import { useContexts } from '../contexts/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();

	const userName = contexts.userAuth.get()?.displayName || '';
	const userPhone = contexts.userAuth.get()?.phoneNumber || '';
	const userPhoto = contexts.userAuth.get()?.photoURL || '';

	function deleteAccount() {}

	// component layout
	return (
		<AppViewStack flex={1} padding={1}>
			<Stack alignItems={'center'} gap={2} my={'auto'}>
				<Avatar src={userPhoto} sx={{ height: 128, width: 128 }} />
				<Typography textAlign={'center'} variant={'h5'}>
					{userName}
				</Typography>
				<Typography textAlign={'center'} variant={'subtitle1'}>
					{userPhone}
				</Typography>
			</Stack>
			<Button
				color={'error'}
				fullWidth={true}
				onClick={deleteAccount}
				endIcon={<DeleteForever />}
			>
				Delete Account
			</Button>
		</AppViewStack>
	);
}
