import { useState } from 'react';
import { PhoneService } from '../services/@.service';
import { AppRecaptcha, AppViewLoading } from '../components/@';
import { useContexts } from '../contexts/@';
import { SignInScreenView } from './views/@';

// assets
import AppLogo from '../assets/app-logo.png';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();

	// component state
	const [phoneNumber, setPhoneNumber] = useState('');
	const [verifyCode, setVerifyCode] = useState('');

	const canGenerateOTP = PhoneService.isValidPhoneNumber(phoneNumber);
	const isLoading = contexts.auth.get() === null;

	// component layout
	return (
		<>
			<AppViewLoading isLoading={isLoading} />
			<AppRecaptcha />
			<SignInScreenView
				get={{
					phoneNumber: phoneNumber,
				}}
				set={{
					phoneNumber: setPhoneNumber,
				}}
				canGenerateOTP={canGenerateOTP}
				openPrivacyPolicy={() => alert('unimplemented (src\\screens\\sign-in.tsx)')}
				openOTPCodeVerify={() => alert('unimplemented (src\\screens\\sign-in.tsx)')}
				srcAppLogo={AppLogo}
			/>
		</>
	);
}
