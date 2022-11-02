import { Container, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuthService } from '../services/@.service';
import {
	AppViewIOSChin,
	AppViewStack,
	SignInFooter,
	SignInHeader,
	SignInRecaptcha,
	SignInRegister,
	SignInVerifier,
} from '../components/@';
import { useContexts } from '../contexts/@';

// assets
import Logo from '../assets/logo.png';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	// component state
	const [isVerifierOpen, setIsVerifierOpen] = useState(false);

	function closeVerifier() {
		setIsVerifierOpen(false);
	}

	async function generateOTPCode(phoneNumber: string) {
		await UserAuthService.generateOTP(phoneNumber);
		return setIsVerifierOpen(true);
	}

	function openPrivacyPolicy() {
		navigate('/security/');
	}

	function verifyOTPCode(otpCode: string) {
		return UserAuthService.verifyOTP(otpCode);
	}

	// component lifecycle
	useEffect(() => {
		if (contexts.isSignedIn.get() === true) {
			// navigate('/sign-up/');
		}
	}, [contexts.isSignedIn]);

	// component layout
	return (
		<>
			<AppViewStack flex={1} gap={1} padding={1}>
				<Container maxWidth={'md'} sx={{ marginY: 'auto' }}>
					<Stack gap={1}>
						<SignInHeader srcAvatar={Logo} />
						<SignInRegister generateOTPCode={generateOTPCode} />
						<SignInVerifier
							closeVerifier={closeVerifier}
							isVerifierOpen={isVerifierOpen}
							verifyOTPCode={verifyOTPCode}
						/>
					</Stack>
				</Container>
				<SignInRecaptcha />
				<SignInFooter openPrivacyPolicy={openPrivacyPolicy} />
			</AppViewStack>
			<AppViewIOSChin />
		</>
	);
}
