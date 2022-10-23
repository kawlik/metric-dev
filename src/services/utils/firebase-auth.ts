import { onAuthStateChanged, Unsubscribe, User } from 'firebase/auth';
import { Subject } from 'rxjs';
import { UserAuthType } from '../../types/@';
import { FirebaseService } from '../@.service';

export default abstract class {
	protected snapshot: Unsubscribe;
	protected subject$: Subject<UserAuthType>;

	constructor(subject$: Subject<UserAuthType>) {
		this.snapshot = () => {};
		this.subject$ = subject$;
	}

	subscribeOn = (): Subject<UserAuthType> => {
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
