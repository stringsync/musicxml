# musicxml

![test workflow](https://github.com/stringsync/musicxml/actions/workflows/test.yml/badge.svg)

[See the docs](https://stringsync.github.io/musicxml/).

Parse, edit and write [MusicXML](https://www.w3.org/2021/06/musicxml40/) in JavaScript and TypeScript, with a typed
class for every element.

```shell
bun add @stringsync/musicxml@0.3.1
```

The API is still settling, so pin an exact version.

## Valid in, valid out

Not every app exports valid MusicXML. This library doesn't mind: whatever you parse is conformed to the spec, and
whatever you serialize is valid. The tests check this against the official
[musicxml.xsd](https://www.w3.org/2021/06/musicxml40/listings/musicxml.xsd/), and hundreds of real-world scores (from
LilyPond, OSMD, Guitar Pro and the W3C) come back out unchanged after a parse and serialize.

To make that promise, a few things give:

- Invalid elements and text are replaced with a sensible default (see
  [zero.ts](packages/musicxml/src/lib/operations/zero.ts)).
- Comments are dropped, and CDATA comes back as plain text.

## Usage

```ts
import { asserts, elements, MusicXML } from '@stringsync/musicxml';

const musicXml = MusicXML.parse(xml);
const xmlAgain = musicXml.serialize();

const fresh = MusicXML.createPartwise(); // or MusicXML.createTimewise()
```

Elements have getters and setters, and the setters chain:

```ts
const note = new elements.Note();
note.setColor('#800080').setStaff(new elements.Staff());
```

## Aliases for variants

MusicXML loves "one of these shapes" content, and the XSD rarely names the shapes. This library does. A `<note>`, for
example, is a `TiedNote`, `CuedNote`, `TiedGraceNote` or `CuedGraceNote`, and `asserts` has a type guard for each:

```ts
const variation = note.getVariation();

if (asserts.isTiedNote(variation)) {
  // variation: TiedNote
} else if (asserts.isCuedNote(variation)) {
  // variation: CuedNote
} else if (asserts.isTiedGraceNote(variation)) {
  // variation: TiedGraceNote
} else if (asserts.isCuedGraceNote(variation)) {
  // variation: CuedGraceNote
}
```

No more counting tuple slots to guess which one you've got.

## Development

You'll need [Bun](https://bun.sh/docs/installation) and [Docker](https://docs.docker.com/get-docker/): tests validate
against the XSD through the [xmlvalidator](xmlvalidator) service.

```shell
bin/mxl test    # run the tests (any bun test options work, like --watch)
bin/mxl fix     # format, lint and typecheck
bin/mxl --help  # everything else
```

The elements are generated from musicxml.xsd; see [AGENTS.md](AGENTS.md) for how the repository fits together.
