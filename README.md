# Musical Dice

A musical dice game inspired by the 18th-century _Musikalisches Würfelspiel_ attributed to Mozart, built around **twelve original minuetti composed by Guillermo Brachetta**.

[Play Musical Dice](https://new-musical-dice.vercel.app/)

All twelve pieces share the same harmonic structure and 24-measure form, so any two-measure fragment can follow the previous fragment from any of the other pieces.

## Playing the game

- **Listen** to any of the twelve complete minuetti.
- **Choose** which pieces to include using the row switches (at least two).
- **Randomise** (`R` on desktop) to pick one fragment from each of the twelve columns, or turn on **Select fragments manually** to pick them yourself.
- **Play** (`Space` on desktop) to hear the assembled minuetto as the grid follows along, or click any cell to preview a single fragment.

Each fragment is two measures long: four fragments form the eight-measure **Part A**, and eight fragments form the sixteen-measure **Part B**.

With all twelve minuetti included, there are **8,916,100,448,256** (12¹²) possible combinations; with _n_ included pieces, there are _n_¹².

### Saving or restoring a combination

The URL updates automatically with the included minuetti and combination number, so you can bookmark or share the page address to return to the exact same piece. You can also open **Restore a combination** and enter a number directly (numbers are indexed against the currently included minuetti in alphabetical order).

## About the project

Musical Dice started as a vanilla JavaScript project and was rebuilt here with **Next.js, React, and TypeScript**, keeping the original studio MP3 recordings while redesigning the interface and audio engine.

## Run locally

The commands below are for local development only; see [Author and reuse](#author-and-reuse) for licensing.

Requires **Node.js 22** and npm:

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). For a production build:

```bash
npm run build
npm start
```

### Contact form

The contact dialog uses EmailJS (`from_name`, `from_email`, and `info_request` fields on the `dice_game` template). To use your own account, update the service ID, template ID, and public key in [`components/ContactModal.tsx`](components/ContactModal.tsx). Everything else in the app works without configuring email.

## Technical overview

| Technology           | Purpose                                            |
| -------------------- | -------------------------------------------------- |
| Next.js App Router   | Routing, rendering, and production builds          |
| React and TypeScript | UI state and interactive controls                  |
| Web Audio API        | Gapless stitched playback for generated pieces     |
| Howler.js            | Full-minuetto and single-fragment previews         |
| EmailJS              | Contact form delivery                              |
| Custom CSS           | Layout, animations, and responsive styling         |
| Font Awesome         | Nine inline SVG icons                              |
| Montserrat           | Typography (`next/font`)                           |

### Audio playback

Before a generated composition starts, all twelve selected fragments are fetched, decoded, and copied into **a single continuous `AudioBuffer`** with 2 ms edge fades on the copied samples. Playback runs through one `AudioBufferSourceNode`, and the grid highlights track `AudioContext.currentTime` directly so transitions never drift or gap between MP3 files. Decoded buffers are cached with a bounded size and cleaned up on unmount.

### Combination numbering

Combinations are numbered from 1 to _n_¹². Each column acts as a digit in base _n_ (with included letters ordered alphabetically and column 01 as the most significant digit), allowing any combination to be converted to and from a single integer.

### Project structure

```text
app/                  Page, layout, and global styles
components/           Game workbench, grid, navigation, and modals
lib/
  combinations.ts     Base-n combination numbering and restoration
  sequence-player.ts  Web Audio loading, caching, assembly, and playback
public/assets/
  images/             Author portrait and historical tables
  music/
    full/             Twelve complete minuetti
    cells/            Individual fragment previews
    randomiser/       Trimmed fragments for stitched compositions
tests/                Unit tests for numbering, audio assembly, and game state
```

## Checks and tests

```bash
npm run lint
npm test
npm run build
```

## Author and reuse

Music and application by **Guillermo Brachetta**.

- [Website](https://www.gbrachetta.com/)
- [GitHub](https://github.com/GBrachetta/)

**Copyright © 2026 Guillermo Brachetta. All rights reserved.**

Prior written permission is required to reuse the original code, compositions, or recordings, including for non-commercial projects. Providing credit alone is not permission. Send requests to [brachetta@me.com](mailto:brachetta@me.com).

This is a source-available repository, not an open-source release. Third-party dependencies retain their own licences. See [LICENSE](LICENSE) for the full notice.

Interface icons from [Font Awesome Free](https://fontawesome.com/), © Fonticons, Inc., licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
