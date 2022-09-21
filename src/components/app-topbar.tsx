import { AppBar, IconButton, SvgIcon, Toolbar, Typography } from '@mui/material';
import { ReactNode } from 'react';

export default function (props: {
	label: string;
	utilL?: { action(): void; icon: ReactNode };
	utilR?: { action(): void; icon: ReactNode };
}) {
	// component logic

	// component layout
	return (
		<AppBar color="inherit" elevation={0} position="static">
			<Toolbar>
				<IconButton disabled={!props?.utilL}>
					{props.utilL?.icon || <SvgIcon />}
				</IconButton>
				<Typography
					flex={1}
					noWrap
					textAlign="center"
					textTransform="capitalize"
					variant="h6"
				>
					{props.label}
				</Typography>
				<IconButton disabled={!props?.utilR}>
					{props.utilR?.icon || <SvgIcon />}
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
