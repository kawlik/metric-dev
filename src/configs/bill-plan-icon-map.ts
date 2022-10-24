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

export default new Map<string, FunctionComponent>([
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
