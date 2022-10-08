// define dervice
class AppNormsService {
	constructor(private format = Intl.NumberFormat('en', { notation: 'compact' })) {}

	normalizeColor = (value: string): string => {
		const base = (this.prepareHash(value) & 0x00ffff).toString(16).toUpperCase();

		return '#00000'.substring(0, 7 - base.length) + base;
	};

	normalizeNumber = (value: number): string => {
		return this.format.format(value);
	};

	private prepareHash = (base: string): number => {
		let hash = 0;

		for (let i = 0; i < base.length; i++) {
			hash = base.charCodeAt(i) + ((hash << 5) - hash);
		}

		return hash;
	};
}

// export service
export default new AppNormsService();
