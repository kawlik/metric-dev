import { CssBaseline, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { PropsWithChildren, useEffect, useState } from 'react';
import { MUIThemeDark, MUIThemeLight } from '../configs/@';
import {
	BillLedgerService,
	BillReportService,
	StorageLocalService,
	UserAuthService,
} from '../services/@.service';
import { BillDataType, BillInfoType, UserAuthType, UserModeType } from '../types/@';
import { AppContext } from './app-contexts';

export default function (props: PropsWithChildren) {
	// component logic
	const preferesDark = useMediaQuery('(prefers-color-scheme: dark)');
	const preferesMode = StorageLocalService.Theme;
	const preferedMode = preferesDark ? 'dark' : 'light';

	// component state
	const [billData, setBillData] = useState<BillDataType | null>(null);
	const [billInfo, setBillInfo] = useState<BillInfoType | null>(null);
	const [billLedgers, setBillLedgers] = useState<BillInfoType[] | undefined>(undefined);
	const [billReports, setBillReports] = useState<BillInfoType[] | undefined>(undefined);
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

	useEffect(() => {
		if (!userAuth) return;

		BillLedgerService.subscribeOn(userAuth.phoneNumber!).subscribe((bills) =>
			setBillLedgers(bills),
		);

		BillReportService.subscribeOn(userAuth.phoneNumber!).subscribe((bills) =>
			setBillReports(bills),
		);

		return () => {
			BillLedgerService.unsubscribe();
			BillReportService.unsubscribe();
		};
	}, [userAuth]);

	useEffect(() => {
		setUserMode(preferesMode || preferedMode);
	}, [preferedMode]);

	// component layout
	return (
		<ThemeProvider theme={userMode === 'dark' ? MUIThemeDark : MUIThemeLight}>
			<CssBaseline />
			<AppContext.Provider
				children={props.children}
				value={{
					billInfo: { get: () => billInfo, set: setBillInfo },
					billData: { get: () => billData, set: setBillData },
					billLedgers: { get: () => billLedgers, set: setBillLedgers },
					billReports: { get: () => billReports, set: setBillReports },
					isSignedIn: { get: () => isSignedIn, set: setIsSignedIn },
					isSignedUp: { get: () => isSignedUp, set: setIsSignedUp },
					userAuth: { get: () => userAuth, set: setUserAuth },
					userMode: { get: () => userMode, set: setUserMode },
				}}
			/>
		</ThemeProvider>
	);
}
