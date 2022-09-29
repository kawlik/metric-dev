import { useEffect, useState } from 'react';
import { AuthService, PhoneService } from '../services/@.service';
import { SignInRecaptcha, AppViewLoading } from '../components/@';
import { useContexts } from '../contexts/@';
import { SignInScreenView } from './views/@';

// assets
import AppLogo from '../assets/app-logo.png';
import { useNavigate } from 'react-router-dom';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const isSignedIn = contexts.auth.get() === true;
	const isSignedUp = !!contexts.user.get()?.displayName;

	// component state
	const [phoneNumber, setPhoneNumber] = useState('');
	const [promptVerifier, setPromptVerifier] = useState(false);
	const [verifyCode, setVerifyCode] = useState('');

	const canGenerateOTP = PhoneService.isValidPhoneNumber(phoneNumber);
	const canVerifyOTP = verifyCode.length >= 4;
	const isViewLoading = contexts.auth.get() === null;

	const closeVerifier = () => {
		setPromptVerifier(false);
	};

	const openOTPCodeVerify = () => {
		AuthService.createOTP(phoneNumber).then(() => setPromptVerifier(true));
	};

	const verifyOTP = () => AuthService.verifyOTP(verifyCode);

	// component lifecycle
	useEffect(() => {
		if (isSignedIn && !isSignedUp) navigate('/sign-up/');
	}, [contexts]);

	// component layout
	return (
		<SignInScreenView
			canGenerateOTP={canGenerateOTP}
			canVerifyOTP={canVerifyOTP}
			closeVerifier={closeVerifier}
			getPhoneNumber={phoneNumber}
			getVerifyCode={verifyCode}
			isViewLoading={isViewLoading}
			isVerifierOpen={promptVerifier}
			openPrivacyPolicy={() => alert('unimplemented (src\\screens\\sign-in.tsx)')}
			openOTPCodeVerify={openOTPCodeVerify}
			setPhoneNumber={setPhoneNumber}
			setVerifyCode={setVerifyCode}
			srcAppLogo={AppLogo}
			verifyOTP={verifyOTP}
		/>
	);
}
