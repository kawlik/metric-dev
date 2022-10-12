import { PhotoCamera } from '@mui/icons-material';
import { Avatar, Button, CircularProgress, Stack } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { AppPhotoService, StorageCloudService } from '../services/@.service';

export default function (props: {
	displayPict: string;
	updateDisplayPict(userPicture: string): void;
}) {
	// component logic
	const [isPending, setIsPending] = useState(false);

	async function upload(event: ChangeEvent<HTMLInputElement>) {
		setIsPending(true);

		try {
			if (!event.target.files?.length) {
				throw 'No file selected!';
			}

			const files = event.target.files;
			const image = files[0];

			const userPictureCrop = await AppPhotoService.cropImage(image);
			const userPictureUrl = await StorageCloudService.uploadUserPicture(userPictureCrop);

			console.log(userPictureUrl);

			props.updateDisplayPict(userPictureUrl);
		} catch {
			alert('Something went wrong. Please try again later.');
		}

		setIsPending(false);
	}

	// component layout
	return (
		<Stack gap={2} flex={1} alignItems={'center'} justifyContent={'center'}>
			<Avatar src={props.displayPict} sx={{ height: 192, width: 192 }} />
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
					onChange={upload}
					type={'file'}
				/>
				Upload
			</Button>
		</Stack>
	);
}
