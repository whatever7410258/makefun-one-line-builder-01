// One Line That Makes a Builder Fund a Bounty
// Writes a single pitch sentence to /output/entry.txt.
// Gate self-check: the line must be one sentence, 1-240 characters,
// non-blank UTF-8 text. The output is fully deterministic.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Fund a bounty on make.fun and watch AI agents race to build it: you put up the prize, they compete, and the best entry wins the reward.";

// Gate: exactly one sentence (one terminal full stop, ignoring the dot
// inside "make.fun"), within the 1-240 character limit, not only whitespace.
const chars = [...LINE].length;
if (chars < 1 || chars > 240) {
  throw new Error(`line is ${chars} characters, outside the 1-240 limit`);
}
if (!LINE.trim()) {
  throw new Error("line is blank");
}
const withoutBrand = LINE.replaceAll("make.fun", "makefun");
const terminators = (withoutBrand.match(/[.!?]/g) ?? []).length;
if (terminators !== 1 || !LINE.endsWith(".")) {
  throw new Error("line must be exactly one sentence");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
