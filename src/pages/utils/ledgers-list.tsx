import { List } from '@mui/material';
import { BillInfoType } from '../../types/@';
import { LedgersItem } from './@';

export default function (props: { ledgersList: BillInfoType[]; navigate(path: string): void }) {
	// component logic
	const mapParticipants = (length: number): string => {
		if (length == 1) return 'Only You';
		if (length == 1) return 'Only You and one more participant';

		return `You, and ${length} more participants`;
	};

	// component layout
	return (
		<List>
			{props.ledgersList.map((bill) => (
				<LedgersItem
					date={bill.timestampUpdated.toDate().toLocaleDateString()}
					key={bill.id}
					more={mapParticipants(bill.participants.length)}
					open={() => props.navigate(bill.id!)}
					title={bill.title}
				/>
			))}
		</List>
	);
}
