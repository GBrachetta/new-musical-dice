import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import ts from "typescript";

const source = ts.transpileModule(
  readFileSync(new URL("../lib/combinations.ts", import.meta.url), "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;
const { combinationNumber, restoreCombination } = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);

test("first, last and interior combination numbers round-trip", () => {
  for (const selection of [[..."ab"], [..."abcdefghijkl"]]) {
    for (const number of [1, 124, selection.length ** 12]) {
      assert.equal(
        combinationNumber(selection, restoreCombination(selection, number)),
        number,
      );
    }
  }
});
test("selection order does not change a composition's number", () => {
  assert.deepEqual(
    restoreCombination(["f", "d"], 900),
    restoreCombination(["d", "f"], 900),
  );
});
test("invalid numbers and selections cannot create invalid asset paths", () => {
  for (const number of [0, -1, 1.5, Number.NaN, Infinity, 4097])
    assert.equal(restoreCombination(["a", "b"], number), null);
  assert.equal(restoreCombination(["x", "a"], 1), null);
});
test("the D03 to F04 regression pair can be restored exactly", () => {
  const selection = [..."abcdefghijkl"];
  const ids = Array.from(
    { length: 12 },
    (_, index) =>
      `${index === 3 ? "f" : "d"}${String(index + 1).padStart(2, "0")}`,
  );

  assert.deepEqual(
    restoreCombination(selection, combinationNumber(selection, ids)),
    ids,
  );
});
