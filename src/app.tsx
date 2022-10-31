import { Navigate, Route, Routes } from 'react-router-dom';
import { AppPageSplash } from './components/@';
import { useContexts } from './contexts/@';
import {
	AccountPage,
	BillLedgerPage,
	LedgersPage,
	BillReportPage,
	ReportsPage,
	UpdatesPage,
	ActionExpensePage,
	ActionObjectivePage,
} from './pages/@';
import {
	BillFormScreen,
	BillViewScreen,
	HomeScreen,
	SearchScreen,
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

			<Route path="sign-in" element={<SignInScreen />} />
			<Route path="sign-up" element={<SignUpScreen />} />
		</Routes>
	) : (
		<Routes>
			<Route path="*" element={<Navigate to="ledgers" />} />

			<Route path="create" element={<BillFormScreen />} />
			<Route path="search" element={<SearchScreen />} />

			<Route path="ledger" element={<BillViewScreen />}>
				<Route path=":billID" element={<BillLedgerPage />} />
				<Route path=":billID/post/expense" element={<ActionExpensePage />} />
				<Route path=":billID/post/objective" element={<ActionObjectivePage />} />
			</Route>

			<Route path="report" element={<BillViewScreen />}>
				<Route path=":billID" element={<BillReportPage />} />
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
