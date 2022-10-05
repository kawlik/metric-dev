import { onAuthStateChanged, Unsubscribe, User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { UserAuthType } from '../../types/@';
import { FirebaseService } from '../@.service';

export default abstract class {
	protected snapshot: Unsubscribe;
	protected subject$: BehaviorSubject<UserAuthType>;

	constructor(subject$: BehaviorSubject<UserAuthType>) {
		this.snapshot = () => {};
		this.subject$ = subject$;
	}

	subscribeOn = (): BehaviorSubject<UserAuthType> => {
		this.unsubscribe();
		this.snapshot = onAuthStateChanged(FirebaseService.Auth, (user) => {
			this.subject$.next(user);
		});

		return this.subject$;
	};

	unsubscribe = (): void => {
		this.snapshot();
	};
}
