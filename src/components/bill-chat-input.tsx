import { AttachMoney, FactCheck, RequestQuote, Send } from '@mui/icons-material';
import {
	AppBar,
	IconButton,
	InputAdornment,
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon,
	TextField,
	Toolbar,
} from '@mui/material';

export default function (props: {}) {
	// component logic
	const availableActions = [
		{
			icon: AttachMoney,
			name: 'Expense',
			open: () => alert('Sorry, the selected functionality is not available yet.'),
		},
		{
			icon: RequestQuote,
			name: 'Objective',
			open: () => alert('Sorry, the selected functionality is not available yet.'),
		},
		{
			icon: FactCheck,
			name: 'Checklist',
			open: () => alert('Sorry, the selected functionality is not available yet.'),
		},
	];

	// component layout
	return (
		<AppBar
			color={'inherit'}
			elevation={0}
			position={'static'}
			sx={{
				borderTopColor: (theme) => theme.palette.action.disabledBackground,
				borderTopStyle: 'solid',
				borderTopWidth: 1,
			}}
		>
			<Toolbar sx={{ alignItems: 'flex-end', paddingY: 1 }}>
				<SpeedDial
					ariaLabel={'Bill actions'}
					icon={<SpeedDialIcon />}
					sx={{ position: 'absolute' }}
				>
					{availableActions.map((action) => (
						<SpeedDialAction
							key={action.name}
							icon={<action.icon />}
							onClick={action.open}
							tooltipOpen={true}
							tooltipPlacement={'right'}
							tooltipTitle={action.name}
						/>
					))}
				</SpeedDial>
				<TextField
					fullWidth={true}
					maxRows={3}
					multiline={true}
					placeholder={'Fast post'}
					sx={{ marginLeft: 8 }}
					InputProps={{
						endAdornment: (
							<InputAdornment
								position={'end'}
								sx={{ marginBottom: 1.5, marginTop: 'auto' }}
							>
								<IconButton>
									<Send sx={{ transform: 'rotate(-30deg)' }} />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Toolbar>
		</AppBar>
	);
}
