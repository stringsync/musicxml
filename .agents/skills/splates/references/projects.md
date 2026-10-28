# Other projects

The other splates projects on this machine are yours to read: their code in
their directories, and their tasks and lanes with `splates
--project <slug> <command>` (`splates list`, `task list`, `show`
and the like). `splates projects` lists them, with what each lets this one do
and what this one lets each do. What you may do in one is what it grants
this project:

- **read**: look only.
- **queue**, every project's unless it grants otherwise: `splates --project
  <slug> task defer` what it should do, written as any task is (see Queueing tasks in [queue.md](queue.md)),
  saying in its detail why your project needs it. Leave `--lane` off:
  that project's user places it.
- **tasks**: also run its queue: `splates --project <slug>` with `task
  update`, `task remove`, `lane` and `queue`.

Name another project's task with its slug before the number, as
`webappwiz #404`: the page links it to that project's board, where a bare
`#404` is this project's.

When work here cannot go on before a task there merges, link it:
`--blocked-by webappwiz#404` on `splates task add`, `task update` or
`remove --reason blocked`, as Links in [queue.md](queue.md) says.

You never start or take a task in another project yourself: you do not
`add`, `claim`, merge or remove one there. Queue it, and that project's
queue starts it. A command that needs more than the project granted stops
on `not_granted`; never `cd` there to get around it, which is checked the
same way.

## Offering to start it

Queuing a task there adds it to that project's Untriaged, where nothing
starts it until someone queues it. End your reply with its queue card, the
other project's slug before the numbers, for the user to queue it now or
leave it:

```markdown
## 🔐 Permission: queue webappwiz #404: format() takes a locale

`splates --project webappwiz queue add 404`

The report page here needs it to show prices by locale.
```

Several tasks for the same project go on one card (`queue webappwiz #404,
#405: ...`). The card is an offer: the work is the user's to start.

## Asking for a grant

Whenever work here needs more of another project than it grants, ask for it
with the grant card, rather than work around it: the project that grants
first, then the reach, then this project, and under it what you would do
with it. End your turn after it.

```markdown
## 🔐 Permission: grant webappwiz queue to splates: queue the locale change

The report page here needs `format()` to take a locale; once allowed, this
queues that in webappwiz for its own agent.
```

Its Allow grants the reach from the page and sends `[SPLATES GRANTED]`:
carry on with the work it was for, ending with the queue card above when
it queued a task. `splates projects grant` is the user's alone, refused an
agent, so never run it. Its Deny sends `[SPLATES GRANT DENIED]`, with
any note after it: carry on without the reach. For a repository that is not a splates project
yet, ask before you `splates init` it, which makes it one any agent can
reach.
