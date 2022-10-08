import { createContext, useContext } from 'react';
import { BillInfoType, ContextsType, UserAuthType, UserModeType } from '../types/@';

// create contexts
export const AppContext = createContext<{
	activeBill: ContextsType<BillInfoType | null>;
	isSignedIn: ContextsType<boolean>;
	isSignedUp: ContextsType<boolean>;
	savedLedgers: ContextsType<BillInfoType[] | undefined>;
	savedReports: ContextsType<BillInfoType[] | undefined>;
	userAuth: ContextsType<UserAuthType>;
	userMode: ContextsType<UserModeType>;
}>({
	activeBill: { get: () => null, set: (ctx) => {} },
	isSignedIn: { get: () => false, set: (ctx) => {} },
	isSignedUp: { get: () => false, set: (ctx) => {} },
	savedLedgers: { get: () => undefined, set: (ctx) => {} },
	savedReports: { get: () => undefined, set: (ctx) => {} },
	userAuth: { get: () => undefined, set: (ctx) => {} },
	userMode: { get: () => undefined, set: (ctx) => {} },
});

// export consumer
export default function () {
	return useContext(AppContext);
}
