import { Avatar, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';

export default function (props: {}) {
	// component logic

	// component layout
	return (
		<ListItemButton>
			<ListItemAvatar>
				<Avatar></Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={
					<span className="block overflow-hidden text-ellipsis text-xl whitespace-nowrap">
						Ledger label
					</span>
				}
				secondary={
					<span className="block overflow-hidden text-ellipsis text-md whitespace-nowrap">
						<small>12.09.2022</small>
						<span> &bull; You and X others</span>
					</span>
				}
			/>
		</ListItemButton>
	);
}
