declare module 'bun:test' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Matchers<T> {
		toBeValidMusicXML(): Promise<void>;
		toEqualXML(xml: string): void;
	}
}
