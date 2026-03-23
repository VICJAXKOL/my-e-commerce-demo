import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const eslintArgs = [
  "./node_modules/eslint/bin/eslint.js",
  "--cache",
  "--cache-location",
  ".next/cache/eslint",
  ...(args.length > 0 ? args : ["."]),
];

const result = spawnSync(process.execPath, eslintArgs, {
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_OPTIONS: "--max-old-space-size=8192",
  },
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
