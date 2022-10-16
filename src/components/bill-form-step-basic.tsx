import { CheckBox, ReceiptLong } from '@mui/icons-material';
import { Avatar, Box, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { AppNormsService } from '../services/@.service';

export default function (props: {
	title: string;
	dedline: number;
	setTitle(title: string): void;
	setDedline(dedline: number): void;
}) {
	// component logic
	const isTitleValid = props.title.trim().length > 0 && props.title.trim().length < 32;
	const deadlineForm = AppNormsService.normalizeMoment(props.dedline * 1000).format(
		'YYYY-MM-DD',
	);

	const todayForm = AppNormsService.normalizeMoment().endOf('day').format('YYYY-MM-DD');
	const todayUnix = AppNormsService.normalizeMoment().endOf('day').unix();

	// component state
	const [noDeadline, setNoDedline] = useState(true);

	function changeDedline(date: string) {
		const newDateUnix = AppNormsService.normalizeMoment(date).unix();

		if (newDateUnix < todayUnix) {
			alert('You cannot choose a date from the past!');
		} else {
			props.setDedline(newDateUnix);
		}
	}

	// component layout
	return (
		<Stack gap={2} justifyContent={'center'}>
			<Box margin={'auto'}>
				<Avatar sx={{ height: 72, width: 72 }}>
					<ReceiptLong fontSize={'large'} />
				</Avatar>
			</Box>
			<Stack gap={2}>
				<TextField
					autoFocus={true}
					error={!isTitleValid}
					fullWidth={true}
					label={'Bill title'}
					onChange={(e) => props.setTitle(e.target.value.slice(0, 31))}
					size={'small'}
					type={'text'}
					value={props.title}
				/>
				<TextField
					disabled={noDeadline}
					fullWidth={true}
					label={'Valid until'}
					onChange={(e) => changeDedline(e.target.value)}
					size={'small'}
					type={'date'}
					value={deadlineForm}
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={noDeadline}
							onChange={(e) => setNoDedline(e.target.checked)}
						/>
					}
					label={'No deadline'}
				/>
			</Stack>
		</Stack>
	);
}
