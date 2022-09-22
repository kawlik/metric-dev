import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { ReactNode } from 'react';

export default function (props: {
	actions: {
		action(): void;
		icon: ReactNode;
		title: string;
	}[];
}) {
	// component logic

	// component layout
	return (
		<Box
			sx={{
				bottom: 0,
				marginLeft: 'auto',
				marginRight: 2,
				marginTop: 'auto',
				position: 'sticky',
			}}
		>
			<SpeedDial ariaLabel="Speed Dial Actions" icon={<SpeedDialIcon />}>
				{props.actions.map((item) => (
					<SpeedDialAction
						icon={item.icon}
						key={item.title}
						onClick={item.action}
						tooltipTitle={item.title}
					/>
				))}
			</SpeedDial>
		</Box>
	);
}
