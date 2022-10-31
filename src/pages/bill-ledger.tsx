import { Check } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { AppViewStack, BillChatInput, BillChatClose, BillChatPosts } from '../components/@';
import { useContexts } from '../contexts/@';

export default function (props: {}) {
	// component logic

	// component layout
	return (
		<AppViewStack flex={1}>
			<BillChatClose />
			<BillChatPosts />
			<BillChatInput />
		</AppViewStack>
	);
}
