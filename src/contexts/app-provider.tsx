import { ThemeProvider } from '@mui/material/styles';
import { PropsWithChildren, useEffect, useState } from 'react';
import { MUIThemeDark, MUIThemeLight } from '../configs/@';
import { AuthService } from '../services/@.service';
import { AppContext, AuthType, ModeType, UserType } from './app-contexts';

export default function (props: PropsWithChildren) {
	// component logic

	// component state
	const [auth, setAuth] = useState<AuthType>(null);
	const [mode, setMode] = useState<ModeType>('light');
	const [user, setUser] = useState<UserType>(null);

	// component lifecycle
	useEffect(() => {
		AuthService.logout();
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
					auth: { get: () => auth, set: setAuth },
					mode: { get: () => mode, set: setMode },
					user: { get: () => user, set: setUser },
				}}
			/>
		</ThemeProvider>
	);
}
