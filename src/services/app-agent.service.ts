// define dervice
class AppAgentService {
	get isIOS(): boolean {
		return this.checkUserAgent('iPhone');
	}

	share = async (data: { title: string; text?: string }): Promise<void> => {
		console.log(window.location);

		await navigator.share({
			url: 'https://kawlik.github.io/material',
			title: data.title,
			text: data.text,
		});
	};

	private checkUserAgent(platform: 'Android' | 'iPad' | 'iPhone') {
		return window.navigator.userAgent.includes(platform);
	}
}

// export service
export default new AppAgentService();
