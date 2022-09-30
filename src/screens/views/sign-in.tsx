import { Security } from '@mui/icons-material/';
import { Box, Button, Stack } from '@mui/material';
import {
	AppPhoneField,
	SignInRecaptcha,
	AppViewLoading,
	SignInFooter,
	SignInHeader,
	AppViewStack,
	SignInVerifier,
} from '../../components/@';

export default function (props: {
	canGenerateOTP: boolean;
	canVerifyOTP: boolean;
	closeVerifier(): void;
	getPhoneNumber: string;
	getVerifyCode: string;
	isVerifierOpen: boolean;
	isViewLoading: boolean;
	openPrivacyPolicy(): void;
	openOTPCodeVerify(): void;
	setPhoneNumber(value: string): void;
	setVerifyCode(value: string): void;
	srcAppLogo: string;
	verifyOTP(): Promise<void>;
}) {
	// component logic

	// component layout
	return (
		<>
			<AppViewLoading isLoading={props.isViewLoading} />
			<AppViewStack flex={1} padding={1}>
				<Stack gap={1} marginY={'auto'}>
					<SignInHeader srcAvatar={props.srcAppLogo} />
					<AppPhoneField
						onChange={props.setPhoneNumber}
						value={props.getPhoneNumber}
					/>
					<Button
						disabled={!props.canGenerateOTP}
						endIcon={<Security />}
						fullWidth={true}
						onClick={props.openOTPCodeVerify}
						size={'large'}
						variant={'outlined'}
					>
						Generate OTP
					</Button>
				</Stack>
				<Box>
					<SignInRecaptcha />
					<SignInFooter openPrivacyPolicy={props.openPrivacyPolicy} />
					<SignInVerifier
						canVerify={props.canVerifyOTP}
						closeVerifier={props.closeVerifier}
						isVerifierOpen={props.isVerifierOpen}
						getVerifyCode={props.getVerifyCode}
						setVerifyCode={props.setVerifyCode}
						verifyOTP={props.verifyOTP}
					/>
				</Box>
			</AppViewStack>
		</>
	);
}
