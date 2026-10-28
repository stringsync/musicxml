A bun workspace. `packages/musicxml` is `@stringsync/musicxml`, the published
library, and `packages/mxl` is the dev CLI that builds and checks it:

| Package             | What it is                                                           |
| ------------------- | -------------------------------------------------------------------- |
| `packages/musicxml` | the library: `src/lib` (hand-written), `src/generated` (generated)   |
| `packages/mxl`      | the `mxl` CLI (`bin/mxl`): test, fix, generate, docs, build and ship |

Make code changes with splates by default: follow the `splates` skill
(`.claude/skills/splates`) to work in an isolated worktree and land on `master`
with `splates merge`, unless told otherwise.

After making code changes:

- Run `./bin/mxl fix` to format, lint and typecheck (`./bin/mxl fix --check` only reports).
- Run `./bin/mxl test <files>` to test what you changed. Arguments go to `bun test`, so pass
  test files or `-t <name>`. Tests run in Docker against the `xmlvalidator` service; the whole
  suite runs in the merge gate, not on your machine.
- After changing the generator, run `./bin/mxl generate`; `src/generated` is never edited by hand.
- After changing public API or doc comments, run `./bin/mxl docs` to regenerate `docs/`.

The merge gate is `./bin/mxl fix --check && ./bin/mxl test`, the same as CI.
Publishing is `mxl ship`, which only the person runs.
