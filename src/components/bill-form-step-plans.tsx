import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Switch,
	Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { BillPlanIconMap } from '../configs/@';

export default function (props: { plans: string[]; setPlans(plans: string[]): void }) {
	// component logic
	const chosenPlansSet = new Set(props.plans);
	const availablePlans = [...BillPlanIconMap].map((plan) => ({
		icon: plan[1],
		name: plan[0],
	}));

	function onPlanChange(plan: string, value: boolean) {
		if (value) {
			chosenPlansSet.add(plan);
		} else {
			chosenPlansSet.delete(plan);
		}

		props.setPlans([...chosenPlansSet.add('Other')]);
	}

	// component lifecycle
	useEffect(() => {
		props.setPlans([...chosenPlansSet.add('Other')]);
	}, []);

	// component layout
	return (
		<List sx={{ padding: 0 }}>
			{availablePlans.map((expense) => (
				<ListItem key={expense.name}>
					<ListItemAvatar>
						<Avatar>
							<expense.icon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={<Typography noWrap={true}>{expense.name}</Typography>}
					/>
					<Switch
						onChange={(e) => onPlanChange(expense.name, e.target.checked)}
						checked={chosenPlansSet.has(expense.name)}
						disabled={expense.name === 'Other'}
						size={'small'}
					/>
				</ListItem>
			))}
		</List>
	);
}
