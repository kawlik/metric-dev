import { ThemeProvider } from '@mui/material/styles';
import { PropsWithChildren, useEffect, useState } from 'react';
import { MUIThemeDark, MUIThemeLight } from '../configs/@';
import { StorageLocalService, UserAuthService } from '../services/@.service';
import { BillInfoType, UserAuthType, UserModeType } from '../types/@';
import { AppContext } from './app-contexts';

export default function (props: PropsWithChildren) {
	// component logic

	// component state
	const [activeBill, setActiveBill] = useState<BillInfoType | null>(null);
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
	const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
	const [savedLedgers, setSavedLedgers] = useState<BillInfoType[] | undefined>(undefined);
	const [savedReports, setSavedReports] = useState<BillInfoType[] | undefined>(undefined);
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
					activeBill: { get: () => activeBill, set: setActiveBill },
					isSignedIn: { get: () => isSignedIn, set: setIsSignedIn },
					isSignedUp: { get: () => isSignedUp, set: setIsSignedUp },
					savedLedgers: { get: () => savedLedgers, set: setSavedLedgers },
					savedReports: { get: () => savedReports, set: setSavedReports },
					userAuth: { get: () => userAuth, set: setUserAuth },
					userMode: { get: () => userMode, set: setUserMode },
				}}
			/>
		</ThemeProvider>
	);
}
