import {
	AsYouType,
	isValidPhoneNumber,
	CountryCode,
	parsePhoneNumber,
} from 'libphonenumber-js';

// define dervice
class AppPhoneService {
	readonly countries: { code: CountryCode; name: string }[] = [{ code: 'PL', name: '🇵🇱' }];

	asTypedPhoneNumber = (phone: string, code?: CountryCode) =>
		new AsYouType(code).input(phone);

	parseToPhoneNumber = (phone: string, code?: CountryCode) =>
		parsePhoneNumber(phone, code).format('E.164');

	isValidPhoneNumber = (phone: string, code?: CountryCode) => isValidPhoneNumber(phone, code);
}

// export service
export default new AppPhoneService();
