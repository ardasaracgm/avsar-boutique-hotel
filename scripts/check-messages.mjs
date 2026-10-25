// Fails if any locale file is missing a key that another locale has (or has an empty string).
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = join(import.meta.dirname, "..", "messages");
const files = readdirSync(dir).filter((f) => f.endsWith(".json"));

const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" ? flatten(v, `${prefix}${k}.`) : [[`${prefix}${k}`, v]],
  );

const maps = Object.fromEntries(
  files.map((f) => [f.replace(".json", ""), new Map(flatten(JSON.parse(readFileSync(join(dir, f), "utf8"))))]),
);
const allKeys = new Set(Object.values(maps).flatMap((m) => [...m.keys()]));

let errors = 0;
for (const [locale, map] of Object.entries(maps)) {
  for (const key of allKeys) {
    if (!map.has(key)) {
      console.error(`✗ ${locale}: missing "${key}"`);
      errors++;
    } else if (typeof map.get(key) === "string" && map.get(key).trim() === "") {
      console.error(`✗ ${locale}: empty "${key}"`);
      errors++;
    }
  }
}

if (errors) {
  console.error(`\n${errors} problem(s) in messages/`);
  process.exit(1);
}
console.log(`✓ ${files.length} locales, ${allKeys.size} keys each`);
