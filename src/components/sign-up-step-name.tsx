import { Handshake } from '@mui/icons-material';
import { Avatar, Box, Stack, TextField, Typography } from '@mui/material';

export default function (props: { name: string; setName(name: string): void }) {
	// component logic
	const valid = props.name.trim().length > 0 && props.name.length < 32;

	// component layout
	return (
		<Stack gap={2} paddingY={2} justifyContent={'center'}>
			<Box margin={'auto'}>
				<Avatar sx={{ height: 72, width: 72 }}>
					<Handshake fontSize={'large'} />
				</Avatar>
			</Box>
			<Typography noWrap={true} textAlign={'center'} variant={'h6'}>
				Hello {props.name.trim() || 'Stranger'}!
			</Typography>
			<Stack gap={1} flexDirection={'row'}>
				<TextField
					autoFocus={true}
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
