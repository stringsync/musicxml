# Unreleased

The element classes and type guards are now generated from the MusicXML 4.0 XSD.
Existing class names, accessors, types, and compatibility defaults are preserved.
Class documentation now comes from the XSD and links to the W3C element reference;
attribute-specific documentation from the hand-written schemas is no longer emitted.

## New API

- Text accessors on `Elision`, `OtherArticulation`, `OtherPlay`, and `Symbol`,
  plus pitched-value accessors on `Pitched`.
- `PlayerName` and player-name accessors on `Player`.
- `SystemDividers`, `LeftDivider`, and `RightDivider`, plus system-dividers
  accessors on `SystemLayout`.
- Type guards `isPlayerName`, `isSystemDividers`, `isLeftDivider`, and `isRightDivider`.
- Attribute types and accessors for the following XML attributes:

  | Classes | Attributes |
  | --- | --- |
  | `Image` | `height` |
  | `MeasurePartwise`, `MeasureTimewise` | `non-controlling` |
  | `OtherNotation` | `font-family`, `font-size`, `font-style`, `font-weight`, `print-object` |
  | `Pedal` | `halign`, `valign` |
  | `Percussion` | `enclosure` |
  | `Rehearsal` | `justify` |
  | `Scoop` | `dash-length`, `line-length`, `line-shape`, `line-type`, `space-length` |
  | `Slur`, `Tied` | `bezier-offset`, `bezier-offset2` |
  | `Stopped` | `smufl` |
  | `StringMute` | `type` (required, `off` or `on`; defaults to `on`) |
  | `TrillMark` | `accelerate` |
