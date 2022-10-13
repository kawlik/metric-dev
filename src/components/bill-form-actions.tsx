import { Button, Stack } from '@mui/material';

export default function (props: {
	canGoBack: boolean;
	canGoNext: boolean;
	canGoSave: boolean;
	goBack(): void;
	goNext(): void;
	goSave(): Promise<void>;
}) {
	// component logic

	// component layout
	return (
		<Stack flexDirection={'row'} justifyContent={'flex-end'}>
			<Button
				color={'inherit'}
				disabled={!props.canGoBack}
				onClick={props.goBack}
				sx={{ marginRight: 'auto' }}
			>
				Back
			</Button>
			<Button color={'primary'} disabled={!props.canGoNext} onClick={props.goNext}>
				Next
			</Button>
			<Button color={'success'} disabled={!props.canGoSave} onClick={props.goSave}>
				Save
			</Button>
		</Stack>
	);
}
