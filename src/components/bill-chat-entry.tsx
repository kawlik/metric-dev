import { Button, Divider, Typography } from '@mui/material';
import { BillPostType } from '../types/@';

export default function (props: { post: BillPostType }) {
	// component logic

	if (props.post.post.type === 'Post') {
		return Post({ text: props.post.post.text });
	}

	if (props.post.post.type === 'Expense') {
		return Expense({ cost: props.post.post.cost, text: props.post.post.text });
	}

	if (props.post.post.type === 'Objective') {
		return Objective({
			done: props.post.post.done,
			more: props.post.post.more,
			text: props.post.post.text,
		});
	}

	// component layout
	return (
		<Typography fontStyle={'italic'} variant={'subtitle2'}>
			Unsupported post type.
		</Typography>
	);
}

function Post(props: { text: string }) {
	return <Typography variant={'subtitle2'}>{props.text}</Typography>;
}

function Expense(props: { cost: number; text: string }) {
	return (
		<>
			<Typography variant={'subtitle2'}>{props.text}</Typography>
			<Typography variant={'subtitle1'}>🪙 {props.cost}</Typography>
		</>
	);
}

function Objective(props: { done: boolean; more: string; text: string }) {
	return (
		<>
			<Typography
				sx={{ textDecoration: props.done ? 'line-through' : '' }}
				variant={'subtitle1'}
			>
				📌 {props.text}
			</Typography>
			{!!props.more && (
				<>
					<Divider sx={{ marginY: 1 }} />
					<Typography variant={'subtitle2'}>{props.more}</Typography>
				</>
			)}
		</>
	);
}
