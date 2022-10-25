import {
	AccountBalance,
	AttachMoney,
	Extension,
	Tapas,
	TravelExplore,
} from '@mui/icons-material';
import { FunctionComponent } from 'react';

export default new Map<string, FunctionComponent>([
	['Expenses', AttachMoney],
	['Ledger', AccountBalance],
	['Outing', Tapas],
	['Other', Extension],
	['Trip', TravelExplore],
]);
