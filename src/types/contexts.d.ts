export default interface Contexts<T> {
	get: () => T;
	set: (item: T) => void;
}
