import { Navigate, Route, Routes } from 'react-router-dom';
import { AppPageSplash } from './components/@';
import { useContexts } from './contexts/@';
import {
	AccountPage,
	ViewMoreDownladPage,
	ViewMoreModifyPage,
	ViewMoreStatisticsPage,
	ViewPostExpensePage,
	ViewPostObjectivePage,
	BillLedgerPage,
	BillReportPage,
	LedgersPage,
	ReportsPage,
	UpdatesPage,
} from './pages/@';
import {
	BillFormScreen,
	BillViewScreen,
	HomeScreen,
	SecurityScreen,
	SearchScreen,
	SettingsScreen,
	SignInScreen,
	SignUpScreen,
} from './screens/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();

	// component loading
	if (contexts.userAuth.get() === undefined) {
		return <AppPageSplash />;
	}

	// component layout
	return !contexts.isSignedUp.get() ? (
		<Routes>
			<Route path="*" element={<Navigate to="sign-in" />} />

			<Route path="security" element={<SecurityScreen />} />

			<Route path="sign-in" element={<SignInScreen />} />
			<Route path="sign-up" element={<SignUpScreen />} />
		</Routes>
	) : (
		<Routes>
			<Route path="*" element={<Navigate to="ledgers" />} />

			<Route path="create" element={<BillFormScreen />} />
			<Route path="search" element={<SearchScreen />} />

			<Route path="security" element={<SecurityScreen />} />
			<Route path="settings" element={<SettingsScreen />} />

			<Route path="ledger" element={<BillViewScreen />}>
				<Route path=":billID" element={<BillLedgerPage />} />
				<Route path=":billID/more/modify" element={<ViewMoreModifyPage />} />
				<Route path=":billID/more/statistics" element={<ViewMoreStatisticsPage />} />
				<Route path=":billID/post/expense" element={<ViewPostExpensePage />} />
				<Route path=":billID/post/objective" element={<ViewPostObjectivePage />} />
			</Route>

			<Route path="report" element={<BillViewScreen />}>
				<Route path=":billID" element={<BillReportPage />} />
				<Route path=":billID/more/downlad" element={<ViewMoreDownladPage />} />
				<Route path=":billID/more/statistics" element={<ViewMoreStatisticsPage />} />
			</Route>

			<Route path="*" element={<HomeScreen />}>
				<Route path="ledgers" element={<LedgersPage />} />
				<Route path="reports" element={<ReportsPage />} />
				<Route path="updates" element={<UpdatesPage />} />
				<Route path="account" element={<AccountPage />} />
			</Route>
		</Routes>
	);
}
