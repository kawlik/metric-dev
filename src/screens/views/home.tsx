import { Box } from '@mui/material';
import { HomeTopbar } from '../../components/@';

export default function (props: { logout(): void }) {
	// component logic

	// component layout
	return (
		<>
			<HomeTopbar logout={props.logout} />
			<Box flex={1} />
		</>
	);
}
