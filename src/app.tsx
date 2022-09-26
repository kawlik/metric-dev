import { Navigate, Route, Routes } from 'react-router-dom';
import { useContexts } from './contexts/@';
import {
	AccountPage,
	LedgerBillPage,
	LedgersPage,
	ReportBillPage,
	ReportsPage,
	UpdatesPage,
} from './pages/@';
import { HomeScreen, LedgerScreen, ReportScreen, SignInScreen } from './screens/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();

	// component layout
	return !contexts.auth ? (
		<Routes>
			<Route path="*" element={<Navigate to="sign-in" />} />

			<Route path="sign-in" element={<SignInScreen />} />
		</Routes>
	) : (
		<Routes>
			<Route path="*" element={<Navigate to="ledgers" />} />

			<Route path="ledger" element={<LedgerScreen />}>
				<Route path=":billID" element={<LedgerBillPage />} />
			</Route>

			<Route path="report" element={<ReportScreen />}>
				<Route path=":billID" element={<ReportBillPage />} />
			</Route>

			<Route path="*" element={<HomeScreen />}>
				<Route path="account" element={<AccountPage />} />
				<Route path="ledgers" element={<LedgersPage />} />
				<Route path="reports" element={<ReportsPage />} />
				<Route path="updates" element={<UpdatesPage />} />
			</Route>
		</Routes>
	);
}
