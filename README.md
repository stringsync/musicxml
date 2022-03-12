# musicxml

![example workflow](https://github.com/stringsync/musicxml/actions/workflows/test.yml/badge.svg)

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
measure.setMeasureValues([...measure.setMeasureValues(), new elements.Note()]);
```

### Chain setters methods

```ts
const note = new elements.Note();
note
  .setColor('#800080') // chain attributes
  .setStaff(new elements.Staff()) // chain contents
  .getStaff()!
  .setStaffValue(4);
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

export type TiedNoteValue = [Chord | null, Pitch | Unpitched | Rest, Duration, [] | [Tie] | [Tie, Tie]];

export type CuedNoteValue = [Cue, Chord | null, Pitch | Unpitched | Rest, Duration];

export type TiedGraceNoteValue = [Grace, Chord | null, Pitch | Unpitched | Rest, [] | [Tie] | [Tie, Tie]];

export type CuedGraceNoteValue = [Grace, Cue, Chord | null, Pitch | Unpitched | Rest, Duration];

class Note {
  getNoteValue(): TiedNoteValue | CuedNoteValue | TiedGraceNoteValue | CuedGraceNoteValue {
    return this.contents[0];
  }
}
```

It is very cumbersome to manually validate which choice is being used. Also, the lack of overlap of some choices can make it difficult to use with TypeScript. The `asserts` export will have [type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) corresponding to those choices.

For example, to work with an `elements.Note` value:

```ts
const note = new elements.Note();
const noteValue = note.getNoteValue();

if (asserts.isTiedNoteValue(noteValue)) {
  // noteValue: TiedNoteValue
} else if (asserts.isCuedNoteValue(noteValue)) {
  // noteValue: CuedNoteValue
} else if (asserts.isTiedGraceNoteValue(noteValue)) {
  // noteValue: TiedGraceNoteValue
} else if (asserts.isCuedGraceNoteValue(noteValue)) {
  // noteValue: CuedGraceNoteValue
} else {
  // noteValue: never
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
