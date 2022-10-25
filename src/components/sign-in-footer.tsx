import { Button } from '@mui/material';

export default function (props: { openPrivacyPolicy(): void }) {
	// component logic

	// component layout
	return (
		<Button fullWidth={true} onClick={props.openPrivacyPolicy}>
			Privacy policy
		</Button>
	);
}
