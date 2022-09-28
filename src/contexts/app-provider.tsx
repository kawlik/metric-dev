import { ThemeProvider } from '@mui/material/styles';
import { PropsWithChildren, useEffect, useState } from 'react';
import { MUIThemeDark, MUIThemeLight } from '../configs/@';
import { AuthService } from '../services/@.service';
import { AppContext, AuthType, ModeType, UserType } from './app-contexts';

export default function (props: PropsWithChildren) {
	// component logic

	// component state
	const [auth, setAuth] = useState<AuthType>(undefined);
	const [mode, setMode] = useState<ModeType>('light');
	const [user, setUser] = useState<UserType>(undefined);

	// component lifecycle
	useEffect(() => {
		AuthService.subscribeOn().subscribe((user) => {
			setAuth(!!user);
			setUser(user);
		});

		return () => AuthService.unsubscribe();
	}, []);

	// component layout
	return (
		<ThemeProvider theme={mode === 'dark' ? MUIThemeDark : MUIThemeLight}>
			<AppContext.Provider
				children={props.children}
				value={{
					auth: { get: () => auth, set: (ctx) => setAuth(ctx) },
					mode: { get: () => mode, set: (ctx) => setMode(ctx) },
					user: { get: () => user, set: (ctx) => setUser(ctx) },
				}}
			/>
		</ThemeProvider>
	);
}
