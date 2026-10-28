---
name: splates
description: Use the splates CLI to land your work on trunk, or a base branch given as an argument, from an isolated git worktree without pull requests. Read this before investigating anything that may lead to a code change in a splates repository, since it decides where the work happens, and whenever you need to add, claim, merge, remove, list, show, locate, or defer a task, or queue, pick up, link, or reorder a task for later, or work down a lane of them. Read it too before running a project's tests, a build or anything else heavy, since it says which runs stay off the machine. Also read it before asking the user a question or proposing anything in a splates repository, with a task open or not, and first whenever a message holds a `[SPLATES ...]` directive, such as `[SPLATES TASK <task>]`.
version: 0.0.59
---

# Using splates

`splates` runs many agents on one repo, each in its own git worktree, landing on
trunk without pull requests. Run it with `bunx @stringsync/splates <command>` (or
`splates` if on PATH). `splates --help` explains the commands; this file covers
only what the CLI cannot tell you. A bare `splates` prints help; start the
server with `splates server`. `splates dev` is only for developing the splates
repository itself.

## The short version

Most of what follows fills in these steps. Hold to them even when you skip
the rest:

1. **Add a task before you look.** When a request may end in a code change,
   run `splates add <task> --goal "<what done means>"` first, then read and
   edit only in the worktree path it prints.
2. **Ask as a numbered list.** Every question for the user is a `1.` item
   ending at its `?`, as in Formats below.
3. **Keep heavy work off the machine.** The person works on it beside many
   other agents, so do exactly this:
   - Never run the whole suite yourself (a bare `bun test` or `npm test`),
     however small or quick: it runs only in the merge gate. When the user
     asks for every test to pass, that ask is not their Allow: run the test
     files the change reaches and end with a run-command card for the whole
     suite.
   - Check a change with `bun test --changed` or explicit test files. In
     splates's own repo: `splates dev test --changed`, `--since main` or
     file paths, and `splates dev fix` once per step (`--code-only` skips scry's model calls).
   - An unscoped `splates dev test` or `dev premerge`, or a scoped run
     reaching half the test files, is refused (`not_granted`) until the
     person allows one run.
   - Heavy means a lot of CPU or memory: a full build,
     docker, a benchmark, a profile, a browser test run, anything that keeps
     cores busy for more than a minute. That, or any
     cost that is not compute (tokens, a write outside the repository, a
     deploy): ask with a run-command card
     (`## 🔐 Permission: run command: <why>`, the command alone on a line in
     backticks, the why under it), end your turn, and run it only on
     `[SPLATES RUN ALLOWED]`.
   - Run anything else without a card: an install, a typecheck, a lint, a
     test file or two, a commit, a short script.
4. **Commit as you go**, in plain messages with no attribution.
5. **Queue what you would offer.** Each follow-up you would suggest, or ask
   about, once the work lands, `splates task add` (or `defer`) before merging.
6. **Land with `splates merge --message "<what the base gains>"`**, run in
   the foreground, never in the background, then `cd`
   to the main tree it prints. When it fails, do what its stderr says.
7. **End with the report**, its title copied from Formats below, one line on
   what changed for the user, and nothing after it: the task is over, so the
   report asks nothing and offers nothing.

Every landing goes through `splates merge`: use git only to commit and to
finish a rebase left in progress (`git add`, `git rebase --continue`), then
merge again. A failed command prints `{reason}` JSON on stdout and what to do
on stderr: do what stderr says.

## Formats

The `splates server` page turns these shapes, and only these, into cards the
user taps. Copy them exactly, filling in the `<...>`.

A question, a lone one numbered `1.` too, the why indented under it and,
when the answer is one of a few, `- (a)` choices, your pick first and
marked `(chosen)`:

```markdown
1. Should the old upload endpoint stay for a release?
   It is still called by the mobile app's last version.
   - (a) Keep it for one release, logging each call (chosen)
   - (b) Remove it now
```

Never as `Should I keep the old endpoint? I'd lean yes.`, a bold line, or
your harness's own question tool: the page shows none of those as a card.
[references/questions.md](references/questions.md) has the rest.

After a merge, the task's last reply, a line on the change as the user
will meet it under the title:

```markdown
## ✅ Merged <task> onto <base>

Cards on a phone now drag on a long press. Restart `splates server` to pick it up.
```

After a remove, why it went after the colon:

```markdown
## 🛑 Removed <task>: superseded by a fix on main

The task set out to stop uploads retrying a 413.
```

When the work is blocked and only set aside for later, remove it with
`--reason blocked`, which asks why it stopped and what it waits on (a task
in another project as `--blocked-by webappwiz#404`), and report it
deferred, the blockers in short after the colon, not removed:

```markdown
## ⏸ Deferred <task>: waiting on #812 and your call on old clients

The task set out to stop uploads retrying a 413; it is back on the list.
```

When the work the conversation was for is over and no task merged, was
removed or deferred (a question you were asked to look into answered, a
setup step finished, an automation's run from a hook prompt, `[SPLATES EVENT
...]` or `[SPLATES SCHEDULE <n>]`), its last reply is a Done report, what came
of it after the colon, so the user sees the work is over and archives it. A
reply in a talk that carries on is no Done report:

```markdown
## ✅ Done: two merged tasks reviewed, nothing to fix

Both kept their tests; the notes needed no change.
```

Asking for a review is `## 🔍 Ready to merge <task> onto <base>`, with a
demo, a `Checks:` line and the last line `Reply "merge", or say what to
change.`: copy its whole shape from
[references/reporting.md](references/reporting.md) before sending one.

Work you add for the user to queue ends your reply with its queue card,
after any report (see [references/queue.md](references/queue.md), Asking
the user to queue):

```markdown
## 🔐 Permission: queue lane <n>: <name>

`splates lane queue <n>`

<A line on what the tasks add up to.>
```

Anything heavy that is not a scoped test run (a lot of CPU or memory: a full
build, docker, a benchmark, anything that keeps cores busy for more than a
minute) is asked with the run-command card: the command alone on the first
backticked line, and what it costs under it. End your turn after it; the
user's Allow sends `[SPLATES RUN ALLOWED]`, and only then do you run it.

```markdown
## 🔐 Permission: run command: build the web app

`bun run build`

Takes about two minutes.
```

Evals cost the user tokens, so only they start them. To ask for a run (in
a project whose `splates.config.ts` names `evals.list` and `evals.run`, as
splates's own does, its list naming the scenarios), end your reply with the
run card, the word after `run evals` naming the skill or suite: the
scenarios you picked, one `` - `id` `` item each, and optionally the
revision the change is judged against and how many times to run each cell
(`Repetitions: <n>`, to tell a change from noise). The page shows it with
the saved eval agents and, when the project prints a plan, what the run
costs at most; it runs in your worktree, and its Run button is the user's:
never run the eval command yourself.

```markdown
## 🔐 Permission: run evals splates: the resource scenarios

Checks the new wording of the scoped-tests rule.

- `resources/focused-tests`
- `resources/whole-suite`

Baseline: `main`
Repetitions: 3
```

In another project, evals from any framework show on the Evals page when the
project's `splates.config.ts` names `evals: { results: "<dir>" }` and a
reporter writes a `batch.json` and `results.jsonl` there in the
`splates-evals/1` format, documented in `docs/evals.md` of the splates
repository (https://github.com/stringsync/splates), with an example reporter.
When asked, write that reporter for the project's framework, or for Inspect AI
run `splates evals import inspect <log> <batch-dir>` in its place, and the
`list` and `run` commands the docs lay out, for run cards to start it.

Once the run is done, splates tells you with `[SPLATES EVALS DONE <batch>]`
and the report condensed: each scenario's pass rate on each agent, and for
each run that failed, the checks that failed, the judge's reason and the
reply, with the runs that errored listed apart. Improving a scenario is a
loop of run, diagnose, fix one thing, rerun and log, which
[evals.md](references/evals.md) lays out: read it before the first run card
of a task and when the run is done.

## In every conversation

These ways hold in every conversation in a splates repository, with a task
open or not: a design talk, or a question answered from the main tree, asks,
proposes and reports as a task does. A task adds only its record in
`SPLATES.md`.

Only the person runs `splates queue pause` or `splates queue resume`, which
pause or resume automatic starts across the server, as Pause on the Queue
page does. Running agents finish, and the person can still start their own.
Both take `--dev <url>` (otherwise `SPLATES_DEV`) to reach the server.

Only the person ships, too: `splates ship [<project>]` publishes a project
under their own npm sign-in, and splates refuses it, `--plan` included, to an
agent. Never run `npm login` or `npm publish` either. When you think a
release is due (a fix on the base that users are waiting on), end your reply
with a run-command card naming `splates ship <project>`, the why under it
saying what the release carries; its Ship button opens the plan, where the
person picks patch, minor or major and approves, which starts the ship on
`splates server`, so on `[SPLATES RUN ALLOWED]` it is already running: carry
on without running it. A merge is never a release.

A ship cascades: once a package is on npm, splates queues a bump task in
each registered project that depends on it, to move its pins to the new
versions. Take it as `[SPLATES TASK #N]` says: move every pin it names in
each `package.json`, `bun install`, run each command it lists after the
install (such as `splates refresh`) and commit what it changes, fix what
breaks, and land it through the merge gate. Publish nothing, even when the project ships too: the cascade
ships it once your task merges, at a patch unless the person changes it.
When your fixes change your project's own public API, ask the person whether
its release should be minor or major instead, for them to change in the
cascade. The cascade waits on your project, and on
those after it, while the task is open, so when a break is past fixing, ask
the person rather than remove the task, and say in the question that the
ship waits on it. A removed bump task, or a failed ship, stops the cascade
at that project until the person retries it with `splates ship --retry
<project>`, which ships it again or queues a new bump task, or drops it from
the run with `splates ship --drop <project>`, or ends the whole run with
`splates ship --abandon` (what shipped stays published): commands of theirs, never yours.

```markdown
## 🔐 Permission: run command: ship webappwiz

`splates ship webappwiz`

The log rotation fix is on main and unreleased; mdom and vexml take it next.
```

Agents may add empty lanes and remove empty lanes. Removing a lane containing
tasks needs the person's remove-lane permission card (see
[reporting.md](references/reporting.md)). Backlog is permanent.

You never change the queue, which splates refuses an agent: when a
conversation asks for several tasks, add them as a lane, and when the user
asks you to queue work, add it; either way, end your reply with its queue
card for the user to queue it now or later.

## Directives

A prompt that has `[SPLATES ...]` comes from the `splates server` page or
from splates itself, and asks what the table says. A row that names a file
asks you to read it as Reference files says. A few directives have no row
because the page sends them rarely: `[SPLATES SETUP <step>]` ([setup.md](references/setup.md)),
`[SPLATES DEFER]` ([queue.md](references/queue.md), Deferring), `[SPLATES DEMO <task> <point>]` ([demos.md](references/demos.md)),
`[SPLATES UNMERGE <task>]` ([merge.md](references/merge.md), Unmerging),
`[SPLATES EVALS DONE <batch>]` ([evals.md](references/evals.md)), and hook
prompts `[SPLATES EVENT ...]` and `[SPLATES SCHEDULE <n>]`, where you do what
the prompt after it asks and end with the Done report in Formats above,
unless your last reply is already a Merged, Removed or Deferred report. Read
the file when one arrives.

| Directive                           | What it asks                                                                                                                                      | What to do                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[SPLATES TASK #N]`                 | Take queued task N                                                                                                                                | `splates task show N` prints what is asked; if it names another task that took it, tell the user rather than start on it. Otherwise take it now, so no other agent starts on it: `splates add <slug> --task N`, under the `slug:` it prints when it has one, then, when `splates task show N` says `groomed: no`, groom it as [groom.md](references/groom.md) says under Grooming a task you start; then [queue.md](references/queue.md), Taking a queued task |
| `[SPLATES TASK <task>]`             | Resume a task                                                                                                                                     | `splates claim <task>`, read its `SPLATES.md`, and carry on from where it stands                                                                                                                                                                                                                                                                                                                                                                               |
| `[SPLATES MERGE]`                   | The user approved your review, from the Ready to merge card                                                                                       | As for a reply of "merge": [merge.md](references/merge.md), Merge or review                                                                                                                                                                                                                                                                                                                                                                                    |
| `[SPLATES APPROVE]`                 | The user approved your proposal, from its card, with any answers after it                                                                         | As for a reply of "approve": [proposing.md](references/proposing.md)                                                                                                                                                                                                                                                                                                                                                                                           |
| `[SPLATES GROOM #N]` | You are the project's groomer: organize backlog task N and mark it ready, never doing it. Once the backlog is empty, `[SPLATES SORT ...]` follows in the same conversation to find lanes for the Untriaged tasks it names | [groom.md](references/groom.md), which covers both, Sorting Untriaged included |
| `[SPLATES LANE N]` | Work down lane N (`untriaged` places the Untriaged tasks in lanes first) | `splates lane show N` prints the steps and whether the next is blocked; [queue.md](references/queue.md) |
| `[SPLATES RUN ALLOWED]`             | The user allowed the command your run-command card asked to run | Run that command now, as the card asked, then carry on |
| `[SPLATES RUN DENIED]`              | The user turned down the command your run-command card asked to run | Do not run it: carry on without it, or ask what to do instead |
| `[SPLATES RETRIED]`                 | The user granted your task another round of merge attempts, which the page has run `splates retry` for | Merge again, as [merge.md](references/merge.md) says under When a merge fails |
| `[SPLATES GRANTED]`                 | The user gave the reach your grant card asked for, which the page has granted | Carry on with the work in the other project it was for, as [projects.md](references/projects.md) says |
| `[SPLATES GRANT DENIED]`            | The user turned down the reach your grant card asked for | Nothing was granted: carry on without that reach, or ask what to do instead |
| `[SPLATES CHECKPOINT]`              | Bring `SPLATES.md` up to date and stop, as before a restart                                                                                       | [checkpoint.md](references/checkpoint.md)                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `[SPLATES RESUME]`                  | Carry on from where `SPLATES.md` says you stopped                                                                                                 | [checkpoint.md](references/checkpoint.md)                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `[SPLATES RECONNECT]`               | A lost connection cut your last turn short, and splates, once it is back, or the user asks you to carry on                                        | Your last step may have finished, half finished, or never started: check what it left (`git status`, `git log`, what its command was to change) before running it again. Then carry on with the work as though nothing had come: no report of the interruption, no questions about it and no stop                                                                                                                                                              |

## Reference files

Some of this skill sits in files beside it, each read only when its moment
comes: a directive whose row names it, or one of the moments below. Then read
the whole file before going on, even mid-task, and again in a later session,
which remembers none of it. These come up in most tasks:

- Before `splates merge`, or when it stops on anything but success, and
  before asking the user for a review: [references/merge.md](references/merge.md),
  merging or asking for a review, and what to do when a merge fails.
- Before replying with a task outcome (merged, removed, waiting on answers
  or ready for review): [references/reporting.md](references/reporting.md),
  the report formats in full, beyond those in Formats above.
- Before asking the user a question, in a task or not, after a reply, or
  when resuming a task with questions under `## Blocked`:
  [references/questions.md](references/questions.md), asking, reading
  answers and, in a task, keeping Blocked current. Also read it when you
  cannot go on without the user.
- Before `splates task add` or `splates task defer`, `splates lane add`,
  a queue card, or `splates task update` or `splates lane update` with
  `--lane`, `--position` or `--blocked-by`: [references/queue.md](references/queue.md), writing,
  deferring, linking, placing and ordering tasks.
- Before `splates task add` or `--ready`, when you take a task `splates task
show` says is `groomed: no`, and as the project's groomer:
  [references/groom.md](references/groom.md), everything grooming checks
  and who does it when.
- Before making a demo, starting a server for the user to try, attaching
  screenshots or recordings, or creating or managing an artifact:
  [references/demos.md](references/demos.md), demos, hosting and artifacts.
- When the user asks what you think, or approves a proposal:
  [references/proposing.md](references/proposing.md).

These only when their moment comes:

- Before reading or changing a project's `splates.config.ts`, or when the
  user asks what splates can be set to do: [references/config.md](references/config.md),
  every option, its default and what it is for.
- When the user asks to set splates up on this machine, or any part of it
  (agents, remote access, workers, a tunnel of their
  own, dictation): [references/setup.md](references/setup.md),
  one step at a time.
- When your work needs a secret only the user can get, such as an API token:
  [references/creds.md](references/creds.md).
- When work here needs another splates project, or you run `splates
--project`, or `[SPLATES GRANTED]` comes: [references/projects.md](references/projects.md),
queuing work there and asking for a grant.
- When `splates artifact add` stops on `too_large`, or the user asks about
  artifact space: [references/artifacts.md](references/artifacts.md).
- When an eval scenario is not passing, in the splates repository, or
  `[SPLATES EVALS DONE <batch>]` comes: [references/evals.md](references/evals.md),
  the loop that improves it.
- When the user asks to move splates's tasks, conversations or settings to
  another machine or project, or to back them up or restore them:
  [references/transfer.md](references/transfer.md).

## Workflow

1. **Start before you look.** When a request may end in a code change,
   `splates add <task> --goal "<what done means>"` before reading any code,
   the Goal one or two lines as you understand it so far, and investigate in
   its worktree: the main tree changes under you as other tasks land, a worktree
   does not. A question that only needs an answer stays in the main tree,
   asking and answering as In every conversation says.
   `splates claim <task>` resumes a task instead. When the request is a queued task,
   take it as `[SPLATES TASK #N]` says under Directives, and for any other
   directive, do what its row says. Pass `--base <branch>` only when invoked
   with a branch (`/splates feature/auth`) or the user names one; otherwise
   leave it off, whatever branch is checked out. Once `splates add` succeeds, the `splates server` page shows
   it in your conversation as splates's own line, the Goal on its task, so say
   nothing about adding it. When your harness asks right after for a word on
   what you are doing, say in one line what you will do next, without the
   task's name or Goal, which that line already shows.
2. **Plan.** Once you know what done means, sharpen the Goal in `SPLATES.md`
   before touching code, and when the work will take several commits, list
   them under `## Next` (see SPLATES.md below).
3. **Check for overlap.** Read `splates list --files`: each task's Goal and
   the files it has changed so far. Overlap is normal: work alongside, and
   resolve any conflict as the rebase brings it, without waiting on the
   other task or noting it anywhere. If it is doing the opposite of what you
   were asked, ask the user instead (see [Questions](references/questions.md)).
   `splates add` warns when file paths in the Goal or the first changes overlap
   open tasks. Coordinate those files or queue dependent work with `--blocked-by`.
   While the server runs, `splates list` and `show` name coming conflicts at
   committed branch tips, and a working agent hears a notice when one appears.
   These checks never rebase a worktree; commit in steps so they can see the work.
4. **Work.** Commit each step with git as you go, and check off any under
   `## Next` as you commit it; splates never commits for you. When something outside
   your Goal comes up (a bug next door, a follow-up, a reply that widens the
   task), `splates task add` or `defer` it from your worktree and move on,
   so the task stays one coherent change; the conversation shows what you
   queued (see [queue.md](references/queue.md), Queueing tasks). A snag on the way, such as a lost
   connection, a conflict or a retry, is no task to queue; `splates merge` queues one
   itself for each test that failed its gate. Ask the user each call their
   answer would change, and make the rest yourself (see [Questions](references/questions.md)), bringing
   `## Blocked` up to date before each step. A subagent of your harness that may
   change code works in your worktree, with no task of its own: tell it the
   path, to commit there, to run no `splates` command that adds, claims,
   merges or removes a task, and to list in its reply any call the user
   may need to settle, which you treat as your own. Subagents at work at
   once share the tree, so give each its own files. Keep off heavy work on the host
   machine the person works on, as step 3 of the short version says: test a
   small portion, and ask with a run-command card before anything else
   heavy. A subagent is bound by the same rule and asks through you.
5. **Land.** Once every step under `## Next` (including any user review) and
   every question under `## Blocked` is checked, the task is ready to merge:
   `splates task add` any step you will not do, then check it off, `splates task add` or
   `defer` each follow-up you would otherwise offer or ask about once it
   lands (see [Reporting](references/reporting.md)), and `splates merge --message
"<message>"` (see Committing), or ask for a review first (see
   [merge.md](references/merge.md)). On failure, do what stderr says (after a failed gate the worktree holds the
   tested tree: reproduce the failure there first) and merge again, with the
   real message, since a merge whose gate passes this time lands. A successful
   merge deletes your worktree: `cd` to the main tree it prints before
   running anything else. When merge stops on anything but success, read
   [merge.md](references/merge.md), When a merge fails.
6. **Report.** Reply with the report from Formats above: after a merge,
   `## ✅ Merged <task> onto <base>`, which `splates merge` prints last to
   copy, then a line on what changed for the user, and a queue card after it
   for any lane you added. That is the whole reply: each question or offer
   you would add to it is a task you queued in step 5.

**Clean up every task you start.** A task ends in a merge or a remove, never
left behind; one waiting on the user's answers is not done, so leave it for
`splates claim`. When investigating shows there is nothing to change, the
work is moot, or it is better redone against current trunk,
`cd "$(splates path)"` and `splates remove <task> --reason <why>`, which
removes the board tasks it took too. Only `--reason blocked` puts them back
on the list, out of the queue and any queued lane until the user queues
them again. Before removing work to redo, add replacement tasks with what
you learned. The reason is `nothing`
(nothing to change), `moot`, `superseded` (done some other way), `redo`
(better redone against current trunk) or `blocked` (set aside until other work
lands, a person's answer or something outside splates, each named as its
refusal says: report it as Deferred); the Stats page counts them.

`wait` ends on `removed` (landed or dropped: check for overlap again),
waits on a person (the other task's questions are open: tell the user you
are blocked on it),
or a broken status (`wait` once more, then ask). Judge a task by its status,
never its lease: `stale` is normal for one mid-edit.

## SPLATES.md

Your session can die at any moment; `SPLATES.md` is what lets a stranger
`splates claim` the task and continue. Size it to the task: a few lines for a
small change, a full record for a long one.

```markdown
# <task>

## Goal

One or two lines on what done means.

## Next

- [ ] for work of several commits: every step you can foresee,
      roughly one commit each, checked off as it lands
- [ ] also keep a step for a checkpoint or user review when needed

## Verification

What you checked and what it showed: each check run, and, where the change
is something to see, screenshots or a recording you `splates attach`ed,
inline as `![what](/abs/path.png)`.

## Demo

How to set up a demo of the change, in words, and what the user should see
with it in.

## Blocked

- [ ] questions the user must answer before the task merges

## Outcome

What came of it, written just before you merge: a summary of what changed
and any pivot from the original Goal, then `### Demo` (how to trigger it)
and `### Verification` (checks run, screenshots as `![what](/abs/path.png)`).
```

Keep the summary quick to read, since the merged card shows it first and the
user reads it to grasp what landed: one to three plain sentences, or up to
five short bullets of one fact each. Say what the user can now do or what
behavior changed. Leave out file names, internals and how it was checked, and
never run a string of code-formatted terms together in one paragraph. Detail
that matters, such as lookup order, migration behavior or a check against the
real tool, goes under `### Demo` or `### Verification`.

The Goal's first line is what other agents see of your task in `splates list
--files`, so make it say what you are changing. `splates add` writes the
Goal; for a change of one commit, leave out `## Next` unless a checkpoint
or user review needs a step, since the Goal says it all otherwise, and the
page shows the Goal as what you are doing. Keep the rest current as you go, not at the end: check steps off as they land; the git log records them. Run `splates show <task>` after writing it to check
the shape. It is excluded from git, so leave it out of commit messages.

The page's task dialog shows `## Verification`, for an open task and once it
has finished, as the evidence: what you checked and its screenshots, with,
when there is a `## Demo`, Demo with an agent among its actions, which starts
a conversation for an agent to show the change. The merged card shows `## Outcome`, kept
with the merge record, and when it has a `### Demo`, a Demo it button
that asks the agent of the conversation, you, for one: write it last, before `splates merge`. Fill in Verification before you merge:
it is what the user reads instead of a demo. Write `## Demo` for any change the user can see or try, and leave it
out otherwise. Keep it to what an agent needs to set the demo up later
against the code of the day (what to run, the throwaway data to make, where
to open it) and what it shows, never a script to keep in step with the
code.

## Committing

Plain, human-style messages with **no attribution**: no `Co-authored-by:`,
no "Generated with", no agent or model names, no `--author`. Wanting many
more than 5 commits means the task wants splitting.

`splates merge --message "<message>"` squashes the task to one commit before
it lands: describe the net change, what the base gains, not the path you
took.
