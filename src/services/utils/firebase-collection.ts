import { onSnapshot, Query, QuerySnapshot, Unsubscribe } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

export default abstract class FirebaseCollection<T> {
	protected abstract callback: (snapshot: QuerySnapshot) => void;
	protected abstract register: (identifier: string) => Query;

	protected snapshot: Unsubscribe;
	protected subject$: BehaviorSubject<T>;

	constructor(subject$: BehaviorSubject<T>) {
		this.snapshot = () => {};
		this.subject$ = subject$;
	}

	subscribeOn = (identifier: string) => {
		this.unsubscribe();
		this.snapshot = onSnapshot(this.register(identifier), this.callback, (err) => {
			console.error(err);
		});

		return this.subject$;
	};

	unsubscribe = () => {
		this.snapshot();
	};
}
