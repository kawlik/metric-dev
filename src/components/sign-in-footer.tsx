import { Lock } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';

export default function (props: { openPrivacyPolicy(): void }) {
	// component logic

	// component layout
	return (
		<Stack component={'footer'}>
			<Box m={'auto'}>
				<Lock fontSize={'large'} />
			</Box>
			<Button fullWidth={true} onClick={props.openPrivacyPolicy}>
				Privacy policy
			</Button>
		</Stack>
	);
}
