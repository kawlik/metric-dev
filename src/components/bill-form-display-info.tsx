import { ReceiptLong } from '@mui/icons-material';
import { Avatar, Box, Stack, TextField } from '@mui/material';

export default function (props: {
	displayTitle: string;
	displayValidTo: number;
	updateDisplayTitle(displayTitle: string): void;
	updateDisplayValidTo(displayValidTo: number): void;
}) {
	// component logic
	const isValidTitle =
		props.displayTitle.trim().length > 0 && props.displayTitle.trim().length < 32;

	// component layout
	return (
		<Stack gap={2} justifyContent={'center'}>
			<Box margin={'auto'}>
				<Avatar sx={{ height: 72, width: 72 }}>
					<ReceiptLong fontSize={'large'} />
				</Avatar>
			</Box>
			<Stack gap={2}>
				<TextField
					autoFocus={true}
					error={!isValidTitle}
					fullWidth={true}
					label={'Bill title'}
					onChange={(e) => props.updateDisplayTitle(e.target.value.slice(0, 31))}
					size={'small'}
					type={'text'}
					value={props.displayTitle}
				/>
				<TextField
					fullWidth={true}
					label={'Valid until'}
					onChange={() => {}}
					size={'small'}
					type={'date'}
					value={'2022-10-31'}
				/>
			</Stack>
		</Stack>
	);
}
