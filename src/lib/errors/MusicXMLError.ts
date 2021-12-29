export type ErrorDetails = {
  symptom: string;
  remedy: string;
  values: Record<string, string>;
};

export class MusicXMLError extends Error {
  readonly details: ErrorDetails;

  constructor(details: ErrorDetails) {
    const symptom = details.symptom;
    const remedy = details.remedy;
    const values =
      Object.entries(details.values)
        .map(([k, v]) => `${k}=${v}`)
        .join(' ') || '(None)';
    super(`symptom: ${symptom}\nvalues: ${values}\nremedy: ${remedy}`);
    this.details = details;
  }
}
