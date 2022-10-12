import { CalendarMonth } from '@mui/icons-material';
import { Button, Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	AppViewIOSChin,
	AppViewStack,
	BillFormActions,
	BillFormStepper,
	BillFormTopbar,
} from '../components/@';
import { useContexts } from '../contexts/@';
import { AppNormsService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const steps = ['Set bill infos', 'Set bill plans'];

	const nextMonth = AppNormsService.normalizeMoment().endOf('month').format('YYYY-MM-DD');
	const tomorrow = AppNormsService.normalizeMoment().endOf('day').format('YYYY-MM-DD');

	console.log(nextMonth);
	console.log(tomorrow);

	// component state
	const [billTitle, setBillTitle] = useState('');
	const [currentStep, setCurrentStep] = useState(0);
	const [participants, setParticipants] = useState(new Set<string>());
	const [validToDate, setValidToDate] = useState(nextMonth);

	function goBack() {
		navigate(-1);
	}

	// component layout
	return (
		<>
			<BillFormTopbar goBack={goBack} />
			<AppViewStack flex={1} gap={1} padding={1}>
				<BillFormStepper />
				<Container maxWidth={'md'} sx={{ marginY: 'auto' }}>
					<input
						onClick={(e) => e.currentTarget.focus()}
						min={tomorrow}
						onChange={(e) => setValidToDate(e.target.value)}
						type={'date'}
						value={validToDate}
					/>
				</Container>
				<BillFormActions />
			</AppViewStack>
			<AppViewIOSChin />
		</>
	);
}
