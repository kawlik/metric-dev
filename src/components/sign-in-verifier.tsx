import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import { useState } from 'react';

export default function (props: {
	canVerify: boolean;
	closeVerifier(): void;
	isOpen: boolean;
	getVerifyCode: string;
	setVerifyCode(value: string): void;
	verifyOTP(): Promise<void>;
}) {
	// component logic

	// component state
	const [isInvalid, setIsInvalid] = useState(false);
	const [isPending, setIsPending] = useState(false);

	const onCancel = () => {
		props.setVerifyCode('');
		props.closeVerifier();
	};

	const onVerify = () => {
		setIsPending(true);
		setIsInvalid(false);

		props
			.verifyOTP()
			.catch(() => {
				setIsInvalid(true);
			})
			.finally(() => setIsPending(false));
	};

	// component layout
	return (
		<Dialog fullWidth={true} open={props.isOpen} maxWidth={'sm'}>
			<DialogTitle>Verify Your OTP</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus={true}
					error={isInvalid}
					fullWidth={true}
					helperText={isInvalid ? 'Invalid authentication code.' : ''}
					onChange={(e) => props.setVerifyCode(e.target.value)}
					size={'small'}
					type={'number'}
					value={props.getVerifyCode}
				/>
			</DialogContent>
			<DialogActions>
				<Button color="inherit" onClick={onCancel}>
					Cancel
				</Button>
				<Button
					color="primary"
					disabled={!props.canVerify || isPending}
					onClick={onVerify}
					sx={{ position: 'relative' }}
				>
					{isPending && <CircularProgress size={24} sx={{ position: 'absolute' }} />}
					Verify
				</Button>
			</DialogActions>
		</Dialog>
	);
}
