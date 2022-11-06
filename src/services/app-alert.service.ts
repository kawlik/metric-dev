// define dervice
class AppAlertService {
	private readonly messAlert = '';
	private readonly messError = 'Something went wrong. Please try again later.';

	alert = (message?: string): Promise<void> =>
		new Promise((resolve) => {
			alert(message || this.messAlert);
			resolve();
		});

	confirm = (message: string): Promise<boolean> =>
		new Promise((resolve) => {
			if (confirm(message)) {
				resolve(true);
			} else {
				resolve(false);
			}
		});

	error = (message?: string): Promise<void> =>
		new Promise((resolve) => {
			alert(message || this.messError);
			resolve();
		});
}

// export service
export default new AppAlertService();
