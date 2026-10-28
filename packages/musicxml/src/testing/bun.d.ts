declare module 'bun:test' {
	interface Matchers<T> {
		toBeValidMusicXML(): Promise<void>;
		toEqualXML(xml: string): void;
	}
}
