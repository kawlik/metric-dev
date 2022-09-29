export default interface Contexts<T> {
	get: () => T;
	set: (ctx: T) => void;
}
