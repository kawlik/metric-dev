import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useContexts } from './contexts/@';
import {
	AccountPage,
	BillChatPage,
	LedgersPage,
	BillViewPage,
	ReportsPage,
	UpdatesPage,
} from './pages/@';
import {
	HomeScreen,
	LedgerScreen,
	ReportScreen,
	SignInScreen,
	SignUpScreen,
} from './screens/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const isSignedIn = !!contexts.auth.get();
	const isSignedUp = !!contexts.user.get()?.displayName;

	// component lifecycle
	useEffect(() => {
		if (isSignedIn && !isSignedUp) navigate('sign-up');
	}, [contexts]);

	// component layout
	return !isSignedUp ? (
		<Routes>
			<Route path="*" element={<Navigate to="sign-in" />} />

			<Route path="sign-in" element={<SignInScreen />} />
			<Route path="sign-up" element={<SignUpScreen />} />
		</Routes>
	) : (
		<Routes>
			<Route path="*" element={<Navigate to="ledgers" />} />

			<Route path="ledger" element={<LedgerScreen />}>
				<Route path=":billID" element={<BillChatPage />} />
			</Route>

			<Route path="report" element={<ReportScreen />}>
				<Route path=":billID" element={<BillViewPage />} />
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
