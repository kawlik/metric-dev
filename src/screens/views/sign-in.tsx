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
		<Stack component={'main'} flex={1} justifyContent={'center'} padding={1}>
			<SignInHeader srcAvatar={props.srcAppLogo} />
			<Stack gap={1} marginY={2}>
				<Box>
					<AppPhoneField
						onChange={props.set.phoneNumber}
						value={props.get.phoneNumber}
					/>
				</Box>
				<Box>
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
				</Box>
			</Stack>
			<SignInFooter openPrivacyPolicy={props.openPrivacyPolicy} />
		</Stack>
	);
}
