import { Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/@.service';
import {
	AppViewLoading,
	AppViewStack,
	SignInFooter,
	SignInHeader,
	SignInRecaptcha,
	SignInRegister,
	SignInVerifier,
} from '../components/@';
import { useContexts } from '../contexts/@';

// assets
import AppLogo from '../assets/app-logo.png';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const isLoading = contexts.auth.get() === null;
	const isSignedIn = contexts.auth.get() === true;

	// component state
	const [isVerifierOpen, setIsVerifierOpen] = useState(false);

	const closeVerifier = () => {
		return setIsVerifierOpen(false);
	};

	const generateOTPCode = (phoneNumber: string) => {
		return AuthService.generateOTP(phoneNumber).then(() => setIsVerifierOpen(true));
	};

	const openPrivacyPolicy = () => {
		return alert('UNIMPLEMENTED! (openPrivacyPolicy)');
	};

	const verifyOTPCode = (otpCode: string) => {
		return AuthService.verifyOTP(otpCode);
	};

	// component layout
	return (
		<>
			<AppViewLoading isLoading={isLoading} />
			<AppViewStack flex={1} padding={1}>
				<Stack gap={1} marginY={'auto'}>
					<SignInHeader srcAvatar={AppLogo} />
					<SignInRegister generateOTPCode={generateOTPCode} />
					<SignInVerifier
						closeVerifier={closeVerifier}
						isVerifierOpen={isVerifierOpen}
						verifyOTPCode={verifyOTPCode}
					/>
				</Stack>
				<Box>
					<SignInFooter openPrivacyPolicy={openPrivacyPolicy} />
					<SignInRecaptcha />
				</Box>
			</AppViewStack>
		</>
	);
}
