export class MusicXMLError extends Error {}

export class ValidationError extends MusicXMLError {
  messages: string[];

  constructor(messages: string[]) {
    super();
    this.messages = messages;
  }

  get message(): string {
    return this.messages.join(';\n');
  }
}
