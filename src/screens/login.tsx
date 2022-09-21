import { Button, Divider, Stack, Typography } from '@mui/material';
import { Lock, Security } from '@mui/icons-material';
import { useState } from 'react';
import { AppTopbar, AppPicture, AppPhoneField, AppDialog, AppPageUI } from '../components/@';
import { AuthService, PhoneService } from '../services/@';

// assets
import bgImage from '../assets/otp-create.png';

export default function (props: {}) {
	// component logic

	const [confromCode, setConfirmCode] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [promptModal, setPromptModal] = useState(false);

	const isDisabled = !PhoneService.isValidPhoneNumber(phoneNumber);

	const createCode = () => {
		AuthService.createOTP(phoneNumber).then(() => setPromptModal(true));
	};

	const verifyCode = () => {
		AuthService.verifyOTP(confromCode).then(() => {});
	};

	// component layout
	return (
		<>
			<AppTopbar label="Login" />
			<AppDialog
				actionDiscard={() => setPromptModal(false)}
				actionProcess={() => verifyCode()}
				input={{
					label: 'Enter your OTP',
					onChange: setConfirmCode,
					value: confromCode.slice(0, 6),
					type: 'number',
				}}
				isOpen={promptModal}
				label="Verify your One-Time Password that we sent you via SMS."
				title="Verify your OTP"
			/>
			<AppPageUI gap={1} padding={2}>
				<AppPicture
					alt="https://www.flaticon.com/authors/smashingstocks"
					src={bgImage}
				/>
				<Typography noWrap textAlign="center" variant="subtitle1">
					Use your phone number to generate OTP
				</Typography>
				<Divider />
				<Stack gap={1}>
					<AppPhoneField onChange={setPhoneNumber} value={phoneNumber} />
					<Button
						endIcon={<Security />}
						disabled={isDisabled}
						fullWidth
						onClick={createCode}
						size="large"
						variant="outlined"
					>
						Generate OTP
					</Button>
				</Stack>
				<Stack padding={4}>
					<Lock fontSize="large" sx={{ margin: 'auto' }} />
					<div id="recaptcha-verifier-refrence" />
				</Stack>
			</AppPageUI>
		</>
	);
}
