import { SaveAs } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Snackbar,
	Stack,
	TextField,
} from '@mui/material';
import { useState } from 'react';

export default function (props: { updateUsername(username: string): Promise<void> }) {
	// component logic

	// component state
	const [isPending, setIsPending] = useState(false);
	const [username, setUsername] = useState('');

	const isUnchanged = username === '';
	const isValidName = username.trim().length < 32;

	async function updateUsername() {
		setIsPending(true);

		try {
			await props.updateUsername(username);
		} catch {
			alert('Something went wrong. Please try again later.');
		} finally {
			setIsPending(false);
		}
	}

	// component layout
	return (
		<Stack gap={2} justifyContent={'center'}>
			<Box margin={'auto'}>
				<Avatar sx={{ height: 72, width: 72 }} />
			</Box>
			<Stack gap={1} flexDirection={'row'}>
				<TextField
					autoFocus={true}
					error={!isValidName}
					fullWidth={true}
					label={'Enter your name'}
					onChange={(e) => setUsername(e.target.value.slice(0, 31))}
					size={'small'}
					type={'text'}
					value={username}
				/>
				<Button
					disabled={isPending || isUnchanged || !isValidName}
					endIcon={<SaveAs />}
					onClick={updateUsername}
					sx={{ position: 'relative' }}
					variant={'outlined'}
				>
					{isPending && <CircularProgress size={24} sx={{ position: 'absolute' }} />}
					Save
				</Button>
			</Stack>
		</Stack>
	);
}
