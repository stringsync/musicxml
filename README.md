# musicxml

![test workflow](https://github.com/stringsync/musicxml/actions/workflows/test.yml/badge.svg)

[See the docs](https://stringsync.github.io/musicxml/).

`musicxml` is a JavaScript library that makes it easy to parse and edit [MusicXML](https://www.w3.org/2021/06/musicxml40/) documents.

One of the common problems working with MusicXML is that different softwares may export invalid MusicXML documents due
to the complex nature of the MusicXML specification. This library guarantees that parsed and serialized MusicXML documents
are valid by conforming the document to the specification.

## ⚠️ Warning

### API

This API is unstable - use at your own risk. I **highly** recommend that you lock into a specific version of this library.

### Lossy Parsing

When parsing a MusicXML document, `musicxml` will ignore comments and treat CDATA as regular text data.
When serializing back to xml, comments are completely ommitted and CDATA is rendered as text nodes, since `xml-js`
will escape special characters.

In order to guarantee that parsed and serialized documents are valid, this library will replace invalid element or text
nodes with a default value. See [src/lib/operations/zero.ts](src/lib/operations/zero.ts) for how the default values are
determined.

## 🔨 Usage

### Installation

I **highly** recommend that you lock into a specific version of this library.

```shell
yarn add @stringsync/musicxml@0.2.1
```

or

```shell
npm install @stringsync/musicxml@0.2.1
```

### Exports

```ts
import { asserts, elements, MusicXML } from '@stringsync/musicxml';
```

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
    <measure number="1"/>
  </part>
</score-partwise>`;

// parse
const musicXml = MusicXML.parse(xml);

// serialize
console.log(musicXml.serialize() === xml); // true
```

### Create and update elements

```ts
const measure = new elements.MeasurePartwise({ attributes: { number: '1', implicit: 'no' } });
measure.getNumber(); // '1'
measure.setNumber('4');
measure.getNumber(); // '4'
measure.setValues([...measure.getValues(), new elements.Note()]);
```

### Chain setters methods

```ts
const note = new elements.Note();
note
  .setColor('#800080') // chain attributes
  .setStaff(new elements.Staff()) // chain contents
  .getStaff()!
  .setValue(4);
```

### Create a MusicXML object

[`<score-partwise version="4.0">`](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/score-partwise/) root

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

export type TiedNote = [Chord | null, Pitch | Unpitched | Rest, Duration, [] | [Tie] | [Tie, Tie]];

export type CuedNote = [Cue, Chord | null, Pitch | Unpitched | Rest, Duration];

export type TiedGraceNote = [Grace, Chord | null, Pitch | Unpitched | Rest, [] | [Tie] | [Tie, Tie]];

export type CuedGraceNote = [Grace, Cue, Chord | null, Pitch | Unpitched | Rest, Duration];

class Note {
  getVariation(): TiedNote | CuedNote | TiedGraceNote | CuedGraceNote {
    return this.contents[0];
  }
}
```

It is very cumbersome to manually validate which choice is being used. Also, the lack of overlap of some choices can make it difficult to use with TypeScript. The `asserts` export will have [type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) corresponding to those choices.

For example, to work with an `elements.Note` value:

```ts
const note = new elements.Note();
const noteVariation = note.getVariation();

if (asserts.isTiedNote(noteVariation)) {
  // noteVariation: TiedNote
} else if (asserts.isCuedNote(noteVariation)) {
  // noteVariation: CuedNote
} else if (asserts.isTiedGraceNote(noteVariation)) {
  // noteVariation: TiedGraceNote
} else if (asserts.isCuedGraceNote(noteVariation)) {
  // noteVariation: CuedGraceNote
} else {
  // noteVariation: never
}
```

### End-to-end Example

This example renders MusicXML for a single measure with an image of a single measure with a C/4 whole note.

![image of a single measure with a C/4 whole note](https://github.com/user-attachments/assets/7480ec5e-2aac-4653-86e3-2717ecfca8c2)

You can validate the MusicXML on https://vexml.dev.

```ts
const musicXml = MusicXML.createPartwise();

musicXml
  .getRoot()
  .setPartList(
    new elements.PartList({
      contents: [
        new Array<elements.PartGroup>(),
        new elements.ScorePart({
          attributes: { id: 'P1' },
          contents: [
            null, // elements.Identification
            new Array<elements.PartLink>(),
            new elements.PartName({ contents: ['Part 1'] }),
            null, // elements.PartNameDisplay
            null, // elements.PartAbbreviation
            null, // elements.PartAbbreviationDisplay
            new Array<elements.Group>(),
            new Array<elements.ScoreInstrument>(),
            new Array<elements.Player>(),
            new Array<elements.MidiDevice | elements.MidiInstrument>(),
          ],
        }),
        new Array<elements.PartGroup | elements.ScorePart>(),
      ],
    })
  )
  .setParts([
    new elements.PartPartwise({
      attributes: { id: 'P1' },
    }).setMeasures([
      new elements.MeasurePartwise({
        attributes: { number: '1' },
        contents: [
          [
            new elements.Attributes({
              attributes: { divisions: 1 },
              contents: [
                null, // elements.Footnote
                null, // elements.Level
                null, // elements.Divisions
                new Array<elements.Key>(),
                new Array<elements.Time>(
                  new elements.Time({
                    contents: [
                      [
                        [
                          [
                            new elements.Beats({
                              contents: ['4'],
                            }),
                            new elements.BeatType({
                              contents: ['4'],
                            }),
                          ],
                        ],
                        null,
                      ],
                    ],
                  })
                ),
                null, // elements.Staves
                null, // elements.PartSymbol
                null, // elements.Instruments
                new Array<elements.Clef>(),
                new Array<elements.StaffDetails>(),
                new Array<elements.Transpose>(),
                new Array<elements.Directive>(),
                new Array<elements.MeasureStyle>(),
              ],
            }),
            new elements.Note({
              contents: [
                [
                  null, // elements.TiedNote
                  new elements.Pitch({
                    contents: [
                      new elements.Step({
                        contents: ['C'],
                      }),
                      null, // elements.Alter
                      new elements.Octave({
                        contents: [4],
                      }),
                    ],
                  }),
                  new elements.Duration({
                    contents: [4],
                  }),
                  [], // elements.Tie,
                ],
                new Array<elements.Instrument>(),
                null, // elements.Footnote
                null, // elements.Level
                null, // elements.Voice
                null, // elements.Type
                new Array<elements.Dot>(),
                null, // elements.Accidental
                null, // elements.TimeModification
                null, // elements.Stem
                null, // elements.Notehead
                null, // elements.NoteheadText
                null, // elements.Staff
                [], // elements.Beam
                new Array<elements.Notations>(),
                new Array<elements.Lyric>(),
                null, // elements.Play
                null, // elements.Listen
              ],
            }),
          ],
        ],
      }),
    ]),
  ]);

console.log(musicXml.serialize());
```

which logs the following MusicXML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<score-partwise version="4.0">
  <part-list>
    <score-part id="P1">
      <part-name>Part 1</part-name>
    </score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <time>
          <beats>4</beats>
          <beat-type>4</beat-type>
        </time>
      </attributes>
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
      </note>
    </measure>
  </part>
</score-partwise>
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

## ❓ FAQs

### Why didn't you derive the elements directly from [musicxml.xsd](https://www.w3.org/2021/06/musicxml40/listings/musicxml.xsd/)?

This is something I've been frequently asking myself.

I've tried multiple times to get this to work, but
[xsd](<https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-4.0/ms256460(v=vs.100)>) has been
extremely challenging to work with. I tried making a pared down xsd parser that would work with the parts used in musicxml.xsd,
but it was still incredibly challenging.

The problem came down to parsing the _contents_ of an xsd element. The main
two approaches I tried were: (1) making a sax-like state machine and (2) writing imperative routines to parse the xsd.
Take this [`<xs:schema>`](<https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-4.0/ms256460(v=vs.100)>) definition for example:

```
<schema
  attributeFormDefault = (qualified | unqualified): unqualified
  blockDefault = (#all | List of (extension | restriction | substitution) : ''
  elementFormDefault = (qualified | unqualified): unqualified
  finalDefault = (#all | List of (extension | restriction | list |
union): ''
  id = ID
  targetNamespace = anyURI
  version = token
  xml:lang = language
  {any attributes with non-schema Namespace}...>
Content: ((include | import | redefine | annotation)*, (((simpleType |
complexType | group | attributeGroup) | element | attribute | notation),
annotation*)*)
</schema>
```

Pay attention to how the `annotation` element could appear multiple times in the beginning and end of the element's content.
This means I cannot simply index the contents into properties. This was a somewhat common occurence in the elements used
in musicxml.xsd. I had to maintain the groupings of elements.

Thanks to `xml-js`, I was able to get some intermediate structure that looked like this:

```js
{
  "type": "element",
  "name": "xs:schema",
  "attributes": { /* ... */ },
  "contents": [
    { "type": "element", "name": "annotation", "attributes": { /* ... */ }, contents: [ /* ... */ ] }
    { "type": "element", "name": "import", "attributes": { /* ... */ }, contents: [ /* ... */ ] }
    { "type": "element", "name": "import", "attributes": { /* ... */ }, contents: [ /* ... */ ] }
    { "type": "element", "name": "import", "simpleType": { /* ... */ }, contents: [ /* ... */ ] }
    { "type": "element", "name": "import", "simpleType": { /* ... */ }, contents: [ /* ... */ ] }
    // etc.
  ]
}
```

In the state machine approach, it was difficult to simulate stack frames in order to "jump back" to a particular place.
I tried using object paths, but they were ultimately messy and troublesome.

In the imperative approach, there were so many elements and nested groupings and it would take a while to implement correctly.
I would want the imperative approach to be reasonably tested, making this too expensive for me to pursue, which is why I
ultimately moved away from that approach.

That was just issues with parsing the xsd. I didn't even get to the point where I could conform an xml document to an xsd file.

For whoever wants to revisit this and make the generated client solely based off of musicxml.xsd, I highly recommend that
you leverage some library that does the heavy lifting xsd parsing for you. At the time of writing this, I did not find any
actively maintained candidates. Conformance of an xml document against an xsd schema is a separate problem.

All in all, rolling my own descriptor/schema library within this package (see [src/lib/schema](src/lib/schema/)) allowed
me to use a structure that was more compatible with TypeScript. I considered transforming musicxml.xsd into these
descriptors, but I wrote labeling functionality that made it easy to reference logical groups. For example, the
[<note> element](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/note/) has multiple choices for what
its main content can be. musicxml.xsd does not name these choices. In my descriptor library, I name them making them easier
to work with (see [src/lib/elements/Note.ts](src/lib/elements/Note.ts)).
