export class MusicXMLError extends Error {
  constructor(message: string, ctx: Record<string, any> = {}) {
    super(
      `message:\n\t${message}\n\ncontext:\n\t${
        Object.entries(ctx)
          .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
          .join('\n\t') || '(None)'
      }`
    );
  }
}
