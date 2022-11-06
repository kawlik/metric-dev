// define dervice
class AppAgentService {
	constructor(private navigator: Navigator) {}

	agent = (platform: 'Android' | 'iPad' | 'iPhone') => navigator.userAgent.includes(platform);

	share = async (data: { title: string; text?: string }): Promise<void> =>
		this.navigator.share({
			url: 'https://kawlik.github.io/material',
			title: data.title,
			text: data.text,
		});
}

// export service
export default new AppAgentService(window.navigator);
