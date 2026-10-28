// splates runs through `bunx @stringsync/splates`, so it is not a dependency here.
// Keep the config import-free; splates validates it when loading it.
export default {
	// This repo's trunk is master, not splates's default of main.
	trunk: 'master',
	postCheckout: 'bun install',
	postRewrite: 'bun install',
	// The same checks CI runs.
	preMerge: './bin/mxl fix --check && ./bin/mxl test',
	on: { 'task.done': 'bun install' },
	// `mxl ship` requires a bump type, so `splates ship musicxml` publishes the next patch.
	ship: './bin/mxl ship patch',
};
