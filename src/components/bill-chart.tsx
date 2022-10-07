import { Badge, Box, Paper, Typography } from '@mui/material';
import { Cell, Tooltip, Pie, PieChart } from 'recharts';
import { BillInfoType } from '../types/@';

export default function (props: { bills: BillInfoType[] }) {
	// component logic
	const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
	const parsed = new Array(4).fill({ title: '' }).map((bill) => ({
		...bill,
		ballance: Math.ceil(Math.random() * 1000),
	}));

	// component layout
	return (
		<Box marginX={'auto'} marginY={1}>
			<PieChart height={200} width={200}>
				<Tooltip
					wrapperStyle={{ outline: 'none' }}
					content={({ payload }) => (
						<Badge
							badgeContent={!!payload?.length && payload[0].value}
							color={'info'}
							max={999}
						>
							<Paper elevation={4} sx={{ paddingX: 2, paddingY: 1 }}>
								<Typography>{!!payload?.length && payload[0].name}</Typography>
							</Paper>
						</Badge>
					)}
				/>
				<Pie
					children={parsed.map((item, index) => (
						<Cell
							fill={colors[index % colors.length]}
							key={item.title}
							name={item.title}
						/>
					))}
					data={parsed}
					dataKey={'ballance'}
					fill={'#8884d8'}
					innerRadius={60}
					outerRadius={80}
					paddingAngle={5}
				/>
			</PieChart>
			<Typography textAlign={'center'} variant={'h6'}>
				{parsed.reduce((prev, curr) => prev + curr.ballance, 0)}$ in total
			</Typography>
		</Box>
	);
}
