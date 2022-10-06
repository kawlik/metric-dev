import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { AppViewIOSChin, HomeTabbar, HomeTopbar } from '../components/@';
import { useContexts } from '../contexts/@';
import { UserAuthService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();
	const pathname = useParams();

	const userAvatar = contexts.userAuth.get()?.photoURL;
	const currentPage = pathname['*']?.split('/')[0] || 'Metric';

	function logout() {
		if (confirm('Are you sure you want to log out?')) {
			UserAuthService.logout();
		}
	}

	function openPage(route: string) {
		navigate(`/${route}/`);
	}

	// component layout
	return (
		<>
			<HomeTopbar avatar={userAvatar} label={currentPage} logout={logout} />
			<Outlet />
			<HomeTabbar page={currentPage} setPage={openPage} />
		</>
	);
}
