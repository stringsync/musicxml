export type EventHandlers = Record<string, number>;

export type Schema = {
  version: string;
  root: [EventHandlers];
  states: {
    [key: string]: EventHandlers[];
  };
};
