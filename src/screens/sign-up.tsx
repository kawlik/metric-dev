import { Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	AppViewIOSChin,
	AppViewLoading,
	AppViewStack,
	SignUpActions,
	SignUpDisplay,
	SignUpPicture,
	SignUpPreview,
	SignUpStepper,
} from '../components/@';
import { useContexts } from '../contexts/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const steps = ['Set profile name', 'Set profile picture', 'Save your profile'];

	// component state
	const [currentStep, setCurrentStep] = useState(0);
	const [displayName, setDisplayName] = useState('');
	const [userPicture, setUserPicture] = useState('');

	const canGoBack = currentStep !== 0;
	const canGoNext = currentStep !== 2 && !!displayName.length;
	const canGoSave = currentStep === 2 && !!displayName.length && !!userPicture.length;

	const userPhoneNumber = contexts.auth.get()?.phoneNumber!;

	function goBack() {
		setCurrentStep((prev) => prev - 1);
	}

	function goNext() {
		setCurrentStep((prev) => prev + 1);
	}

	function goSave() {
		return Promise.reject(alert('DUPA'));
	}

	// component layout
	return (
		<>
			<AppViewLoading isLoading={false} />
			<AppViewStack flex={1} gap={1} padding={1}>
				<SignUpStepper activeStep={currentStep} steps={steps} />
				<Container maxWidth={'md'} sx={{ marginY: 'auto' }}>
					{currentStep === 0 && (
						<SignUpDisplay
							displayName={displayName}
							updateDisplayName={setDisplayName}
						/>
					)}
					{currentStep === 1 && (
						<SignUpPicture
							userPicture={userPicture}
							updateUserPicture={setUserPicture}
						/>
					)}
					{currentStep === 2 && (
						<SignUpPreview
							displayname={displayName}
							userPicture={userPicture}
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
