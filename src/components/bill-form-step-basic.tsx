import {
	Avatar,
	Box,
	Checkbox,
	FormControlLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AppAlertService, AppNormsService } from '../services/@.service';

// assets
import Gif from '../assets/cheque.gif';
import { BillTypeIconMap } from '../configs/@';

export default function (props: {
	type: string;
	title: string;
	dedline: number;
	setType(title: string): void;
	setTitle(title: string): void;
	setDedline(dedline: number): void;
}) {
	// component logic
	const isTitleValid = props.title.trim().length > 0 && props.title.length < 32;
	const maxTimestamp = '9999-12-31T23:59:59.9999999Z';
	const options = [...BillTypeIconMap].map((plan) => ({
		icon: plan[1],
		name: plan[0],
	}));

	const neverUnix = AppNormsService.normalizeMoment(maxTimestamp).valueOf();
	const todayUnix = AppNormsService.normalizeMoment().endOf('day').valueOf();

	// component state
	const [hasNoDeadline, setHasNoDeadline] = useState(props.dedline === neverUnix);
	const [savedDeadline, setSavedDeadline] = useState(props.dedline);

	const displayDateForm = AppNormsService.normalizeMoment(savedDeadline).format('YYYY-MM-DD');

	function changeDedline(date: string) {
		const newDateUnix = AppNormsService.normalizeMoment(date).endOf('day').valueOf();

		if (newDateUnix < todayUnix) {
			AppAlertService.alert('You cannot choose a date from the past!');
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
			props.setDedline(neverUnix);
		}
	}, [hasNoDeadline]);

	// component layout
	return (
		<Stack gap={2} paddingY={2}>
			<Box margin={'auto'}>
				<Avatar src={Gif} sx={{ height: 72, width: 72 }} variant={'rounded'} />
			</Box>
			<Stack flexDirection={'row'} gap={1}>
				<Select
					onChange={(e) => props.setType(e.target.value)}
					size={'small'}
					sx={{ overflowX: 'hidden' }}
					value={props.type}
				>
					{options.map((plan) => (
						<MenuItem key={plan.name} value={plan.name}>
							<plan.icon fontSize={'inherit'} />
							<Typography component={'span'} marginLeft={1} noWrap={true}>
								{plan.name}
							</Typography>
						</MenuItem>
					))}
				</Select>
				<TextField
					error={!isTitleValid}
					fullWidth={true}
					label={'Bill title'}
					onChange={(e) => props.setTitle(e.target.value.slice(0, 31))}
					size={'small'}
					type={'text'}
					value={props.title}
				/>
			</Stack>
			<TextField
				disabled={hasNoDeadline}
				fullWidth={true}
				label={'Valid until'}
				onChange={(e) => changeDedline(e.target.value)}
				size={'small'}
				type={'date'}
				value={displayDateForm}
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
