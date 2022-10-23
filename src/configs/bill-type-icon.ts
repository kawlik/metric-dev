import { AccountBalance, Extension, Paid, Tapas, TravelExplore } from '@mui/icons-material';
import { FunctionComponent } from 'react';
import { UserBillTypesType } from '../types/@';

export default new Map<UserBillTypesType, FunctionComponent>([
	['Excursion', Tapas],
	['Expenses', Paid],
	['Ledger', AccountBalance],
	['Other', Extension],
	['Trip', TravelExplore],
]);
