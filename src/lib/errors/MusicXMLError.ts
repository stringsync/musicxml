export type ErrorDetails = {
  symptom: string;
  remedy: string;
  values: Record<string, any>;
};

export class MusicXMLError extends Error {
  readonly details: ErrorDetails;

  constructor(details: ErrorDetails) {
    const symptom = details.symptom;
    const remedy = details.remedy;
    const values =
      Object.entries(details.values)
        .map(([k, v]) => `${k}=${v}`)
        .join('\n\t') || '(None)';
    super(`symptom:\n\t${symptom}\n\nvalues:\n\t${values}\n\nremedy:\n\t${remedy}\n`);
    this.details = details;
  }
}
