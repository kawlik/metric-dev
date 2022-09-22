import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

// app stylesheets
import './style.css';

// app providers
import { HashRouter } from 'react-router-dom';
import { AppContexts } from './contexts/@';
import { registerSW } from 'virtual:pwa-register';

// app instantization
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AppContexts>
			<HashRouter>
				<App />
			</HashRouter>
		</AppContexts>
	</React.StrictMode>,
);

// app service worker
registerSW({
	onNeedRefresh() {},
	onOfflineReady() {},
});
