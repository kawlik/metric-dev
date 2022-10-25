import { createContext, useContext } from 'react';
import {
	BillDataType,
	BillInfoType,
	ContextsType,
	UserAuthType,
	UserModeType,
} from '../types/@';

// create contexts
export const AppContext = createContext<{
	billData: ContextsType<BillDataType | null>;
	billInfo: ContextsType<BillInfoType | null>;
	isSignedIn: ContextsType<boolean>;
	isSignedUp: ContextsType<boolean>;
	billLedgers: ContextsType<BillInfoType[] | undefined>;
	billReports: ContextsType<BillInfoType[] | undefined>;
	userAuth: ContextsType<UserAuthType>;
	userMode: ContextsType<UserModeType>;
}>({
	billData: { get: () => null, set: (ctx) => {} },
	billInfo: { get: () => null, set: (ctx) => {} },
	billLedgers: { get: () => undefined, set: (ctx) => {} },
	billReports: { get: () => undefined, set: (ctx) => {} },
	isSignedIn: { get: () => false, set: (ctx) => {} },
	isSignedUp: { get: () => false, set: (ctx) => {} },
	userAuth: { get: () => undefined, set: (ctx) => {} },
	userMode: { get: () => undefined, set: (ctx) => {} },
});

// export consumer
export default function () {
	return useContext(AppContext);
}
