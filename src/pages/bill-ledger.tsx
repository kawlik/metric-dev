import { AppViewStack, BillChatInput, BillChatPosts } from '../components/@';

export default function (props: {}) {
	// component logic

	// component layout
	return (
		<AppViewStack flex={1}>
			<BillChatPosts />
			<BillChatInput />
		</AppViewStack>
	);
}
