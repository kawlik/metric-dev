import { Outlet } from 'react-router-dom';
import { AppTopbar } from '../components/@';

export default function (props: {}) {
	// component logic

	// component layout
	return (
		<>
			<AppTopbar label="Report" />
			<Outlet />
		</>
	);
}
