import { Security } from '@mui/icons-material';
import { Button } from '@mui/material';

export default function (props: { openPrivacyPolicy(): void }) {
	// component logic

	// component layout
	return (
		<Button endIcon={<Security />} fullWidth={true} onClick={props.openPrivacyPolicy}>
			Security
		</Button>
	);
}
