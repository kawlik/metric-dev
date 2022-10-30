import { Avatar, Box, Stack, TextField, Typography } from '@mui/material';

// assets
import Gif from '../assets/love.gif';

export default function (props: { name: string; setName(name: string): void }) {
	// component logic
	const valid = props.name.trim().length > 0 && props.name.length < 32;

	// component layout
	return (
		<Stack gap={2} paddingY={2} justifyContent={'center'}>
			<Box margin={'auto'}>
				<Avatar src={Gif} sx={{ height: 72, width: 72 }} variant={'rounded'} />
			</Box>
			<Typography noWrap={true} textAlign={'center'} variant={'h6'}>
				Hello {props.name.trim() || 'Stranger'}!
			</Typography>
			<Stack gap={1} flexDirection={'row'}>
				<TextField
					error={!valid}
					helperText={'Up to 31 characters'}
					fullWidth={true}
					label={'Your profile name'}
					onChange={(e) => props.setName(e.target.value.slice(0, 31))}
					size={'small'}
					type={'text'}
					value={props.name}
				/>
			</Stack>
		</Stack>
	);
}
