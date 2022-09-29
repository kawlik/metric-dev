import {
	ConfirmationResult,
	RecaptchaParameters,
	RecaptchaVerifier,
	signInWithPhoneNumber,
	User,
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from './@.service';
import { FirebaseAuth } from './utils/@';

// define service
class AuthService extends FirebaseAuth {
	constructor(
		private recapthcaParams: RecaptchaParameters = { size: 'invisible' },
		private recapthcaResult: ConfirmationResult | null = null,
		private recapthcaSelector: string = 'recaptcha-verifier-refrence',
		private recapthcaVerifier: RecaptchaVerifier | null = null,
	) {
		super(new BehaviorSubject<User | null>(null));
	}

	logout = (): void => {
		if (confirm('Are you sure you want to log out?')) FirebaseService.Auth.signOut();
	};

	createOTP = async (phone: string): Promise<void> => {
		await this.prepare()
			.then(() => this.attempt(phone))
			.then((result) => (this.recapthcaResult = result));
	};

	verifyOTP = async (code: string): Promise<void> => {
		await this.recapthcaResult?.confirm(code);
	};

	private attempt = (phone: string) => {
		return signInWithPhoneNumber(FirebaseService.Auth, phone, this.recapthcaVerifier!);
	};

	private prepare = (): Promise<number> => {
		this.recapthcaVerifier?.clear();
		this.recapthcaVerifier = new RecaptchaVerifier(
			this.recapthcaSelector,
			this.recapthcaParams,
			FirebaseService.Auth,
		);

		return this.recapthcaVerifier.render();
	};
}

// export service
export default new AuthService();
