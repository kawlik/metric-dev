import { DarkMode, LightMode, Palette } from '@mui/icons-material';
import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Stack,
	Switch,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { useContexts } from '../contexts/@';
import { StorageLocalService } from '../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();

	const preferesDark = useMediaQuery('(prefers-color-scheme: dark)');
	const preferesMode = contexts.userMode.get();
	const preferedMode = preferesDark ? 'dark' : 'light';

	const [useOS, setUseOS] = useState(StorageLocalService.Theme === undefined);

	function togleUseOS(value: boolean) {
		setUseOS(value);

		if (value) {
			StorageLocalService.Theme = undefined;
			contexts.userMode.set(preferedMode);
		}
	}

	function togleTheme(value: boolean) {
		if (value) {
			StorageLocalService.Theme = 'dark';
			contexts.userMode.set('dark');
		} else {
			StorageLocalService.Theme = 'light';
			contexts.userMode.set('light');
		}
	}

	// component layout
	return (
		<Stack gap={1} padding={2}>
			<Typography variant={'h5'}>Theme</Typography>
			<List sx={{ padding: 0 }}>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<Palette />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={<Typography noWrap={true}>Use system theme</Typography>}
					/>
					<Switch checked={useOS} onChange={(e) => togleUseOS(e.target.checked)} />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							{preferesMode === 'dark' ? <DarkMode /> : <LightMode />}
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={<Typography noWrap={true}>Set prefered theme</Typography>}
					/>
					<Switch
						checked={preferesMode === 'dark'}
						disabled={useOS}
						onChange={(e) => togleTheme(e.target.checked)}
					/>
				</ListItem>
			</List>
		</Stack>
	);
}
