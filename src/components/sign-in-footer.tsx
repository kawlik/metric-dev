import { Lock } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';

export default function (props: { openPrivacyPolicy(): void }) {
	// component logic

	// component layout
	return (
		<Stack component={'footer'} marginTop={'auto'}>
			<Box m={'auto'}>
				<Lock fontSize={'large'} />
			</Box>
			<Box mt={'auto'}>
				<Button fullWidth={true} onClick={props.openPrivacyPolicy}>
					Privacy policy
				</Button>
			</Box>
		</Stack>
	);
}
