import { AccountBalance } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import { Cell, Tooltip, Pie, PieChart, Legend } from 'recharts';
import { BillInfoType } from '../types/@';

export default function (props: { bills: BillInfoType[] }) {
	// component logic
	const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
	const parsed = new Array(4).fill({ title: 'Bill title' }).map((bill) => ({
		...bill,
		balance: Math.ceil(Math.random() * 1000),
	}));

	const formatter = Intl.NumberFormat('en', { notation: 'compact' });
	const balance = formatter.format(parsed.reduce((prev, curr) => prev + curr.balance, 0));

	// component layout
	return (
		<Box marginX={'auto'} marginY={1}>
			<PieChart height={200} width={200}>
				<Pie
					children={parsed.map((item, index) => (
						<Cell
							fill={colors[index % colors.length]}
							key={item.title}
							name={item.title}
						/>
					))}
					data={parsed}
					dataKey={'balance'}
					fill={'#8884d8'}
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
					align="center"
					verticalAlign="middle"
					content={
						<Typography textAlign={'center'} variant={'h4'}>
							{balance}
						</Typography>
					}
				/>
			</PieChart>
		</Box>
	);
}
