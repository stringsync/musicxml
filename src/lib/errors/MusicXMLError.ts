export type ErrorDetails = {
  symptom: string;
  remedy: string;
  context: Record<string, any>;
};

export class MusicXMLError extends Error {
  readonly details: ErrorDetails;

  constructor(details: ErrorDetails) {
    const symptom = details.symptom;
    const remedy = details.remedy;
    const context =
      Object.entries(details.context)
        .map(([k, v]) => `${k}=${v}`)
        .join('\n\t') || '(None)';
    super(`symptom:\n\t${symptom}\n\fcontext:\n\t${context}\n\nremedy:\n\t${remedy}\n`);
    this.details = details;
  }
}
