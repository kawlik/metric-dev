import {
	AccountBalance,
	AttachMoney,
	Extension,
	Tapas,
	TravelExplore,
} from '@mui/icons-material';
import { FunctionComponent } from 'react';

export default new Map<string, FunctionComponent>([
	['Excursion', Tapas],
	['Expenses', AttachMoney],
	['Ledger', AccountBalance],
	['Other', Extension],
	['Trip', TravelExplore],
]);
