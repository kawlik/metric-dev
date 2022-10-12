import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
	AppViewIOSChin,
	AppViewStack,
	BillFormActions,
	BillFormStepper,
	BillFormTopbar,
} from '../components/@';
import { useContexts } from '../contexts/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	function goBack() {
		navigate(-1);
	}

	// component layout
	return (
		<>
			<BillFormTopbar goBack={goBack} />
			<AppViewStack flex={1} gap={1} padding={1}>
				<BillFormStepper />
				<Container maxWidth={'md'} sx={{ marginY: 'auto' }}></Container>
				<BillFormActions />
			</AppViewStack>
			<AppViewIOSChin />
		</>
	);
}
