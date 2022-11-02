import { Logout, MoreVert, Search, Security, Settings } from '@mui/icons-material';
import {
	AppBar,
	Avatar,
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
	avatar: string;
	label: string;
	logout(): void;
	openSearch(): void;
	openSettings(): void;
	openSecurity(): void;
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
				<Avatar src={props.avatar} sx={{ height: 36, width: 36 }} />
				<Typography
					marginX={1}
					noWrap={true}
					textTransform={'capitalize'}
					variant={'h6'}
				>
					{props.label}
				</Typography>
				<ButtonGroup sx={{ marginLeft: 'auto' }}>
					<IconButton onClick={props.openSearch}>
						<Search />
					</IconButton>
					<IconButton onClick={openMenu} ref={menuAnchor}>
						<MoreVert />
					</IconButton>
				</ButtonGroup>
			</Toolbar>
			<Menu anchorEl={menuAnchor.current} onClose={closeMenu} open={isMenuOpen}>
				<MenuItem onClick={props.openSecurity}>
					<ListItemIcon>
						<Security />
					</ListItemIcon>
					<ListItemText>Security</ListItemText>
				</MenuItem>
				<MenuItem onClick={props.openSettings}>
					<ListItemIcon>
						<Settings />
					</ListItemIcon>
					<ListItemText>Settings</ListItemText>
				</MenuItem>
				<Divider />
				<MenuItem onClick={props.logout}>
					<ListItemIcon>
						<Logout />
					</ListItemIcon>
					<ListItemText>Logout</ListItemText>
				</MenuItem>
			</Menu>
		</AppBar>
	);
}
