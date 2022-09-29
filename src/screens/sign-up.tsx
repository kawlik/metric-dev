import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContexts } from '../contexts/@';
import { SignUpScreenView } from './views/@';

export default function (props: {}) {
	// component logic
	const contexts = useContexts();
	const navigate = useNavigate();

	const isSignedIn = contexts.auth.get() === true;
	const isSignedUp = !!contexts.user.get()?.displayName;

	// component lifecycle
	useEffect(() => {
		if (!isSignedIn) navigate('/sign-in/');
	}, [contexts]);

	// component layout
	return <SignUpScreenView />;
}
