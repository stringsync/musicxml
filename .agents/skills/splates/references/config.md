# splates.config.ts

What a project's `splates.config.ts`, at the root of its repository, can set.
Read this before you read or change it, or when the user asks what splates
can be set to do. Change it in a task like any other code: it is checked in
and shared by everyone on the project, and a running `splates server` picks
up a change once it lands, without a restart. Never write a secret, a
personal host or an email address into it.

The file default-exports only what differs from the defaults, typed by a
type-only import, so it loads without splates installed:

```ts
import type { ConfigFile } from "@stringsync/splates-server/config";

export default {
	postCheckout: "bun install",
	preMerge: "bun test",
} satisfies ConfigFile;
```

A config wrapping its export in `defineConfig(...)` is from before
`ConfigFile`; `splates update` rewrites it. Every command below runs via
`sh -c`. When an option here is missing or seems out of date, the `Config`
interface in `@stringsync/splates-server/config` (`packages/server/config/config.ts`
in the splates repository) documents each one, and its defaults are in
`load.ts` beside it.

## Branches and worktrees

| Option         | Default                               | What it sets                                                                                                                                                                                                         |
| -------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trunk`        | the branch `origin/HEAD` names, else `main` | The branch tasks start from and land on.                                                                                                                                                                        |
| `remote`       | `null` (`"origin"` on a deployed server with an SSH origin) | The git remote each task's branch is pushed to as `splates/<task>`, so a task outlives the machine; with one, trunk is the remote's and only the server pushes it. `null` pushes nothing.                  |
| `worktreeRoot` | `<repo>-splates.noindex`, beside the repo | The directory holding a worktree per task. The `.noindex` keeps Spotlight from indexing it.                                                                                                                     |
| `platform`     | `null`                                | `"linux"`, `"macos"` or `"windows"` for a project that builds only there: its tasks wait for a worker on it.                                                                                                       |

## Commands around a merge

| Option         | Default | When it runs                                                                                                                                                                                                                                |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `postCheckout` | `null`  | In each new worktree `splates add` makes, as `"bun install"`.                                                                                                                                                                              |
| `postRewrite`  | `null`  | After `merge` rebases, before `preMerge`, since a rebase can bring a dependency the worktree never installed.                                                                                                                              |
| `preLock`      | `null`  | After the first rebase, before the merge waits for the premerge lock: a quick check that needs neither the lock nor the cores. A nonzero exit fails the gate. `preMerge` then gets `$SPLATES_CHECKED`, the commit it passed on, to skip what it covered. |
| `preMerge`     | `null`  | The last gate, after the rebase: a nonzero exit leaves the base untouched. `null` merges on a clean rebase alone. Writing a JUnit report to `$SPLATES_TEST_REPORT` (`bun test --reporter=junit --reporter-outfile="$SPLATES_TEST_REPORT"`) queues a task for each test over 5 seconds, and from Bun charges an attempt only for failures the task caused. |
| `ship`         | `null`  | What `splates ship` runs from the root to publish the project's packages at their next version and commit and tag the release on trunk. `null` never ships it, though it still takes bumps of what it depends on. Only the person ships. |
| `afterBump`    | `null`  | Not run by splates: a ship cascade's bump task, in each project taking this one's new versions, lists it as a step after `bun install`, for the agent to run in the worktree and commit what it changes, as splates's `"bunx @stringsync/splates refresh"`. |

## Task events

`on` maps a task event to a shell command, run in the main tree:
`on: { "task.done": "./notify-team" }`. The events are `task.created`,
`task.updated`, `task.ready`, `task.queued`, `task.started`, `task.done` and
`task.dropped`. The command gets the event in `$SPLATES_EVENT`, its tasks'
numbers in `$SPLATES_TASKS`, comma separated, and a started task's name in
`$SPLATES_TASK`. Shell commands only: a hook that runs an agent spends one
person's tokens, so each person adds their own from the Setup page or
`splates hook add`.

## Limits

| Option                         | Default        | What it caps                                                                                         |
| ------------------------------ | -------------- | ---------------------------------------------------------------------------------------------------- |
| `mergeRetryCount`              | `5`            | Failed merge attempts before only the person's `splates retry` allows another.                       |
| `mergeConflictCount`           | `10`           | Conflicted rebases before the same, counted apart from failed gates.                                 |
| `leaseStalenessMs`             | `90000`        | How long since a task's last heartbeat before its lease is up for grabs.                             |
| `taskStalenessMs`              | 30 days        | How long a queued task waits before `merge` offers it for removal rather than recommending it.       |
| `removedCapacity`              | `50`           | Removed task names kept, so `remove` can say "already removed".                                      |
| `finishedCapacity`             | `500`          | Finished tasks kept, with their `SPLATES.md`, for the Tasks page.                                    |
| `logCapacity`                  | `1000`         | Events the log holds before it is moved aside and a fresh one starts.                                |
| `attachmentCapacity`           | 100 MiB        | Bytes of `splates attach` files one task may hold.                                                   |
| `artifactFileCapacity`         | 50 MiB         | Bytes one artifact may be.                                                                           |
| `artifactConversationCapacity` | 250 MiB        | Bytes of artifacts one conversation may keep ([artifacts.md](artifacts.md)).                         |
| `artifactProjectCapacity`      | 2 GiB          | Bytes of artifacts every conversation in the project may keep together.                              |

Byte and millisecond options take plain numbers, as `100 * 1024 * 1024`.

## Server and page

| Option           | Default                 | What it sets                                                                                                                                                                                           |
| ---------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tunnel`         | `null` (`cloudflared`)  | A `TunnelProvider` of the project's own for `splates server --tunnel`: [setup.md](setup.md), under the tunnel of their own.                                                                            |
| `replica`        | `null`                  | Where the server keeps a copy of the project's records, to move them to another machine: `{ provider: "s3", endpoint, bucket }`, whose keys the Creds page asks for, or `{ provider: "dir", path }` ([transfer.md](transfer.md)). |
| `evals`          | `null` (no Evals page)  | `{ results, list?, run?, plan? }`: where eval batches land for the Evals page and the commands its run card lists, prices and starts them with (`docs/evals.md` in the splates repository).            |
| `dictationWords` | `[]`                    | Words the composer's mic spells as written for everyone on the project, as `["webappwiz", "scry"]`; each person adds their own on the Setup page.                                                       |
| `wiz`            | `"bunx @webappwiz/cli"` | The command the Budget page runs `scry budgets` with, for a repo that wraps webappwiz's CLI, as `"./bin/wiz"`.                                                                                          |
