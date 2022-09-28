import { User } from 'firebase/auth';
import { createContext, useContext } from 'react';
import { ContextsType } from '../types/@';

// define contexts
export type AuthType = undefined | boolean;
export type ModeType = undefined | 'dark' | 'light';
export type UserType = undefined | User | null;

// create contexts
export const AppContext = createContext<{
	auth: ContextsType<AuthType>;
	mode: ContextsType<ModeType>;
	user: ContextsType<UserType>;
}>({
	auth: { get: () => undefined, set: (ctx) => {} },
	mode: { get: () => undefined, set: (ctx) => {} },
	user: { get: () => undefined, set: (ctx) => {} },
});

// export consumer
export default function () {
	return useContext(AppContext);
}
