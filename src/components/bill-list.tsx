import { Extension } from '@mui/icons-material';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { BillInfoType } from '../types/@';

export default function (props: { bills: BillInfoType[]; filters: string[] }) {
	// component logic

	// component layout
	return (
		<List>
			{new Array(100).fill(null).map((item, index) => (
				<ListItemButton>
					<ListItemAvatar>
						<Avatar>
							<Extension />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={'Test bill'}
						secondary={'This is bill no ' + index}
					/>
				</ListItemButton>
			))}
		</List>
	);
}
