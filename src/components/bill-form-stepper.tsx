import { Step, StepLabel, Stepper } from '@mui/material';

export default function (props: { activeStep: number; steps: string[] }) {
	// component logic

	// component layout
	return (
		<Stepper activeStep={props.activeStep} alternativeLabel={true}>
			{props.steps.map((step) => {
				return (
					<Step key={step}>
						<StepLabel>{step}</StepLabel>
					</Step>
				);
			})}
		</Stepper>
	);
}
