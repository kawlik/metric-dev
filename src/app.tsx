import { Navigate, Route, Routes } from 'react-router-dom';
import { useContexts } from './contexts/@';
import { PageAccount, PageLedgers, PageReports, PageUpdates } from './pages/@';
import { ScreenHome, ScreenLogin } from './screens/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();

	// component layout
	return !contexts.auth ? (
		<Routes>
			<Route path="*" element={<Navigate to="login" />} />

			<Route path="login" element={<ScreenLogin />} />
		</Routes>
	) : (
		<Routes>
			<Route path="*" element={<Navigate to="ledgers" />} />

			<Route path="*" element={<ScreenHome />}>
				<Route path="account" element={<PageAccount />} />
				<Route path="ledgers" element={<PageLedgers />} />
				<Route path="reports" element={<PageReports />} />
				<Route path="updates" element={<PageUpdates />} />
			</Route>
		</Routes>
	);
}
