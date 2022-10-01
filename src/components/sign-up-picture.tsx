import { PhotoCamera } from '@mui/icons-material';
import { Avatar, Box, Button, CircularProgress, Stack } from '@mui/material';
import { useState } from 'react';
import { StorageCloudService } from '../services/@.service';

export default function (props: {
	userPicture: string;
	updateUserPicture(userPicture: string): void;
}) {
	// component logic
	const [isPending, setIsPending] = useState(false);

	async function uploadPicture(files: FileList) {
		setIsPending(true);

		try {
			const userPictureUrl = await StorageCloudService.uploadUserPicture(files[0]);
			props.updateUserPicture(userPictureUrl);
		} catch {
			alert('Something went wrong. Please try again later.');
		}

		setIsPending(false);
	}

	// component layout
	return (
		<Stack gap={2} flex={1} alignItems={'center'} justifyContent={'center'}>
			<Avatar src={props.userPicture} sx={{ height: 192, width: 192 }} />
			<Button
				component={'label'}
				disabled={isPending}
				endIcon={<PhotoCamera />}
				size={'large'}
				sx={{ position: 'relative' }}
				variant={'contained'}
			>
				{isPending && <CircularProgress size={24} sx={{ position: 'absolute' }} />}
				<input
					accept={'image/*'}
					hidden={true}
					multiple={false}
					type={'file'}
					onChange={(e) => uploadPicture(e.target.files!)}
				/>
				Upload
			</Button>
		</Stack>
	);
}
