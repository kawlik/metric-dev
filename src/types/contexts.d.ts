export default interface Contexts<T> {
	get: () => undefined | T;
	set: (ctx: undefined | T) => void;
}
