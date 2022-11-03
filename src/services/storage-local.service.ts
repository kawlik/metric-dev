import { UserModeType } from '../types/@';

// define service
class StorageLocalService {
	private readonly keyTheme = 'user-theme';

	get Theme() {
		const theme = localStorage.getItem(this.keyTheme);

		if (theme === 'dark' || theme === 'light') {
			return theme;
		} else {
			return undefined;
		}
	}

	set Theme(theme: UserModeType) {
		if (theme === 'dark' || theme === 'light') {
			localStorage.setItem(this.keyTheme, theme);
		} else {
			localStorage.setItem(this.keyTheme, '');
		}
	}
}

// export service
export default new StorageLocalService();
