import { Feedback, Message } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Container,
	InputAdornment,
	TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppViewStack } from '../../components/@';
import { useContexts } from '../../contexts/@';
import { AppAlertService, BillPostalService } from '../../services/@.service';

// assets
import Gif from '../../assets/note.gif';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const document = contexts.billInfo.get()?.id!;
	const balance = contexts.billInfo.get()?.balance!;

	// component state
	const [objectiveName, setObjectiveName] = useState('');
	const [objectiveMore, setObjectiveMore] = useState('');
	const [isSending, setIsSending] = useState(false);

	const canSend = !!objectiveName.trim();

	async function send() {
		setIsSending(true);

		try {
			await BillPostalService.postObjective(document, balance, {
				more: objectiveMore,
				text: objectiveName,
			});

			navigate(-1);
		} catch (error) {
			AppAlertService.error();
			setIsSending(false);
		}
	}

	// component layout
	return (
		<AppViewStack flex={1}>
			<Container maxWidth={'md'} sx={{ marginY: 'auto', overflowY: 'scroll' }}>
				<Stack gap={2}>
					<Box margin={'auto'}>
						<Avatar src={Gif} sx={{ height: 72, width: 72 }} variant={'rounded'} />
					</Box>
					<TextField
						error={!objectiveName}
						fullWidth={true}
						label={'Objective name'}
						onChange={(e) => setObjectiveName(e.target.value)}
						size={'small'}
						type={'text'}
						value={objectiveName}
					/>
					<TextField
						fullWidth={true}
						label={'Description'}
						onChange={(e) => setObjectiveMore(e.target.value)}
						multiline={true}
						minRows={2}
						maxRows={5}
						sx={{ alignItems: 'flex-start' }}
						type={'text'}
						value={objectiveMore}
						InputProps={{
							endAdornment: (
								<InputAdornment
									position={'end'}
									sx={{ marginBottom: 'auto', marginTop: 1.5 }}
								>
									<Message />
								</InputAdornment>
							),
						}}
					/>
					<Button
						disabled={!canSend || isSending}
						endIcon={<Feedback />}
						fullWidth={true}
						onClick={send}
						size={'large'}
						sx={{ position: 'relative' }}
						variant={'outlined'}
					>
						{isSending && (
							<CircularProgress size={24} sx={{ position: 'absolute' }} />
						)}
						Post Objective
					</Button>
				</Stack>
			</Container>
		</AppViewStack>
	);
}
