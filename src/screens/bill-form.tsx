import { Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	AppViewIOSChin,
	AppViewLoading,
	AppViewStack,
	BillFormActions,
	BillFormStepBasic,
	BillFormStepPlans,
	BillFormStepUsers,
	BillFormStepper,
	BillFormTopbar,
} from '../components/@';
import { useContexts } from '../contexts/@';
import { AppNormsService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const self = contexts.userAuth.get()?.phoneNumber!;
	const steps = ['Bill basics', 'Expense plan', 'Participants'];

	const monthUnix = AppNormsService.normalizeMoment().endOf('month').valueOf();
	const todayUnix = AppNormsService.normalizeMoment().endOf('day').valueOf();

	// component state
	const [billTitle, setBillTitle] = useState('');
	const [currentStep, setCurrentStep] = useState(0);
	const [expensesPlan, setExpensesPlan] = useState(new Array<string>());
	const [participants, setParticipants] = useState(new Array<string>(self));
	const [validToDate, setValidToDate] = useState(monthUnix);
	const [viewLoading, setViewLoading] = useState(false);

	const canGoBack = currentStep !== 0;
	const canGoNext = currentStep !== 2 && !!billTitle.length && validToDate > todayUnix;
	const canGoSave = currentStep === 2 && !!billTitle.length && validToDate > todayUnix;

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
			<AppViewStack flex={1} gap={1} padding={1} sx={{ overflowY: 'hidden' }}>
				<BillFormStepper activeStep={currentStep} steps={steps} />
				<Container maxWidth={'md'} sx={{ marginY: 'auto', overflowY: 'scroll' }}>
					{currentStep === 0 && (
						<BillFormStepBasic
							title={billTitle}
							dedline={validToDate}
							setTitle={setBillTitle}
							setDedline={setValidToDate}
						/>
					)}
					{currentStep === 1 && <BillFormStepPlans setPlans={setExpensesPlan} />}
					{currentStep === 2 && <BillFormStepUsers setUsers={setParticipants} />}
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
