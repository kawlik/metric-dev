// define dervice
class AppAgentService {
	get isIOS(): boolean {
		return this.checkUserAgent('iPhone');
	}

	private checkUserAgent(platform: 'Android' | 'iPad' | 'iPhone') {
		return window.navigator.userAgent.includes(platform);
	}
}

// export service
export default new AppAgentService();
