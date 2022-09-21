import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material';

export default function (props: {
	actionDiscard(): void;
	actionProcess(): void;
	input?: {
		label: string;
		onChange(value: string): void;
		type: string;
		value: string;
	};
	isOpen: boolean;
	label: string;
	title: string;
}) {
	// component logic

	// component layout
	return (
		<Dialog fullWidth open={props.isOpen} maxWidth="sm">
			<DialogTitle>{props.title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{props.label}</DialogContentText>
				{!!props?.input && (
					<TextField
						autoFocus
						fullWidth
						label={props.input.label}
						onChange={(e) => props.input!.onChange(e.target.value)}
						type={props.input.type}
						value={props.input.value}
						variant="standard"
					/>
				)}
				<DialogActions>
					<Button color="inherit" onClick={props.actionDiscard}>
						Discard
					</Button>
					<Button color="primary" onClick={props.actionProcess}>
						Process
					</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	);
}
