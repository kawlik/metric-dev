import { CssBaseline, ThemeProvider } from '@mui/material';
import { BillStatsSummary, AppViewStack, AppViewLoading } from '../../components/@';
import { useContexts } from '../../contexts/@';
import { MUIThemeLight } from '../../configs/@';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AppAlertService, AppNormsService } from '../../services/@.service';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const filename = contexts.billInfo.get()?.id!;

	const posts = contexts.billData.get()?.posts || [];
	const users = contexts.billInfo.get()?.participants || [];

	// component lifecycle
	useEffect(() => {
		const documentHTML = document.getElementById('pdf-downlad')!;
		const breakTimeout = setTimeout(async () => {
			try {
				AppNormsService.normalizePDF(documentHTML, filename);
			} catch (error) {
				AppAlertService.error();
			} finally {
				navigate(-1);
			}
		}, 1000);

		return () => clearTimeout(breakTimeout);
	}, []);

	// component layout
	return (
		<ThemeProvider theme={MUIThemeLight}>
			<CssBaseline />
			<AppViewLoading isLoading={true} />
			<AppViewStack id={'pdf-downlad'} flex={1} gap={1} padding={2}>
				<BillStatsSummary posts={posts} users={users} />
			</AppViewStack>
		</ThemeProvider>
	);
}
