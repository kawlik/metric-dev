import { Send } from '@mui/icons-material';
import {
	AppBar,
	IconButton,
	InputAdornment,
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon,
	TextField,
	Toolbar,
} from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BillPostIconMap } from '../configs/@';
import { useContexts } from '../contexts/@';
import { AppAlertService, BillPostalService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const location = useLocation();
	const navigate = useNavigate();

	const document = contexts.billInfo.get()?.id!;
	const balance = contexts.billInfo.get()?.balance!;
	const options = [...BillPostIconMap].map((post) => ({
		open: () => navigate(location.pathname + `post/${post[0].toLowerCase()}/`),
		icon: post[1],
		name: post[0],
	}));

	// component state
	const [postMessage, setPostMesage] = useState('');

	async function post() {
		setPostMesage('');

		try {
			BillPostalService.post(document, balance, postMessage);
		} catch (error) {
			AppAlertService.error().then(() => {
				setPostMesage(postMessage);
			});
		}
	}

	// component layout
	return (
		<AppBar
			color={'inherit'}
			elevation={0}
			position={'static'}
			sx={{
				borderTopColor: (theme) => theme.palette.action.disabledBackground,
				borderTopStyle: 'solid',
				borderTopWidth: 1,
			}}
		>
			<Toolbar sx={{ alignItems: 'flex-end', paddingY: 1 }}>
				<SpeedDial
					ariaLabel={'Bill actions'}
					icon={<SpeedDialIcon />}
					sx={{ position: 'absolute' }}
				>
					{options.map((action) => (
						<SpeedDialAction
							key={action.name}
							icon={<action.icon />}
							onClick={action.open}
							tooltipOpen={true}
							tooltipPlacement={'right'}
							tooltipTitle={action.name}
						/>
					))}
				</SpeedDial>
				<TextField
					fullWidth={true}
					maxRows={3}
					multiline={true}
					placeholder={'Something fast'}
					onChange={(e) => setPostMesage(e.target.value)}
					sx={{ marginLeft: 8 }}
					value={postMessage}
					InputProps={{
						endAdornment: (
							<InputAdornment
								position={'end'}
								sx={{ marginBottom: 1.5, marginTop: 'auto' }}
							>
								<IconButton disabled={!postMessage.trim()} onClick={post}>
									<Send sx={{ transform: 'rotate(-30deg)' }} />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Toolbar>
		</AppBar>
	);
}
