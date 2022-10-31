import { Box, Paper, Typography } from '@mui/material';
import { Cell, Tooltip, Pie, PieChart, Legend } from 'recharts';
import { AppNormsService } from '../services/@.service';
import { BillInfoType } from '../types/@';

export default function (props: { bills: BillInfoType[] }) {
	// component logic
	const ballance = props.bills.reduce((prev, curr) => prev + curr.balance, 0);

	// component layout
	return (
		<Box marginX={'auto'} marginY={1}>
			<PieChart height={200} width={200}>
				<Pie
					children={props.bills.map((bill) => (
						<Cell
							fill={AppNormsService.normalizeColor(bill.id!)}
							key={bill.title}
							name={bill.title}
						/>
					))}
					data={props.bills}
					dataKey={'balance'}
					innerRadius={70}
					outerRadius={90}
					paddingAngle={5}
				/>
				<Tooltip
					wrapperStyle={{ outline: 'none' }}
					content={({ payload }) => (
						<Paper elevation={4} sx={{ paddingX: 2, paddingY: 1 }}>
							<Typography>{!!payload?.length && payload[0].name}</Typography>
						</Paper>
					)}
				/>
				<Legend
					align={'center'}
					verticalAlign={'middle'}
					content={() => (
						<Typography textAlign={'center'} variant={'h4'}>
							{AppNormsService.normalizeNumber(ballance)}💰
						</Typography>
					)}
				/>
			</PieChart>
		</Box>
	);
}
