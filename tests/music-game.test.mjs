import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";

import ts from "typescript";

const compile = (file) =>
  ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
const gameSource = compile("../components/MusicGame.tsx");
const combinations = {};

vm.runInNewContext(compile("../lib/combinations.ts"), {
  exports: combinations,
});

function harness() {
  const hooks = [],
    sounds = [],
    sequences = [];

  let cursor = 0;

  class Howl {
    constructor(options) {
      this.options = options;
      sounds.push(this);
    }
    load() {}
    play() {}
    unload() {
      this.unloaded = true;
    }
  }
  class SequencePlayer {
    stop() {}
    async preload() {}
    async play(paths, callbacks) {
      sequences.push(callbacks);
      callbacks.onStart();
    }
  }
  const jsx = (type, props) => ({ props, type });
  const exports = {};
  const react = {
    startTransition: (callback) => callback(),
    useEffect() {},
    useRef(value) {
      return (hooks[cursor++] ??= { current: value });
    },
    useState(value) {
      const index = cursor++;

      if (!(index in hooks)) hooks[index] = value;

      return [
        hooks[index],
        (next) => {
          hooks[index] = typeof next === "function" ? next(hooks[index]) : next;
        },
      ];
    },
  };

  vm.runInNewContext(gameSource, {
    exports,
    require(name) {
      if (name === "react") return react;
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (name === "howler") return { Howl };
      if (name === "@/lib/sequence-player") return { SequencePlayer };
      if (name === "@/lib/combinations") return combinations;

      return { __esModule: true, default: name };
    },
  });

  function render() {
    cursor = 0;

    return exports.default();
  }

  function find(node, predicate) {
    if (!node || typeof node !== "object") return;
    if (predicate(node)) return node;

    for (const child of [node.props?.children].flat(Infinity)) {
      const match = find(child, predicate);

      if (match) return match;
    }
  }

  const library = () =>
    find(render(), (node) => node.type === "./MinuettoList").props;
  const grid = () =>
    find(render(), (node) => node.type === "@/components/AvailableGrid").props;
  const click = (id) =>
    find(render(), (node) => node.props?.id === id).props.onClick();
  const preview = (index) =>
    library().onMinuettoClick(library().minuetti[index]);

  return { click, find, grid, library, preview, render, sequences, sounds };
}

test("preview highlights wait for audible playback; stopping while loading rejects late callbacks", () => {
  const game = harness();

  game.preview(0);
  assert.equal(game.library().loadingMinuetto, "Minuetto A");
  assert.equal(game.library().playingMinuetto, null);
  const sound = game.sounds[0];

  game.preview(0);
  sound.options.onplay();
  sound.options.onloaderror();
  assert.ok(sound.unloaded);
  assert.equal(game.library().loadingMinuetto, null);
  assert.equal(game.library().playingMinuetto, null);
  assert.equal(
    game.find(game.render(), (node) => node.props?.role === "alert"),
    undefined,
  );
});

test("switching previews ignores old play, end and error callbacks", () => {
  const game = harness();

  game.preview(0);
  game.preview(1);
  const [old, current] = game.sounds;

  current.options.onplay();
  old.options.onplay();
  old.options.onend();
  old.options.onplayerror();
  assert.ok(old.unloaded);
  assert.equal(game.library().playingMinuetto, "Minuetto B");
  current.options.onend();
  assert.ok(current.unloaded);
  assert.equal(game.library().playingMinuetto, null);
});

test("cell previews highlight only after starting and clear after an error", () => {
  const game = harness();

  game.grid().onBarClick("d03");
  assert.equal(game.grid().playingBar, null);
  game.sounds[0].options.onplay();
  assert.equal(game.grid().playingBar, "d03");
  game.sounds[0].options.onplayerror();
  assert.equal(game.grid().playingBar, null);
  assert.ok(game.sounds[0].unloaded);
});

test("a preview cancels the composition and ignores its late highlight and completion", () => {
  const game = harness();

  game.click("btn-randomise");
  game.click("btn-play");
  const sequence = game.sequences[0];

  game.preview(0);
  game.sounds[0].options.onplay();
  sequence.onFragment(4);
  sequence.onEnd();
  assert.equal(game.library().playingMinuetto, "Minuetto A");
  assert.equal(game.grid().playingBar, null);
  assert.equal(game.grid().isPlayingSequence, false);
});

test("selection changes retain the two-row minimum and twelve valid fragments", () => {
  const game = harness();

  for (const letter of "abcdefghij") game.grid().onToggle(letter);
  game.grid().onToggle("k");
  const grid = game.grid();

  assert.equal(grid.alphabet.join(""), "KL");
  assert.equal(grid.randomIDs.length, 12);
  assert.ok(grid.randomIDs.every((id) => /^[kl]/.test(id)));
});
