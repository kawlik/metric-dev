import { Box, Link } from '@mui/material';

export default function (props: { alt?: string; src: string }) {
	// component logic

	// component layout
	return (
		<Box
			sx={{
				backgroundImage: `url('${props.src}')`,
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'contain',
				flex: 1,
			}}
		>
			{props.alt && <Link display="none" href={props.alt} title="source attribute" />}
		</Box>
	);
}
