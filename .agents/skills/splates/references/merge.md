# Merging

## Merge or review

A task ready to merge has every step under `## Next` and every question under
`## Blocked` checked; `splates merge` refuses one that is not, and a review
is sent once all work and questions are done, with only its review step
left unchecked. Whether the user looks first is yours to decide:

- **Merge** work you verified yourself, its evidence under `## Verification`
  (see SPLATES.md in the skill). This is the default, and the usual end of a small change.
- **Ask for a review**, with a demo (see [Demos](demos.md)), when the change is invasive
  (it reworks how something the user relies on works, or touches much of the
  project) and above all when it is hard or impossible to reverse (a
  migration, data written, anything sent outside the repo), or when
  an unchecked step under `## Next` asks to show the user before merging.
  The demo is the user's chance to step in before it lands: their feedback decides whether it merges. Leave
  something to look at (step 1 of [When you cannot go on](questions.md#when-you-cannot-go-on)), send the Ready to
  merge report (see [Reporting](reporting.md)), which is the whole request, and end your turn.

For any review, keep an unchecked `- [ ] Show the user before merging`
step under `## Next` until the user approves it.

For a demo the user can open, read [demos.md](demos.md),
Hosting a demo, before starting its server.

When the user approves a review, by replying "merge" or with
`[SPLATES MERGE]`, `splates claim <task>`, check off the review step under
`## Next`, and merge. When they ask for changes, `splates claim <task>`,
add each as a step under `## Next`, and work through them as before. While a review waits,
every reply that ends your turn ends with the whole review report again,
brought up to date: the page shows its Ready to merge card only for a whole
report.

## Run merge in the foreground

Run `splates merge` as a plain foreground command, waiting on it until it
exits: never with your harness's background option, `&`, `nohup` or a
detached shell. The server sees a merge through the command your turn is
running, so one sent to the background looks like an agent that has gone idle
and the page cannot show the task as merging. A merge can take minutes while
the gate runs; wait it out, and use a long enough timeout rather than
backgrounding it.

## When a merge fails

A `tests_failed` or `timeout` leaves the worktree rebased onto the base commit
the gate ran on. When the base moved since your last rebase, a `tests_failed`
lists the commits that landed, each with the task it came from, those touching
the failing tests, what they import or your files first: read those before the
test, since a change that just landed is the likeliest cause. Then reproduce
the failure there (`bun test <paths>` on the failing files), fix, commit and
merge again.

Merges waiting for the gate at once are gated as one batch: the first to
go stacks the others' branches on its own, runs the gate once and lands
them all, so a merge that queued may land without a gate of its own. A
`tests_failed` from a batch says which tasks it was gated with and leaves
your branch rebased on the base alone; it is yours only when the failing
tests first fail with your commits in the stack, and the refusal then names
the stack commit to reproduce on when the files pass alone. The rest of a
failing batch is gated again without the culprit, charged nothing.

A gate that runs past its deadline is killed, and merge stops as `timeout`
without spending an attempt: merge again. The deadline is 3 minutes when
the gate's workers and the machine's load fit its cores, and up to 6 when
they oversubscribe them, so a slow gate under load finishes once rather
than being killed into the same load again. An existing Git `index.lock`
stops merge as `blocked` without spending an attempt. Wait for its owner to finish and merge again; never delete a lock
held by a live operation. A failed rebase with no unmerged paths is
`merge_failed`, not a content `conflict`.

Each `merge_failed` spends one of the task's merge attempts. A `conflict`
spends none of them: conflicts have their own larger budget,
`mergeConflictCount` (10), and run out to `budget_exhausted` the same way.
The merge after a conflict waits ahead of the line, so merge again as soon
as it is resolved.
A `tests_failed` spends one only when the failing test files passed on the
exact base commit and failed again with the task, and the failure repeats the
last: the same base commit, or the same failing tests on any base. A failure
against a base you were never gated on is new information and spends none. Trunk-red and environment
failures hold the merge without charging; fix what the output names before
retrying. Bun JUnit reports enable selective attribution; missing reports,
unsupported runners, and inconclusive retests hold without charging. A flake
can land only after the complete gate passes again. Conflicts are expected: resolve them and say
nothing of them, in `SPLATES.md`, a report or a task. Write what each
`tests_failed` or `merge_failed` failed on under the `## Next` step it concerns
when needed to resume it; otherwise the conversation and commits hold it.
When `merge` stops on `budget_exhausted`, ask the user for more attempts
with a run-command card naming `splates retry <task>`, which the page shows
as a retry card the user grants with a tap. Never run `splates retry`
yourself: the attempts are the user's to give, and the page runs it. Under
the command, a `- ` line per attempt on what it failed on (the check that
broke, the tree in the way, or that it conflicted), then one on what would
get it through, and end your turn:

```markdown
## 🔐 Permission: run command: more merge attempts for upload-413

`splates retry upload-413`

- Attempts 1 and 2 conflicted in `packages/web/app.tsx` with the merge card.
- Attempts 3 to 5 failed `uploads > retries a 413` against a trunk that moved.
- Rebasing once more onto the new upload client gets it through.
```

`[SPLATES RETRIED]` means the user granted them, from your card or from the
refused merge's Grant, so it may come before you ask: merge again. A Deny
(`[SPLATES RUN DENIED]`) means `splates remove <task> --reason redo` with a
task added for the redo, unless the user's note says otherwise.

## Unmerging

`[SPLATES UNMERGE <task>]` asks you to take merged `<task>` back off its
base, as the merged card's Unmerge sends once the user confirms; anything
they wrote in its dialog follows it, as their word on why or what to keep.
A merge lands as one commit, so undoing it is a revert, never a reset or a
rewrite of the base's history:

1. `splates add unmerge-<task> --goal "Revert <task> from <base>"`, then
   `splates show <task>` for its base and the commit it landed as.
2. Check that it can be undone before you revert anything:
   - what landed since (`git log <commit>..<base>`) and touches the same
     files or calls what it added, which a revert would break or conflict
     with;
   - whether it went out in a release (`git tag --contains <commit>`, or a
     ship since), which a revert takes out of the next one but never
     unpublishes;
   - whether it did anything outside the code that the revert leaves done:
     a migration that ran, data written or reshaped, state or settings on
     the machine, anything sent to another service.
3. When all of it is clear, `git revert --no-edit <commit>` in the worktree,
   run the project's checks, commit, and land it with
   `splates merge --message "<task>'s change comes back out: <why>"`; then
   report it as any merge, saying in its line what is gone again.
4. When any of it is not, revert nothing yet: ask, a question saying what
   would stay done or break and the choices you see (revert with the work
   after it adjusted, revert only part, or undo it by hand with a forward
   fix), and go on from the answer. A later task that builds on it is one
   to name, never to revert along with it unasked.
