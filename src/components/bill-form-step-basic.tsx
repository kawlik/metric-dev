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
	const isTitleValid = props.title.length > 0 && props.title.length < 32;

	const deadlineForm = AppNormsService.normalizeMoment(props.dedline).format('YYYY-MM-DD');
	const indefined = AppNormsService.normalizeMoment('9999-12-31T23:59:59.999Z').valueOf();
	const todayForm = AppNormsService.normalizeMoment().endOf('day').format('YYYY-MM-DD');
	const todayUnix = AppNormsService.normalizeMoment().endOf('day').valueOf();

	// component state
	const [hasNoDeadline, setHasNoDeadline] = useState(props.dedline === indefined);

	function changeDedline(date: string) {
		const newDateUnix = AppNormsService.normalizeMoment(date).valueOf();

		if (newDateUnix < todayUnix) {
			alert('You cannot choose a date from the past!');
		} else {
			props.setDedline(newDateUnix);
		}
	}

	// component lifecycle
	useEffect(() => {
		const validUnix = props.dedline === indefined ? todayUnix : props.dedline;

		if (!hasNoDeadline) {
			props.setDedline(validUnix);
		} else {
			props.setDedline(indefined);
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
				onChange={(e) => props.setTitle(e.target.value.slice(0, 31).trim())}
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
