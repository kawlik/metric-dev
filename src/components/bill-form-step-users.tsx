import { Delete, PersonSearch } from '@mui/icons-material';
import {
	Avatar,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useContexts } from '../contexts/@';

export default function (props: { users: string[]; setUsers(users: string[]): void }) {
	// component logic
	const contexts = useContexts();

	const userAuth = contexts.userAuth.get();
	const usersSet = new Set(props.users);

	const assignedUsersArray = new Array(...usersSet);
	const assignedUsersLimit = 6;

	// component lifecycle
	useEffect(() => {
		props.setUsers([...usersSet.add(userAuth?.phoneNumber!)]);
	}, []);

	// component layout
	return (
		<List sx={{ padding: 0 }}>
			{assignedUsersArray.map((user, index) => (
				<ListItem key={index}>
					<ListItemAvatar>
						<Avatar />
					</ListItemAvatar>
					<ListItemText primary={<Typography noWrap={true}>{user}</Typography>} />
					<IconButton disabled={user === userAuth?.phoneNumber}>
						<Delete />
					</IconButton>
				</ListItem>
			))}
			{new Array(assignedUsersLimit - assignedUsersArray.length)
				.fill('Free slot')
				.map((user, index) => (
					<ListItem key={index}>
						<ListItemAvatar>
							<Avatar />
						</ListItemAvatar>
						<ListItemText primary={<Typography noWrap={true}>{user}</Typography>} />
						<IconButton>
							<PersonSearch />
						</IconButton>
					</ListItem>
				))}
		</List>
	);
}
