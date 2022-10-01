import { Container, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/@.service';
import {
	AppViewIOSChin,
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

	// component state
	const [isVerifierOpen, setIsVerifierOpen] = useState(false);
	const [isViewLoading, setIsViewLoading] = useState(true);

	function closeVerifier() {
		setIsVerifierOpen(false);
	}

	async function generateOTPCode(phoneNumber: string) {
		await AuthService.generateOTP(phoneNumber);
		return setIsVerifierOpen(true);
	}

	function openPrivacyPolicy() {
		alert('openPrivacyPolicy');
	}

	function verifyOTPCode(otpCode: string) {
		return AuthService.verifyOTP(otpCode);
	}

	// component lifecycle
	useEffect(() => {
		if (contexts.auth.get() !== undefined) {
			setIsViewLoading(false);
		}

		if (contexts.isSignedIn.get() === true) {
			navigate('/sign-up/');
		}
	}, [contexts.auth, contexts.isSignedIn]);

	// component layout
	return (
		<>
			<AppViewLoading isLoading={isViewLoading} />
			<AppViewStack flex={1} gap={1} padding={1}>
				<Container maxWidth={'md'} sx={{ marginY: 'auto' }}>
					<Stack gap={1}>
						<SignInHeader srcAvatar={AppLogo} />
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
