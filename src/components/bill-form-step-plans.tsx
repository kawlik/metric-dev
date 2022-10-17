import { AttachMoney, Extension } from '@mui/icons-material';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Switch,
	TextField,
	Typography,
} from '@mui/material';

export default function (props: {}) {
	// component logic
	const availableExpenses = [
		'Wydatek 1',
		'Wydatek 2',
		'Wydatek 3',
		'Wydatek 4',
		'Wydatek 5',
		'Wydatek 6',
	];

	// component layout
	return (
		<List>
			{availableExpenses.map((expense) => (
				<ListItem key={expense}>
					<ListItemIcon>
						<Extension />
					</ListItemIcon>
					<ListItemText primary={<Typography noWrap={true}>{expense}</Typography>} />
					<TextField
						helperText={'Your plan'}
						size={'small'}
						sx={{ width: 72 }}
						type={'number'}
						variant={'standard'}
						InputProps={{
							endAdornment: <AttachMoney fontSize={'inherit'} />,
						}}
					/>
				</ListItem>
			))}
		</List>
	);
}
