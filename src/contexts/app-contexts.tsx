import { createContext, useContext } from 'react';
import { BillInfoType, ContextsType, UserAuthType, UserModeType } from '../types/@';

// create contexts
export const AppContext = createContext<{
	activeBill: ContextsType<BillInfoType | null>;
	isSignedIn: ContextsType<boolean>;
	isSignedUp: ContextsType<boolean>;
	userAuth: ContextsType<UserAuthType>;
	userMode: ContextsType<UserModeType>;
}>({
	activeBill: { get: () => null, set: (ctx) => {} },
	isSignedIn: { get: () => false, set: (ctx) => {} },
	isSignedUp: { get: () => false, set: (ctx) => {} },
	userAuth: { get: () => undefined, set: (ctx) => {} },
	userMode: { get: () => undefined, set: (ctx) => {} },
});

// export consumer
export default function () {
	return useContext(AppContext);
}
