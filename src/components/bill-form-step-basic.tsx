import { ReceiptLong } from '@mui/icons-material';
import { Avatar, Box, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { AppNormsService } from '../services/@.service';

export default function (props: {
	title: string;
	dedline: number;
	setTitle(title: string): void;
	setDedline(dedline: number): void;
}) {
	// component logic
	const isTitleValid = props.title.trim().length > 0 && props.title.length < 32;
	const maxTimestamp = '9999-12-31T23:59:59.9999999Z';

	const deadlineForm = AppNormsService.normalizeMoment(props.dedline).format('YYYY-MM-DD');
	const deadlineUnix = AppNormsService.normalizeMoment(maxTimestamp).valueOf();

	const todayForm = AppNormsService.normalizeMoment().endOf('day').format('YYYY-MM-DD');
	const todayUnix = AppNormsService.normalizeMoment().endOf('day').valueOf();

	// component state
	const [hasNoDeadline, setHasNoDeadline] = useState(props.dedline === deadlineUnix);
	const [savedDeadline, setSavedDeadline] = useState(props.dedline);

	function changeDedline(date: string) {
		const newDateUnix = AppNormsService.normalizeMoment(date).endOf('day').valueOf();

		if (newDateUnix < todayUnix) {
			alert('You cannot choose a date from the past!');
		} else {
			setSavedDeadline(newDateUnix);
			props.setDedline(newDateUnix);
		}
	}

	// component lifecycle
	useEffect(() => {
		if (!hasNoDeadline) {
			props.setDedline(savedDeadline);
		} else {
			props.setDedline(deadlineUnix);
		}
	}, [hasNoDeadline]);

	// component layout
	return (
		<Stack gap={2} paddingY={2}>
			<Box margin={'auto'}>
				<Avatar sx={{ height: 72, width: 72 }}>
					<ReceiptLong fontSize={'large'} />
				</Avatar>
			</Box>
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
				disabled={hasNoDeadline}
				fullWidth={true}
				label={'Valid until'}
				onChange={(e) => changeDedline(e.target.value)}
				size={'small'}
				type={'date'}
				value={hasNoDeadline ? todayForm : deadlineForm}
			/>
			<FormControlLabel
				control={
					<Checkbox
						checked={hasNoDeadline}
						onChange={(e) => setHasNoDeadline(e.target.checked)}
					/>
				}
				label={'No deadline'}
				sx={{ marginY: -2 }}
			/>
		</Stack>
	);
}
