import { User } from 'firebase/auth';
import { createContext, useContext } from 'react';
import { ContextsType } from '../types/@';

// define contexts
export type AuthType = undefined | null | User;
export type ModeType = undefined | 'dark' | 'light';

// create contexts
export const AppContext = createContext<{
	auth: ContextsType<AuthType>;
	mode: ContextsType<ModeType>;
	isSignedIn: ContextsType<boolean>;
	isSignedUp: ContextsType<boolean>;
}>({
	auth: { get: () => undefined, set: (ctx) => {} },
	mode: { get: () => undefined, set: (ctx) => {} },
	isSignedIn: { get: () => false, set: (ctx) => {} },
	isSignedUp: { get: () => false, set: (ctx) => {} },
});

// export consumer
export default function () {
	return useContext(AppContext);
}
