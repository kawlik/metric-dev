import { Check } from '@mui/icons-material';
import { AppBar, CircularProgress, IconButton, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { useContexts } from '../contexts/@';
import { AppAlertService, BillPostalService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();

	const document = contexts.billInfo.get()?.id!;
	const objective = contexts.billData
		.get()
		?.posts.filter((post) => post.post.type === 'Objective' && !post.post.done)[0];

	// component state
	const [isUpdating, setIsUpdating] = useState(false);

	async function update() {
		setIsUpdating(true);

		try {
			await BillPostalService.postObjectiveDone(document, objective!);
		} catch (error) {
			AppAlertService.error();
		}

		setIsUpdating(false);
	}

	// component layout
	return !!objective ? (
		<AppBar
			color={'inherit'}
			elevation={0}
			key={objective.time}
			position={'static'}
			variant={'outlined'}
		>
			<Toolbar>
				<Typography flex={1} noWrap={true} marginRight={1} variant={'h6'}>
					{objective.post.text}
				</Typography>
				<IconButton
					disabled={isUpdating}
					onClick={update}
					sx={{ position: 'relative' }}
				>
					{isUpdating && <CircularProgress size={24} sx={{ position: 'absolute' }} />}
					<Check />
				</IconButton>
			</Toolbar>
		</AppBar>
	) : null;
}
