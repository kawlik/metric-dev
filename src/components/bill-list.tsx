import { Extension } from '@mui/icons-material';
import {
	Avatar,
	List,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material';
import { AppNormsService } from '../services/@.service';
import { BillInfoType } from '../types/@';

export default function (props: {
	bills: BillInfoType[];
	filters: string[];
	openBillView(billID: string): void;
}) {
	// component logic

	function parse(bill: BillInfoType) {
		if (bill.participants.length == 1) return `Only You`;
		if (bill.participants.length == 2) return `You and someone else`;

		return `You and ${bill.participants.length - 1} others`;
	}

	// component layout
	return (
		<List sx={{ padding: 0 }}>
			{props.bills.map((bill) => (
				<ListItemButton key={bill.id} onClick={() => props.openBillView(bill.id!)}>
					<ListItemAvatar>
						<Avatar sx={{ bgcolor: AppNormsService.normalizeColor(bill.id!) }}>
							<Extension />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={<Typography noWrap={true}>{bill.title}</Typography>}
						secondary={<Typography noWrap={true}>{parse(bill)}</Typography>}
					/>
				</ListItemButton>
			))}
		</List>
	);
}
