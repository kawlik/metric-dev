import {
	ConfirmationResult,
	RecaptchaParameters,
	RecaptchaVerifier,
	signInWithPhoneNumber,
} from 'firebase/auth';
import { Subject } from 'rxjs';
import { UserAuthType } from '../types/@';
import { FirebaseService } from './@.service';
import { FirebaseAuth } from './utils/@';

// define service
class UserAuthService extends FirebaseAuth {
	constructor(
		private recapthcaParams: RecaptchaParameters = { size: 'invisible' },
		private recapthcaResult: ConfirmationResult | null = null,
		private recapthcaSelector: string = 'recaptcha-verifier-refrence',
		private recapthcaVerifier: RecaptchaVerifier | null = null,
	) {
		super(new Subject<UserAuthType>());
	}

	logout = (): void => {
		FirebaseService.Auth.signOut();
	};

	generateOTP = async (phone: string): Promise<void> => {
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

	private prepare = (): Promise<number | string> => {
		if (!!this.recapthcaVerifier) {
			return this.recapthcaVerifier.verify();
		}

		this.recapthcaVerifier = new RecaptchaVerifier(
			this.recapthcaSelector,
			this.recapthcaParams,
			FirebaseService.Auth,
		);

		return this.recapthcaVerifier.render();
	};
}

// export service
export default new UserAuthService();
