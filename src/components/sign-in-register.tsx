import { Security } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { PhoneService } from '../services/@.service';
import { AppPhoneField } from './@';

export default function (props: { generateOTPCode(phoneNumber: string): Promise<void> }) {
	// component logic

	// component state
	const [canGenerate, setCanGenerate] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState('');

	async function generate() {
		try {
			await props.generateOTPCode(phoneNumber);
		} catch {
			alert('Something went wrong. Please try again later.');
		}
	}

	// component lifecycle
	useEffect(() => {
		if (PhoneService.isValidPhoneNumber(phoneNumber)) {
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
				disabled={!canGenerate}
				endIcon={<Security />}
				fullWidth={true}
				onClick={generate}
				size={'large'}
				variant={'outlined'}
			>
				Generate OTP
			</Button>
		</>
	);
}
