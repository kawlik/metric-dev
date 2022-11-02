import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material';
import { BillPostType } from '../types/@';

export default function (props: { posts: BillPostType[]; users: string[] }) {
	// component logic
	const totalPosts = props.posts.length;
	const totalValue = props.posts
		.reduce((prev, curr) => {
			if (curr.post.type !== 'Expense') return prev;
			return prev + curr.post.cost;
		}, 0)
		.toFixed(2);

	function getContribution(user: string) {
		return props.posts
			.reduce((prev, curr) => {
				const currType = curr.post.type;
				const currUser = curr.user;

				if (currUser !== user) return prev;
				if (currType !== 'Expense') return prev;

				return prev + curr.post.cost;
			}, 0)
			.toFixed(2);
	}

	// component layout
	return (
		<>
			<Typography variant={'h4'}>Summary</Typography>
			<Typography variant={'h6'}>💡 Total posts: {totalPosts}</Typography>
			<Typography variant={'h6'}>💰 Total value: {totalValue}</Typography>
			<Typography />
			<Typography variant={'h5'}>Contributions</Typography>
			<List>
				{props.users.map((user) => (
					<ListItem key={user}>
						<ListItemAvatar>
							<Avatar />
						</ListItemAvatar>
						<ListItemText
							primary={
								<Typography noWrap={true}>
									🪙 {getContribution(user)}
								</Typography>
							}
							secondary={
								<Typography noWrap={true} variant={'subtitle2'}>
									{user}
								</Typography>
							}
						/>
					</ListItem>
				))}
			</List>
		</>
	);
}
