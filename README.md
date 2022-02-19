# musicxml

![example workflow](https://github.com/stringsync/musicxml/actions/workflows/test.yml/badge.svg)

`musicxml` is a JavaScript library that makes it easy to parse and edit [musicXML](https://www.w3.org/2021/06/musicxml40/) documents.

## 🔨 Usage

### Parse and serialize a MusicXML document

```ts
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<score-partwise version="4.0">
  <part-list>
    <score-part id="P1">
      <part-name></part-name>
    </score-part>
  </part-list>
  <part id="P1">
    <measure number=""/>
  </part>
</score-partwise>`;

// parse
const musicXml = MusicXML.parse(xml);

// serialize
console.log(musicXml.serialize() === xml); // true
```

### Create a MusicXML object

[`<score-partwise>`](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/score-partwise/) root

```ts
const musicXml = MusicXML.createPartwise();
const root = musicXml.getRoot();
console.log(MusicXML.isScorePartwise(root)); // true
```

[`<score-timewise>`](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/score-timewise/) root

```ts
const musicXml = MusicXML.createTimewise();
const root = musicXml.getRoot();
console.log(MusicXML.isScoreTimewise(root)); // true
```

### Narrow types

Some types can be complex unions. For example, take the `elements.Note` class, which corresponds to the [`<note>`](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/note/) element (see the content). The first content can be one of several different choices. This library expresses the choices in terms of a union.

```ts
// truncated elements.Note class

type BasicNoteValue = [Chord | null, Pitch | Unpitched | Rest, Duration, [] | [Tie] | [Tie, Tie]];

type CueNoteValue = [Cue, Chord | null, Pitch | Unpitched | Rest, Duration];

type GraceNoteValue = [Grace, TiedGraceNoteValueSpec | CueGraceNoteValueSpec];

class Note {
  getValue(): BasicNoteValue | CueNoteValue | GraceNoteValue {
    return this.contents[0];
  }
}
```

It is very cumbersome to manually validate which choice is being used. Also, the lack of overlap of some choices can make it difficult to use with TypeScript. **Classes that contain choices nested in its <ins>contents</ins> will have static [type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) corresponding to those choices.**

For example, to work with an `elements.Note` value:

```ts
const note = new elements.Note();
const value = note.getValue();

if (elements.Note.isBasicNoteValue(value)) {
  // value: BasicNoteValue
} else if (elements.Note.isCueNoteValue(value)) {
  // value: CueNoteValue
} else if (elements.Note.isGraceNoteValue(value)) {
  // value: GraceNoteValue
} else {
  // value: never
}
```

## 💻 Development

### Prerequisites

`musicxml` uses Docker and Docker Compose to create the test environment. The tests will not pass if you try to run them locally.

- [install Docker](https://docs.docker.com/get-docker/)
- [install docker-compose](https://docs.docker.com/compose/install/)

### Testing

`musicxml` uses [xsdvalidate](https://pkg.go.dev/github.com/terminalstatic/go-xsd-validate) to validate XML against an xsd schema. This library is exposed as an HTTP service in the [xmlvalidator](https://github.com/stringsync/musicxml/tree/master/xmlvalidator) directory. The schema was adapted directly from [w3](https://www.w3.org/2021/06/musicxml40/listings/musicxml.xsd/).

To run the tests, run the following in the project directory:

```
yarn test
```

`musicxml` uses the `jest` testing framework. You can pass any of the `jest` CLI options to the test command. For example, to run the tests in watch mode (recommended), run:

```
yarn test --watchAll
```

A complete list of options are in the [jest docs](https://jestjs.io/docs/cli).
