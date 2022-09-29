import { User } from 'firebase/auth';
import { createContext, useContext } from 'react';
import { ContextsType } from '../types/@';

// define contexts
export type AuthType = null | boolean;
export type ModeType = null | 'dark' | 'light';
export type UserType = null | User;

// create contexts
export const AppContext = createContext<{
	auth: ContextsType<AuthType>;
	mode: ContextsType<ModeType>;
	user: ContextsType<UserType>;
}>({
	auth: { get: () => null, set: (ctx) => {} },
	mode: { get: () => null, set: (ctx) => {} },
	user: { get: () => null, set: (ctx) => {} },
});

// export consumer
export default function () {
	return useContext(AppContext);
}
