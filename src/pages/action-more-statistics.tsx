import { BillStatsSummary, AppViewStack } from '../components/@';
import { useContexts } from '../contexts/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();

	const posts = contexts.billData.get()?.posts || [];
	const users = contexts.billInfo.get()?.participants || [];

	// component layout
	return (
		<AppViewStack flex={1} gap={1} padding={2}>
			<BillStatsSummary posts={posts} users={users} />
		</AppViewStack>
	);
}
