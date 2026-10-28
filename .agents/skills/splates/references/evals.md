# Improving through evals

In the splates repository, an eval scenario that is not passing is worked
in a loop, one scenario to a task, until it passes or stops gaining. Keep
to the one scenario: anything else you notice on the way goes in a line
under `## Notes` in `SPLATES.md`, never into a task, a lane or another fix.

## The loop

1. **Run.** Ask with the run card (Formats in the skill): the one scenario
   and `Repetitions: 3`, since one run cannot tell a fix from luck, and no
   `Baseline:` yet, since nothing has changed. Its pass rate is where the
   loop starts. End your turn.
2. **Diagnose.** When `[SPLATES EVALS DONE <batch>]` comes, open each run
   that failed with `splates dev eval show <run>`, which prints every step
   the agent took, and label it by what went wrong:
   - **harness**: the run errored, or the sandbox, the seed or the agent's
     launch broke. A run listed under Errors is always this one.
   - **scenario**: a check misreads an outcome the skill allows, the
     message coaches the answer or asks against the skill, or the seed no
     longer matches how splates works.
   - **judge**: the judge's reason argues against its own verdict, or holds
     the agent to something the rubric and the skill never ask.
   - **skill**: the agent did what the skill as written led it to, or
     missed something the skill says too faintly or not at all.
3. **Fix one thing**: the label most of the failures share, in its own
   layer. Harness in `evals/skill/*.ts`, scenario in
   `evals/skill/scenarios/`, judge in the scenario's rubric, skill in
   `skills/splates/`. Never special-case the scenario in the skill: change
   what any agent in that moment would need to read. Commit it.
4. **Rerun**: the same run card, now with `Baseline:` the commit your task
   branched from. A harness, scenario or judge fix changes both columns,
   since only the skill differs between them; a skill fix should move the
   current column alone.
5. **Log the round** as a row under `## Rounds` in `SPLATES.md`:

   ```markdown
   ## Rounds

   | Round | Label | Change | Current | Baseline |
   | ----- | ----- | ------ | ------- | -------- |
   | 1 | skill | Directive table says to claim before reading | 1/3 | 0/3 |
   ```

   Keep the change when the current column gained; otherwise revert its
   commit and try the next most likely cause.

On each `[SPLATES EVALS DONE]`, reply with the round's row, the label of
each failed run, the one change you made, and the run card for the rerun,
asking nothing else: the user started the loop and only taps Run.

## Stopping

Stop when the scenario passes every repetition on each agent, or after
three rounds in a row with no gain. Then merge the changes you kept, or
remove the task as `nothing` when you kept none, and report the rate before
and after under the Merged or Removed title.
