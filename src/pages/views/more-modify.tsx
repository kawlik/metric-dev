import { AppViewStack } from '../../components/@';
import { useContexts } from '../../contexts/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();

	// component layout
	return <AppViewStack flex={1}></AppViewStack>;
}
