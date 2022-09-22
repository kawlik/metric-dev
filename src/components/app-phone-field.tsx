import { FormControl, MenuItem, Select, Stack, TextField } from '@mui/material';
import { CountryCode } from 'libphonenumber-js';
import { useEffect, useState } from 'react';
import { PhoneService } from '../services/@';

export default function (props: { onChange(value: string): void; value: string }) {
	// component logic
	const [countryCode, setCountryCode] = useState<CountryCode>('PL');
	const [phoneNumber, setPhoneNumber] = useState('');

	// component lifecycle
	useEffect(() => {
		if (phoneNumber.length < 9) return;

		const parsedPhoneNumber = PhoneService.parseToPhoneNumber(phoneNumber, countryCode);

		if (PhoneService.isValidPhoneNumber(parsedPhoneNumber)) {
			props?.onChange(parsedPhoneNumber);
		}
	}, [countryCode, phoneNumber]);

	// component layout
	return (
		<Stack sx={{ flexDirection: 'row', flexWrap: 'nowrap', gap: 1 }}>
			<FormControl>
				<Select
					displayEmpty
					onChange={(event) => setCountryCode(event.target.value as CountryCode)}
					size="small"
					sx={{ pr: 2 }}
					value={countryCode}
				>
					<MenuItem value="PL">🇵🇱</MenuItem>
				</Select>
			</FormControl>
			<TextField
				fullWidth
				label="Phone number"
				onChange={(event) => setPhoneNumber(event.target.value)}
				size="small"
				type="tel"
				value={PhoneService.asTypedPhoneNumber(phoneNumber, countryCode)}
			/>
		</Stack>
	);
}
