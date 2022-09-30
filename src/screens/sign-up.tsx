import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContexts } from '../contexts/@';
import { SignUpScreenView } from './views/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	// component layout
	return <SignUpScreenView />;
}
