import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const paths = ["studio/schema.json", "lib/sanity/types.generated.ts"];
const read = async (path: string) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8").catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
const before = await Promise.all(paths.map(read));
const result = spawnSync("npm", ["run", "sanity:typegen"], {
  cwd: root,
  stdio: "inherit",
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
const after = await Promise.all(paths.map(read));
const stale = paths.filter(
  (_, index) => before[index] === null || before[index] !== after[index],
);
if (stale.length) {
  console.error(
    `Stale Sanity generated files: ${stale.join(", ")}. Commit the regenerated output.`,
  );
  process.exitCode = 1;
}
