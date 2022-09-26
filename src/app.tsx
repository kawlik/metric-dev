import { Navigate, Route, Routes } from 'react-router-dom';
import { useContexts } from './contexts/@';
import { AccountPage, LedgersPage, ReportsPage, UpdatesPage } from './pages/@';
import { HomeScreen, LoginScreen } from './screens/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();

	// component layout
	return !contexts.auth ? (
		<Routes>
			<Route path="*" element={<Navigate to="login" />} />

			<Route path="login" element={<LoginScreen />} />
		</Routes>
	) : (
		<Routes>
			<Route path="*" element={<Navigate to="ledgers" />} />

			<Route path="*" element={<HomeScreen />}>
				<Route path="account" element={<AccountPage />} />
				<Route path="ledgers" element={<LedgersPage />} />
				<Route path="reports" element={<ReportsPage />} />
				<Route path="updates" element={<UpdatesPage />} />
			</Route>
		</Routes>
	);
}
