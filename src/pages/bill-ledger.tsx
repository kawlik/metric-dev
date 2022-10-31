import { Check } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { AppViewStack, BillChatInput, BillChatFloat, BillChatPosts } from '../components/@';
import { useContexts } from '../contexts/@';

export default function (props: {}) {
	// component logic

	// component layout
	return (
		<AppViewStack flex={1}>
			<BillChatFloat />
			<BillChatPosts />
			<BillChatInput />
		</AppViewStack>
	);
}
