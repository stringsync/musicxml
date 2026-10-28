#!/usr/bin/env bun
import { NodePs } from 'webappwiz/system';
import { mxl } from './mxl';

const ps = new NodePs();
// Repository commands run from the workspace root, wherever mxl is invoked.
ps.cd(`${import.meta.dir}/../..`);

await mxl.run({ ps });
