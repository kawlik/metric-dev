import { ThemeProvider } from '@mui/material/styles';
import { PropsWithChildren, useEffect, useState } from 'react';
import { MUIThemeDark, MUIThemeLight } from '../configs/@';
import { UserAuthService } from '../services/@.service';
import { AppContext, AuthType, ModeType } from './app-contexts';

export default function (props: PropsWithChildren) {
	// component logic

	// component state
	const [auth, setAuth] = useState<AuthType>(undefined);
	const [mode, setMode] = useState<ModeType>(undefined);
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
	const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

	// component lifecycle
	useEffect(() => {
		UserAuthService.subscribeOn().subscribe((user) => {
			setIsSignedUp(!!user?.displayName);
			setIsSignedIn(!!user);
			setAuth(user);
		});

		return () => UserAuthService.unsubscribe();
	}, []);

	// component layout
	return (
		<ThemeProvider theme={mode === 'dark' ? MUIThemeDark : MUIThemeLight}>
			<AppContext.Provider
				children={props.children}
				value={{
					auth: { get: () => auth, set: setAuth },
					mode: { get: () => mode, set: setMode },
					isSignedIn: { get: () => isSignedIn, set: setIsSignedIn },
					isSignedUp: { get: () => isSignedUp, set: setIsSignedUp },
				}}
			/>
		</ThemeProvider>
	);
}
