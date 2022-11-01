import { AppBillStatistics, AppViewStack } from '../components/@';
import { useContexts } from '../contexts/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();

	const plans = contexts.billData.get()?.plans || [];
	const posts = contexts.billData.get()?.posts || [];

	// component layout
	return (
		<AppViewStack flex={1}>
			<AppBillStatistics />
		</AppViewStack>
	);
}
