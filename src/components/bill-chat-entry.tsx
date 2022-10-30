import { Typography } from '@mui/material';
import { BillPostType } from '../types/@';

export default function (props: { post: BillPostType }) {
	// component logic

	if (props.post.post.type === 'Post') {
		return Post({ message: props.post.post.message });
	}

	// component layout
	return (
		<Typography fontStyle={'italic'} variant={'subtitle2'}>
			Unsupported post type.
		</Typography>
	);
}

function Post(props: { message: string }) {
	return <Typography variant={'subtitle2'}>{props.message}</Typography>;
}
