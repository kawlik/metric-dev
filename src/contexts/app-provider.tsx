import { useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { User } from 'firebase/auth';
import { PropsWithChildren, useEffect, useState } from 'react';
import { MUIThemeDark, MUIThemeLight } from '../configs/@';
import { AuthService } from '../services/@.service';
import { AppContext } from './app-contexts';

export default function (props: PropsWithChildren) {
	// component logic
	const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

	const [user, setUser] = useState<User | null>(null);
	const [mode, setMode] = useState<'dark' | 'light'>('light');

	// component lifecycle
	useEffect(() => {
		AuthService.subscribeOn().subscribe((user) => setUser(user));

		return () => AuthService.unsubscribe();
	}, []);

	// component layout
	return (
		<ThemeProvider theme={mode === 'dark' ? MUIThemeDark : MUIThemeLight}>
			<AppContext.Provider
				children={props.children}
				value={{
					auth: !!user,
					mode: { get: () => mode, set: (item) => setMode(item) },
					user: { get: () => user, set: (item) => setUser(item) },
				}}
			/>
		</ThemeProvider>
	);
}
