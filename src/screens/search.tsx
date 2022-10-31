import { ArrowBackIosNew, Search } from '@mui/icons-material';
import {
	AppBar,
	Autocomplete,
	IconButton,
	InputAdornment,
	TextField,
	Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContexts } from '../contexts/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const ledgers = contexts.billLedgers.get() || [];
	const reports = contexts.billReports.get() || [];

	const optionsLedgers = ledgers.map((bill) => ({
		label: bill.title,
		page: `/report/${bill.id}`,
		type: 'Ledgers',
	}));

	const optionsReports = reports.map((bill) => ({
		label: bill.title,
		page: `/report/${bill.id}`,
		type: 'Reports',
	}));

	const options = [...optionsLedgers, ...optionsReports];

	function goBack() {
		navigate(-1);
	}

	function open(page: string) {
		navigate(page, { replace: true });
	}

	// component layout
	return (
		<AppBar
			color={'inherit'}
			elevation={0}
			position={'static'}
			sx={{ marginBottom: 'auto' }}
		>
			<Toolbar>
				<IconButton onClick={goBack}>
					<ArrowBackIosNew />
				</IconButton>
				<Autocomplete
					fullWidth={true}
					groupBy={(option) => option.type}
					onChange={(event, value) => !!value?.page && open(value.page)}
					options={options}
					size={'small'}
					renderInput={(params) => (
						<TextField
							{...params}
							label={'Search'}
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<InputAdornment
										position={'end'}
										sx={{ position: 'absolute', right: 8 }}
									>
										<Search />
									</InputAdornment>
								),
							}}
						/>
					)}
				/>
			</Toolbar>
		</AppBar>
	);
}
