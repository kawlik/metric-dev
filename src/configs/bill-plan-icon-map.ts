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
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export default new Map<string, OverridableComponent<SvgIconTypeMap<{}, 'svg'>>>([
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
