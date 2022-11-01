import { BillPDFSummary, AppViewStack } from '../components/@';
import { useContexts } from '../contexts/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const userAuth = contexts.userAuth.get()!;

	const plans = contexts.billData.get()?.plans || [];
	const posts = contexts.billData.get()?.posts || [];
	const users = contexts.billInfo.get()?.participants || [];

	// component layout
	return (
		<AppViewStack flex={1} gap={1} padding={2}>
			<BillPDFSummary posts={posts} users={users} />
		</AppViewStack>
	);
}
