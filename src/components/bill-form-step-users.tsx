import { PersonSearch } from '@mui/icons-material';
import {
	Avatar,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useContexts } from '../contexts/@';
import { AppPhoneField } from './@';

export default function (props: { setUsers(users: string[]): void }) {
	// component logic
	const contexts = useContexts();

	// component state
	const [otherUsersSet, setOtherUsersSet] = useState();

	// component lifecycle
	useEffect(() => {
		props.setUsers([contexts.userAuth.get()?.phoneNumber!]);
	}, []);

	// component layout
	return (
		<List sx={{ padding: 0 }}>
			<ListItem>
				<ListItemAvatar>
					<Avatar src={contexts.userAuth.get()?.photoURL || ''} />
				</ListItemAvatar>
				<ListItemText
					primary={
						<Typography noWrap={true}>
							{contexts.userAuth.get()?.phoneNumber} (You)
						</Typography>
					}
				/>
			</ListItem>
			<Divider />
			{new Array(5).fill(null).map((user, index) => (
				<ListItem
					key={index}
					disabled={true}
					secondaryAction={
						<IconButton edge={'end'}>
							<PersonSearch />
						</IconButton>
					}
				>
					<ListItemAvatar>
						<Avatar />
					</ListItemAvatar>
					<ListItemText primary={<AppPhoneField onChange={() => {}} />} />
				</ListItem>
			))}
		</List>
	);
}
