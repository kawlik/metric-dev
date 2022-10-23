import {
	DocumentReference,
	DocumentSnapshot,
	onSnapshot,
	Unsubscribe,
} from 'firebase/firestore';
import { Subject } from 'rxjs';

export default abstract class FirebaseDocument<T> {
	protected abstract callback: (snapshot: DocumentSnapshot) => void;
	protected abstract register: (identifier: string) => DocumentReference;

	protected snapshot: Unsubscribe;
	protected subject$: Subject<T>;

	constructor(subject$: Subject<T>) {
		this.snapshot = () => {};
		this.subject$ = subject$;
	}

	subscribeOn = (identifier: string) => {
		this.unsubscribe();
		this.snapshot = onSnapshot(this.register(identifier), this.callback);

		return this.subject$;
	};

	unsubscribe = () => {
		this.snapshot();
	};
}
