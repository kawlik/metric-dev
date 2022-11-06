import { AttachMoney, Sell } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Container,
	InputAdornment,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppViewStack } from '../../components/@';
import { BillPlanIconMap } from '../../configs/@';
import { useContexts } from '../../contexts/@';
import { AppAlertService, BillPostalService } from '../../services/@.service';

// assets
import Gif from '../../assets/purse.gif';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const document = contexts.billInfo.get()?.id!;
	const balance = contexts.billInfo.get()?.balance!;
	const options = [...BillPlanIconMap].map((plan) => ({
		icon: plan[1],
		name: plan[0],
	}));

	// component state
	const [expenseCost, setExpenseCost] = useState('');
	const [expenseName, setExpenseName] = useState('');
	const [expensePlan, setExpensePlan] = useState('Other');
	const [isSending, setIsSending] = useState(false);

	const canSend = !!expenseName.trim() && +expenseCost > 0;

	async function send() {
		setIsSending(true);

		try {
			const expenseCostFixed = Number.parseFloat(expenseCost).toFixed(2);
			const expenseCostValue = Number.parseFloat(expenseCostFixed);

			if (Number.isNaN(expenseCostValue)) {
				throw 'Invalid expenseCost value!'!;
			}

			await BillPostalService.postExpense(document, balance, {
				cost: expenseCostValue,
				plan: expensePlan,
				text: expenseName,
			});

			navigate(-1);
		} catch (error) {
			AppAlertService.error().then(() => {
				setIsSending(false);
			});
		}
	}

	// component layout
	return (
		<AppViewStack flex={1}>
			<Container maxWidth={'md'} sx={{ marginY: 'auto', overflowY: 'scroll' }}>
				<Stack gap={2}>
					<Box margin={'auto'}>
						<Avatar src={Gif} sx={{ height: 72, width: 72 }} variant={'rounded'} />
					</Box>
					<Stack flexDirection={'row'} gap={1}>
						<Select
							onChange={(e) => setExpensePlan(e.target.value)}
							size={'small'}
							sx={{ overflowX: 'hidden' }}
							value={expensePlan}
						>
							{options.map((plan) => (
								<MenuItem key={plan.name} value={plan.name}>
									<plan.icon fontSize={'inherit'} />
									<Typography component={'span'} marginLeft={1} noWrap={true}>
										{plan.name}
									</Typography>
								</MenuItem>
							))}
						</Select>
						<TextField
							error={!expenseName}
							fullWidth={true}
							label={'Expense name'}
							onChange={(e) => setExpenseName(e.target.value)}
							size={'small'}
							type={'text'}
							value={expenseName}
						/>
					</Stack>
					<TextField
						error={!expenseCost}
						fullWidth={true}
						label={'Expense cost'}
						onChange={(e) => setExpenseCost(e.target.value)}
						size={'small'}
						type={'number'}
						value={expenseCost}
						InputProps={{
							endAdornment: (
								<InputAdornment position={'end'}>
									<AttachMoney />
								</InputAdornment>
							),
						}}
					/>
					<Button
						disabled={!canSend || isSending}
						endIcon={<Sell />}
						fullWidth={true}
						onClick={send}
						size={'large'}
						sx={{ position: 'relative' }}
						variant={'outlined'}
					>
						{isSending && (
							<CircularProgress size={24} sx={{ position: 'absolute' }} />
						)}
						Post expense
					</Button>
				</Stack>
			</Container>
		</AppViewStack>
	);
}
