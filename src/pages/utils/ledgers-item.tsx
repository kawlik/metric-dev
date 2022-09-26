import {
	Avatar,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Stack,
	Typography,
} from '@mui/material';

export default function (props: { date: string; more: string; open(): void; title: string }) {
	// component logic

	// component layout
	return (
		<ListItemButton onClick={props.open}>
			<ListItemAvatar>
				<Avatar></Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={props.title}
				secondary={
					<Stack
						component="span"
						sx={{
							alignItems: 'center',
							flexDirection: 'row',
							gap: 1,
							overflow: 'hidden',
						}}
					>
						<Typography component="span" noWrap variant="subtitle2">
							{props.date}
						</Typography>
						&bull;
						<Typography component="span" noWrap variant="subtitle1">
							{props.more}
						</Typography>
					</Stack>
				}
			/>
		</ListItemButton>
	);
}
