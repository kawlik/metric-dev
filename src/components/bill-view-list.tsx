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
	const mapBillsWithTypeIcon = props.bills.map((bill) => ({
		icon: AppNormsService.normalizeBillTypeIcon(bill.type),
		...bill,
	}));

	function parseSecondaryText(bill: BillInfoType) {
		if (bill.participants.length == 1) return `Only You`;
		if (bill.participants.length == 2) return `You and someone else`;

		return `You and ${bill.participants.length - 1} others`;
	}

	// component layout
	return (
		<List sx={{ padding: 0 }}>
			{mapBillsWithTypeIcon.map((bill) => (
				<ListItemButton key={bill.id} onClick={() => props.openBillView(bill.id!)}>
					<ListItemAvatar>
						<Avatar sx={{ bgcolor: AppNormsService.normalizeColor(bill.id!) }}>
							<bill.icon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={<Typography noWrap={true}>{bill.title}</Typography>}
						secondary={
							<Typography noWrap={true} variant={'subtitle2'}>
								{parseSecondaryText(bill)}
							</Typography>
						}
					/>
				</ListItemButton>
			))}
		</List>
	);
}
