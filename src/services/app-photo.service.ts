// define dervice
class AppPhotoService {
	private readonly SIZE = 192;
	private readonly TYPE = 'image/png';

	private prepareImage = async (image: HTMLImageElement): Promise<string> => {
		const cvs = document.createElement('canvas');
		const ctx = cvs.getContext('2d');

		cvs.height = this.SIZE;
		cvs.width = this.SIZE;

		const offsetSY = this.SIZE * (image.height / image.width);
		const offsetDY = this.SIZE - offsetSY;

		ctx?.drawImage(image, 0, offsetDY / 2, this.SIZE, offsetSY);

		return cvs.toDataURL(this.TYPE);
	};

	cropImage = (file: File): Promise<string> =>
		new Promise((resolve, reject) => {
			const image = new Image();
			const reader = new FileReader();

			image.addEventListener('load', async () => {
				resolve(await this.prepareImage(image));
			});

			reader.addEventListener('load', (e) => {
				if (!e.target?.result) return reject();

				image.src = e.target.result.toString();
			});

			reader.readAsDataURL(file);
		});
}

// export service
export default new AppPhotoService();
