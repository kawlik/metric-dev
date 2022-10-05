import { ThemeProvider } from '@mui/material/styles';
import { PropsWithChildren, useEffect, useState } from 'react';
import { MUIThemeDark, MUIThemeLight } from '../configs/@';
import { UserAuthService } from '../services/@.service';
import { UserAuthType, UserModeType } from '../types/@';
import { AppContext } from './app-contexts';

export default function (props: PropsWithChildren) {
	// component logic

	// component state
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
	const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
	const [userAuth, setUserAuth] = useState<UserAuthType>(undefined);
	const [userMode, setUserMode] = useState<UserModeType>(undefined);

	// component lifecycle
	useEffect(() => {
		UserAuthService.subscribeOn().subscribe((user) => {
			setIsSignedUp(!!user?.displayName);
			setIsSignedIn(!!user);
			setUserAuth(user);
		});

		return () => UserAuthService.unsubscribe();
	}, []);

	// component layout
	return (
		<ThemeProvider theme={userMode === 'dark' ? MUIThemeDark : MUIThemeLight}>
			<AppContext.Provider
				children={props.children}
				value={{
					userAuth: { get: () => userAuth, set: setUserAuth },
					userMode: { get: () => userMode, set: setUserMode },
					isSignedIn: { get: () => isSignedIn, set: setIsSignedIn },
					isSignedUp: { get: () => isSignedUp, set: setIsSignedUp },
				}}
			/>
		</ThemeProvider>
	);
}
