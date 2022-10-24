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
	const chosenExpensesSet = new Set(props.plans);
	const availableExpenses = [...BillPlanIconMap].map((plan) => ({
		icon: plan[1],
		name: plan[0],
	}));

	function onExpanseChange(expense: string, value: boolean) {
		if (value) {
			chosenExpensesSet.add(expense);
		} else {
			chosenExpensesSet.delete(expense);
		}

		props.setPlans([...chosenExpensesSet.add('Other')]);
	}

	// component lifecycle
	useEffect(() => {
		props.setPlans([...chosenExpensesSet.add('Other')]);
	}, []);

	// component layout
	return (
		<List sx={{ padding: 0 }}>
			{availableExpenses.map((expense) => (
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
						onChange={(e) => onExpanseChange(expense.name, e.target.checked)}
						checked={chosenExpensesSet.has(expense.name)}
						disabled={expense.name === 'Other'}
						size={'small'}
					/>
				</ListItem>
			))}
		</List>
	);
}
