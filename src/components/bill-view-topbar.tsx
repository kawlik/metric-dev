import { ArrowBackIosNew, Edit, EventBusy, Leaderboard, MoreVert } from '@mui/icons-material';
import {
	AppBar,
	ButtonGroup,
	Divider,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material';
import { useRef, useState } from 'react';

export default function (props: {
	goBack(): void;
	isLedger: boolean;
	isReport: boolean;
	label: string;
	openModify(): void;
	openReport(): void;
	openStats(): void;
}) {
	// component logic
	const menuAnchor = useRef(null);

	// component state
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function closeMenu() {
		setIsMenuOpen(false);
	}

	function openMenu() {
		setIsMenuOpen(true);
	}

	// component layout
	return (
		<AppBar color={'inherit'} elevation={0} position={'static'}>
			<Toolbar>
				<IconButton onClick={props.goBack}>
					<ArrowBackIosNew />
				</IconButton>
				<Typography marginX={1} noWrap={true} variant={'h6'}>
					{props.label}
				</Typography>
				<ButtonGroup sx={{ marginLeft: 'auto' }}>
					<IconButton onClick={openMenu} ref={menuAnchor}>
						<MoreVert />
					</IconButton>
				</ButtonGroup>
			</Toolbar>
			<Menu anchorEl={menuAnchor.current} onClose={closeMenu} open={isMenuOpen}>
				<MenuItem disabled={props.isReport} onClick={props.openModify}>
					<ListItemIcon>
						<Edit />
					</ListItemIcon>
					<ListItemText>Modify</ListItemText>
				</MenuItem>
				<MenuItem disabled={props.isReport} onClick={props.openReport}>
					<ListItemIcon>
						<EventBusy />
					</ListItemIcon>
					<ListItemText>Report</ListItemText>
				</MenuItem>
				<Divider />
				<MenuItem onClick={props.openStats}>
					<ListItemIcon>
						<Leaderboard />
					</ListItemIcon>
					<ListItemText>Statistics</ListItemText>
				</MenuItem>
			</Menu>
		</AppBar>
	);
}
