import { DataUsage } from '@mui/icons-material';
import { Avatar, Divider, Skeleton, Stack } from '@mui/material';
import { Box, Container } from '@mui/system';

export default function (props: {}) {
	// component logic

	// component layout
	return (
		<Container maxWidth={'md'}>
			<Stack display={'flex'} alignItems={'center'}>
				<Skeleton sx={{ height: 128, width: 128 }} variant={'circular'} />
			</Stack>
			<Box>
				<Skeleton sx={{ marginLeft: 2, marginRight: 2, padding: 1 }} />
				<Skeleton sx={{ marginLeft: 2, marginRight: 7, padding: 1 }} />
			</Box>
		</Container>
	);
}
