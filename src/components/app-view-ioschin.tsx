import { Box } from '@mui/material';
import { AppAgentService } from '../services/@.service';

export default function (props: {}) {
	// component logic

	// component layout
	return <Box padding={AppAgentService.agent('iPhone') ? 1.5 : 0} />;
}
