import {
	Checkbox,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { AppNormsService, BillDataService } from '../services/@.service';

export default function (props: { plans: string[]; setPlans(plans: string[]): void }) {
	// component logic
	const chosenExpensesSet = new Set(props.plans);
	const availableExpenses = [...BillDataService.AvailablePlansMap].map((plan) => ({
		color: AppNormsService.normalizeColor(plan[0]),
		name: plan[0],
		icon: plan[1],
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
					<ListItemIcon sx={{ color: expense.color }}>
						<expense.icon />
					</ListItemIcon>
					<ListItemText
						primary={<Typography noWrap={true}>{expense.name}</Typography>}
					/>
					<Checkbox
						onChange={(e) => onExpanseChange(expense.name, e.target.checked)}
						checked={chosenExpensesSet.has(expense.name)}
					/>
				</ListItem>
			))}
		</List>
	);
}
