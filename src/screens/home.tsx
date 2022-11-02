import { Outlet as PageOutlet, useNavigate, useParams } from 'react-router-dom';
import { HomeTabbar, HomeTopbar } from '../components/@';
import { useContexts } from '../contexts/@';
import { UserAuthService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();
	const pathname = useParams();

	const userAvatar = contexts.userAuth.get()?.photoURL!;
	const currentPage = pathname['*']?.split('/')[0] || 'Metric';

	function logout() {
		if (confirm('Are you sure you want to log out?')) {
			UserAuthService.logout();
		}
	}

	function openPage(route: string) {
		navigate(`/${route}/`, { replace: true });
	}

	function openSearch() {
		navigate('/search/');
	}

	function openSecurity() {
		navigate('/security/');
	}

	function openSettings() {
		navigate('/settings/');
	}

	// component layout
	return (
		<>
			<HomeTopbar
				avatar={userAvatar}
				label={currentPage}
				logout={logout}
				openSearch={openSearch}
				openSecurity={openSecurity}
				openSettings={openSettings}
			/>
			<PageOutlet />
			<HomeTabbar page={currentPage} setPage={openPage} />
		</>
	);
}
