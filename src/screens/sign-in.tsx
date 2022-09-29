import { useState } from 'react';
import { AuthService, PhoneService } from '../services/@.service';
import { SignInRecaptcha, AppViewLoading } from '../components/@';
import { useContexts } from '../contexts/@';
import { SignInScreenView } from './views/@';

// assets
import AppLogo from '../assets/app-logo.png';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();

	// component state
	const [phoneNumber, setPhoneNumber] = useState('');
	const [promptVerifier, setPromptVerifier] = useState(false);
	const [verifyCode, setVerifyCode] = useState('');

	const canGenerateOTP = PhoneService.isValidPhoneNumber(phoneNumber);
	const canVerifyOTP = verifyCode.length >= 4;
	const isViewLoading = contexts.auth.get() === null;

	const closeVerifier = () => setPromptVerifier(false);
	const openOTPCodeVerify = () => {
		AuthService.createOTP(phoneNumber).then(() => setPromptVerifier(true));
	};
	const verifyOTP = () => AuthService.verifyOTP(verifyCode);

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
