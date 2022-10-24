import { Delete, Dialpad, Person, PersonOff, PersonSearch } from '@mui/icons-material';
import {
	Avatar,
	ButtonGroup,
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

	const assignedUsersLimit = 9;
	const assignedUsersArray = new Array(...usersSet);
	const unassignedSlots = new Array(assignedUsersLimit - assignedUsersArray.length).fill(
		'Unasigned slot',
	);

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
						<Avatar>
							<Person />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={<Typography noWrap={true}>{user}</Typography>} />
					<IconButton disabled={user === userAuth?.phoneNumber}>
						<Delete />
					</IconButton>
				</ListItem>
			))}
			{unassignedSlots.map((user, index) => (
				<ListItem key={index}>
					<ListItemAvatar>
						<Avatar>
							<PersonOff />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={<Typography noWrap={true}>{user}</Typography>} />
					{index === 0 && (
						<ButtonGroup>
							<IconButton>
								<Dialpad />
							</IconButton>
							<IconButton>
								<PersonSearch />
							</IconButton>
						</ButtonGroup>
					)}
				</ListItem>
			))}
		</List>
	);
}
