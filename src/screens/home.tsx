import { UserAuthService } from '../services/@.service';
import { HomeScreenView } from './views/@';

export default function (props: {}) {
	// component logic

	function logout() {
		if (confirm('Are you sure you want to log out?')) {
			UserAuthService.logout();
		}
	}

	// component layout
	return <HomeScreenView logout={logout} />;
}
