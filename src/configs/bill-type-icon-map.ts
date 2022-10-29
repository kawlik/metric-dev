import {
	AccountBalance,
	Extension,
	RequestQuote,
	Tapas,
	TravelExplore,
} from '@mui/icons-material';
import { FunctionComponent } from 'react';

export default new Map<string, FunctionComponent>([
	['Expenses', RequestQuote],
	['Ledger', AccountBalance],
	['Outing', Tapas],
	['Other', Extension],
	['Trip', TravelExplore],
]);
