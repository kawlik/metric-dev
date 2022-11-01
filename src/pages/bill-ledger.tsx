import { AppViewStack, BillChatInput, BillChatFloat, BillChatPosts } from '../components/@';

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
