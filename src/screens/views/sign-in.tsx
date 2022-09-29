import { Security } from '@mui/icons-material/';
import { Box, Button, Stack } from '@mui/material';
import { AppPhoneField, SignInFooter, SignInHeader } from '../../components/@';

export default function (props: {
	get: {
		phoneNumber: string;
	};
	set: {
		phoneNumber(value: string): void;
	};
	canGenerateOTP: boolean;
	openPrivacyPolicy(): void;
	openOTPCodeVerify(): void;
	srcAppLogo: string;
}) {
	// component logic

	// component layout
	return (
		<Stack component={'main'} flex={1} padding={1}>
			<Stack gap={1} marginY={'auto'}>
				<SignInHeader srcAvatar={props.srcAppLogo} />
				<AppPhoneField onChange={props.set.phoneNumber} value={props.get.phoneNumber} />
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
				<SignInFooter openPrivacyPolicy={props.openPrivacyPolicy} />
			</Box>
		</Stack>
	);
}
