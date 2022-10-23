import {
	Attractions,
	Checkroom,
	EvStation,
	Fastfood,
	HealthAndSafety,
	Home,
	QuestionMark,
	Receipt,
	School,
} from '@mui/icons-material';
import { FunctionComponent } from 'react';
import { UserBillPlansType } from '../types/@';

export default new Map<UserBillPlansType, FunctionComponent>([
	['Clothing', Checkroom],
	['Education', School],
	['Entertainment', Attractions],
	['Food', Fastfood],
	['Fees', Receipt],
	['Health', HealthAndSafety],
	['Household', Home],
	['Mobility', EvStation],
	['Other', QuestionMark],
]);
