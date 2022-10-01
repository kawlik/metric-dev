import { Button, Container, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { useEffect, useState } from 'react';
import { AppViewStack, SignUpUsername } from '../../components/@';

export default function (props: {}) {
	// component logic
	const steps = ['Set profile name', 'Set profile picture', 'Your profile view'];

	// component state
	const [activeStep, setActiveStep] = useState(0);

	// component lifecycle
	useEffect(() => {}, []);

	// component layout
	return (
		<AppViewStack flex={1} gap={1} padding={1}>
			<Stepper activeStep={activeStep} alternativeLabel={true}>
				{steps.map((step) => {
					return (
						<Step key={step}>
							<StepLabel>{step}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<Container maxWidth={'md'} sx={{ margin: 'auto' }}>
				<SignUpUsername updateUsername={(usernam: string) => Promise.reject()} />
			</Container>
			<Stack flexDirection={'row'} justifyContent={'flex-end'}>
				<Button color={'inherit'} disabled={true} sx={{ marginRight: 'auto' }}>
					Back
				</Button>
				<Button color={'primary'} disabled={true}>
					Next
				</Button>
				<Button color={'success'} disabled={true}>
					Skip
				</Button>
			</Stack>
		</AppViewStack>
	);
}
