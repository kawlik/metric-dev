import { Avatar, List, ListItem, Paper } from '@mui/material';
import { useContexts } from '../contexts/@';
import { BillChatEntry } from './@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();

	const posts = contexts.billData.get()?.posts || [];
	const user = contexts.userAuth.get()!;

	// component layout
	return (
		<List
			sx={{
				display: 'flex',
				flex: 1,
				flexDirection: 'column-reverse',
				overflowY: 'scroll',
			}}
		>
			{posts.map((post, index) => (
				<ListItem key={index} sx={{ alignItems: 'flex-start', gap: 1, order: -index }}>
					<Avatar
						sx={{
							height: 32,
							width: 32,
							visibility: post.user === user.phoneNumber ? 'collapse' : 'visible',
						}}
					/>
					<Paper
						elevation={4}
						sx={{
							bgcolor: (theme) => theme.palette.action.disabledBackground,
							marginRight: post.user === user.phoneNumber ? 0 : 'auto',
							marginLeft: post.user !== user.phoneNumber ? 0 : 'auto',
							padding: 1,
						}}
					>
						<BillChatEntry post={post} />
					</Paper>
					<Avatar
						src={user.photoURL!}
						sx={{
							height: 32,
							width: 32,
							visibility: post.user === user.phoneNumber ? 'visible' : 'collapse',
						}}
					/>
				</ListItem>
			))}
		</List>
	);
}
