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
	return <Typography fontStyle={'italic'}>Unsupported post type.</Typography>;
}

function Post(props: { text: string }) {
	return <Typography>{props.text}</Typography>;
}

function Expense(props: { cost: number; text: string }) {
	return (
		<>
			<Typography>{props.text}</Typography>
			<Typography fontWeight={700}>🪙 {props.cost}</Typography>
		</>
	);
}

function Objective(props: { done: boolean; more: string; text: string }) {
	return (
		<>
			<Typography
				fontWeight={700}
				sx={{ textDecoration: props.done ? 'line-through' : '' }}
			>
				📌 {props.text}
			</Typography>
			{!!props.more && <Typography>{props.more}</Typography>}
		</>
	);
}
