import { Handshake } from '@mui/icons-material';
import { Avatar, Box, Stack, TextField, Typography } from '@mui/material';

export default function (props: {
	displayName: string;
	updateDisplayName(displayName: string): void;
}) {
	// component logic
	const isValidName =
		props.displayName.trim().length > 0 && props.displayName.trim().length < 32;

	// component layout
	return (
		<Stack gap={2} justifyContent={'center'}>
			<Box margin={'auto'}>
				<Avatar sx={{ height: 72, width: 72 }}>
					<Handshake fontSize={'large'} />
				</Avatar>
			</Box>
			<Typography noWrap={true} textAlign={'center'} variant={'h6'}>
				Hello {props.displayName.trim() || 'Stranger'}!
			</Typography>
			<Stack gap={1} flexDirection={'row'}>
				<TextField
					autoFocus={true}
					error={!isValidName}
					helperText={'Up to 31 characters'}
					fullWidth={true}
					label={'Your profile name'}
					onChange={(e) => props.updateDisplayName(e.target.value.slice(0, 31))}
					size={'small'}
					type={'text'}
					value={props.displayName}
				/>
			</Stack>
		</Stack>
	);
}
