import {
	Checkbox,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AppNormsService, BillDataService } from '../services/@.service';

export default function (props: { setPlans(plans: string[]): void }) {
	// component logic
	const availableExpenses = [...BillDataService.AvailablePlansMap].map((plan) => ({
		color: AppNormsService.normalizeColor(plan[0]),
		name: plan[0],
		icon: plan[1],
	}));

	// component state
	const [selectedExpensesSet, setSelectedExpensesSet] = useState(
		new Set<string>(['Entertainment', 'Food', 'Household', 'Mobility', 'Other']),
	);

	function onExpanseChange(expense: string, value: boolean) {
		selectedExpensesSet.delete(expense);

		if (value) {
			setSelectedExpensesSet(selectedExpensesSet.add(expense));
		}

		props.setPlans([...selectedExpensesSet]);
	}

	// component lifecycle
	useEffect(() => {
		props.setPlans([...selectedExpensesSet]);
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
						checked={selectedExpensesSet.has(expense.name)}
					/>
				</ListItem>
			))}
		</List>
	);
}
