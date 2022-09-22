import { List } from '@mui/material';
import { BillInfoType } from '../../types/@';
import { LedgersItem } from './@';

export default function (props: { ledgersList: BillInfoType[] }) {
	// component logic
	const mapParticipants = (length: number): string => {
		if (length == 1) return 'Only You';
		if (length == 1) return 'Only You and one more participant';

		return `You, and ${length} more participants`;
	};

	// component layout
	return (
		<List>
			{props.ledgersList.map((item) => (
				<LedgersItem
					date={item.timestampUpdated.toDate().toLocaleDateString()}
					key={item.id}
					more={mapParticipants(item.participants.length)}
					title={item.title}
				/>
			))}
		</List>
	);
}
