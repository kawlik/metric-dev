import { Container } from '@mui/material';
import { useState } from 'react';
import {
	AppViewIOSChin,
	AppViewLoading,
	AppViewStack,
	SignUpActions,
	SignUpStepName,
	SignUpStepPict,
	SignUpPreview,
	SignUpStepper,
} from '../components/@';
import { useContexts } from '../contexts/@';
import { AppAlertService, UserDataService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();

	const steps = ['Profile name', 'Profile picture', 'Profile preview'];

	// component state
	const [currentStep, setCurrentStep] = useState(0);
	const [displayName, setDisplayName] = useState('');
	const [displayPict, setDisplayPict] = useState('');
	const [viewLoading, setViewLoading] = useState(false);

	const canGoBack = currentStep !== 0;
	const canGoNext = currentStep !== 2 && !!displayName.length;
	const canGoSave = currentStep === 2 && !!displayName.length;

	const userPhoneNumber = contexts.userAuth.get()?.phoneNumber!;

	function goBack() {
		setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));
	}

	function goNext() {
		setCurrentStep((prev) => (prev < 2 ? prev + 1 : 2));
	}

	async function goSave() {
		setViewLoading(true);

		try {
			await UserDataService.saveUser({
				displayName: displayName.trim(),
				displayPict: displayPict,
			});

			contexts.isSignedUp.set(true);
		} catch {
			AppAlertService.error();
		}

		setViewLoading(false);
	}

	// component layout
	return (
		<>
			<AppViewLoading isLoading={viewLoading} />
			<AppViewStack flex={1} gap={1} padding={1} sx={{ overflowY: 'scroll' }}>
				<SignUpStepper activeStep={currentStep} steps={steps} />
				<Container maxWidth={'md'} sx={{ marginY: 'auto', overflowY: 'scroll' }}>
					{currentStep === 0 && (
						<SignUpStepName name={displayName} setName={setDisplayName} />
					)}
					{currentStep === 1 && (
						<SignUpStepPict pict={displayPict} setPict={setDisplayPict} />
					)}
					{currentStep === 2 && (
						<SignUpPreview
							displayname={displayName}
							displayPict={displayPict}
							userPhoneNumber={userPhoneNumber}
						/>
					)}
				</Container>
				<SignUpActions
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
