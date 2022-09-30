import { MenuItem, Select, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { CountryCode } from 'libphonenumber-js';
import { useEffect, useState } from 'react';
import { PhoneService } from '../services/@.service';

export default function (props: { onChange(value: string): void; value?: string }) {
	// component logic

	// component state
	const [countryCode, setCountryCode] = useState<CountryCode>('PL');
	const [phoneNumber, setPhoneNumber] = useState<string>('');

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
		<Stack flexDirection={'row'} gap={1}>
			<Select
				displayEmpty={true}
				onChange={(e) => setCountryCode(e.target.value as CountryCode)}
				size={'small'}
				sx={{ pr: 1 }}
				value={countryCode}
			>
				{PhoneService.countries.map((country) => (
					<MenuItem key={country.code} value={country.code}>
						{country.name}
					</MenuItem>
				))}
			</Select>
			<TextField
				fullWidth={true}
				label={'Phone number'}
				onChange={(e) => setPhoneNumber(e.target.value)}
				size={'small'}
				type={'tel'}
				value={PhoneService.asTypedPhoneNumber(phoneNumber, countryCode)}
			/>
		</Stack>
	);
}
