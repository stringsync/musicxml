declare namespace jest {
  interface Matchers<R> {
    toBeValidMusicXML(): Promise<R>;
  }
}
