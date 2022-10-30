import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	LinearProgress,
	TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function (props: {
	closeVerifier(): void;
	isVerifierOpen: boolean;
	verifyOTPCode(otpCode: string): Promise<void>;
}) {
	// component logic
	const closeAfterSec = 100;
	const helperTextMap = {
		'in-initial': 'Enter the code you received by SMS.',
		'in-failure': 'Invalid verification code. Try again.',
		'in-pending': 'Verification. Please wait.',
	};

	// component state
	const [verifyCode, setVerifyCode] = useState('');
	const [verifyTime, setVerifyTime] = useState(closeAfterSec);
	const [verifyStep, setVerifyStep] = useState<'in-initial' | 'in-failure' | 'in-pending'>(
		'in-initial',
	);

	const helperText = helperTextMap[verifyStep];
	const hasErrored = verifyStep === 'in-failure';
	const inProgress = verifyStep === 'in-pending';

	function closeVerifier() {
		setVerifyStep('in-initial');
		props.closeVerifier();
	}

	async function verifyOTP() {
		setVerifyStep('in-pending');

		try {
			await props.verifyOTPCode(verifyCode);
		} catch {
			setVerifyStep('in-failure');
		}
	}

	// component lifecycle
	useEffect(() => {
		const autoCloseInterval = setInterval(() => setVerifyTime((prev) => prev - 1), 1000);

		return () => {
			clearInterval(autoCloseInterval);
			setVerifyTime(closeAfterSec);
		};
	}, [props.isVerifierOpen]);

	// component layout
	return (
		<Dialog fullWidth={true} open={props.isVerifierOpen} maxWidth={'sm'}>
			<Box overflow={'hidden'} width={'100%'}>
				<LinearProgress value={verifyTime} variant={'determinate'} />
			</Box>
			<DialogTitle>Verify OTP code</DialogTitle>
			<DialogContent>
				<TextField
					error={hasErrored}
					fullWidth={true}
					helperText={helperText}
					margin={'dense'}
					onChange={(e) => setVerifyCode(e.target.value)}
					size={'small'}
					type={'number'}
					value={verifyCode}
				/>
			</DialogContent>
			<DialogActions>
				<Button color={'inherit'} onClick={closeVerifier}>
					Cancel
				</Button>
				<Button disabled={inProgress} onClick={verifyOTP} sx={{ position: 'relative' }}>
					{inProgress && <CircularProgress size={24} sx={{ position: 'absolute' }} />}
					Verify
				</Button>
			</DialogActions>
		</Dialog>
	);
}
