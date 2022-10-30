import {
	AccountBalance,
	Extension,
	RequestQuote,
	Tapas,
	TravelExplore,
} from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export default new Map<string, OverridableComponent<SvgIconTypeMap<{}, 'svg'>>>([
	['Expenses', RequestQuote],
	['Ledger', AccountBalance],
	['Outing', Tapas],
	['Other', Extension],
	['Trip', TravelExplore],
]);
