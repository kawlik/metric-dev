import { Container, OutlinedInput } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	AppViewIOSChin,
	AppViewLoading,
	AppViewStack,
	BillFormActions,
	BillFormDisplayInfo,
	BillFormDisplayPlan,
	BillFormParticipants,
	BillFormStepper,
	BillFormTopbar,
} from '../components/@';
import { useContexts } from '../contexts/@';
import { AppNormsService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const steps = ['Bill basics', 'Expense plan', 'Participants'];

	const month = AppNormsService.normalizeMoment().endOf('month').unix();
	const today = AppNormsService.normalizeMoment().endOf('day').unix();

	// component state
	const [billTitle, setBillTitle] = useState('');
	const [currentStep, setCurrentStep] = useState(0);
	const [participants, setParticipants] = useState(new Set<string>());
	const [validToDate, setValidToDate] = useState(month);
	const [viewLoading, setViewLoading] = useState(false);

	const canGoBack = currentStep !== 0;
	const canGoNext = currentStep !== 2 && !!billTitle.length && validToDate >= today;
	const canGoSave = currentStep === 2 && !!billTitle.length && validToDate >= today;

	function goHome() {
		navigate(-1);
	}

	function goBack() {
		setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));
	}

	function goNext() {
		setCurrentStep((prev) => (prev < 2 ? prev + 1 : 2));
	}

	async function goSave() {
		setViewLoading(true);

		try {
		} catch {
			alert('Something went wrong. Please try again later.');
		}

		setViewLoading(false);
	}

	// component layout
	return (
		<>
			<BillFormTopbar goBack={goHome} />
			<AppViewLoading isLoading={viewLoading} />
			<AppViewStack flex={1} gap={1} padding={1}>
				<BillFormStepper activeStep={currentStep} steps={steps} />
				<Container maxWidth={'md'} sx={{ marginY: 'auto' }}>
					{currentStep === 0 && (
						<BillFormDisplayInfo
							displayTitle={billTitle}
							displayValidTo={validToDate}
							updateDisplayTitle={setBillTitle}
							updateDisplayValidTo={setValidToDate}
						/>
					)}
					{currentStep === 1 && <BillFormDisplayPlan />}
					{currentStep === 2 && <BillFormParticipants />}
				</Container>
				<BillFormActions
					canGoBack={canGoBack}
					canGoNext={canGoNext}
					canGoSave={canGoSave}
					goBack={goBack}
					goNext={goNext}
					goSave={goSave}
				/>
			</AppViewStack>
			<AppViewIOSChin />
		</>
	);
}
