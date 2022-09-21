import { User } from 'firebase/auth';
import { createContext, useContext } from 'react';
import { ContextsType } from '../types/@';

// create context
export const AppContext = createContext<{
	auth: boolean;
	mode: ContextsType<'dark' | 'light'>;
	user: ContextsType<User | null>;
}>({
	auth: false,
	mode: { get: () => 'light', set: (item) => {} },
	user: { get: () => null, set: (item) => {} },
});

// export consumer
export default function () {
	return useContext(AppContext);
}
