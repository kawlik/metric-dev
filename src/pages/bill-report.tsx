import { AppViewStack, BillChatBrief, BillChatPosts } from '../components/@';

export default function (props: {}) {
	// component logic

	// component layout
	return (
		<AppViewStack flex={1}>
			<BillChatPosts />
			<BillChatBrief />
		</AppViewStack>
	);
}
