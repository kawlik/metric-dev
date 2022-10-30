import { AttachMoney, RequestQuote } from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export default new Map<string, OverridableComponent<SvgIconTypeMap<{}, 'svg'>>>([
	['Expense', AttachMoney],
	['Objective', RequestQuote],
]);
