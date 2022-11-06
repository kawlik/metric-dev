import { Security } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { AppAlertService } from '../services/@.service';
import { AppPhoneField } from './@';

export default function (props: { generateOTPCode(phoneNumber: string): Promise<void> }) {
	// component logic

	// component state
	const [canGenerate, setCanGenerate] = useState(false);
	const [isVerifying, setIsVerifying] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState('');

	async function generate() {
		setIsVerifying(true);

		try {
			await props.generateOTPCode(phoneNumber);
		} catch {
			AppAlertService.error();
		}

		setIsVerifying(false);
	}

	// component lifecycle
	useEffect(() => {
		if (!!phoneNumber.length) {
			setCanGenerate(true);
		} else {
			setCanGenerate(false);
		}
	}, [phoneNumber]);

	// component layout
	return (
		<>
			<AppPhoneField onChange={setPhoneNumber} />
			<Button
				disabled={!canGenerate || isVerifying}
				endIcon={<Security />}
				fullWidth={true}
				onClick={generate}
				size={'large'}
				sx={{ position: 'relative' }}
				variant={'outlined'}
			>
				{isVerifying && <CircularProgress size={24} sx={{ position: 'absolute' }} />}
				Generate OTP
			</Button>
		</>
	);
}
