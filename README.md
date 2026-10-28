# Musical Dice

A musical dice game inspired by Mozart’s _Musikalisches Würfelspiel_, with **twelve original minuetti composed by Guillermo Brachetta**.

[Play Musical Dice](https://new-musical-dice.vercel.app/)

Choose which minuetti to include, generate a new combination, and listen as the grid follows the music. Each piece shares a harmonic structure, so its fragments can be combined with the corresponding fragments from the other pieces. You can explore the result without reading music or knowing how to compose.

The music in this application is Guillermo’s own, rather than music by Mozart. The historical game commonly attributed to Mozart provides the inspiration; its authorship is uncertain.

## Playing the game

- **Listen** to any of the twelve complete minuetti.
- **Choose** your source pieces using the switches beside the grid rows. At least two must remain included.
- **Randomise** to select one fragment from each of the twelve columns.
- **Play** the composition and follow the highlighted fragments, or click a cell to hear it individually.

Each fragment contains two measures. A complete composition has **24 measures**, with an eight-measure opening section and a sixteen-measure second section.

With all twelve minuetti included, there are **8,916,100,448,256 possible combinations**. Including fewer pieces changes that total: with _n_ included minuetti, the game can produce _n_¹² combinations.

### Save or restore a composition

The page address records both the included minuetti and the current combination. Copy or bookmark that address to return to the same composition; reloading preserves it too. Playback always starts with a user action.

You can also open **Restore a combination** and enter its number. That number refers to the currently included minuetti, ordered alphabetically, so use the same selection when restoring it manually.

## About the project

Musical Dice began as a vanilla JavaScript application. This repository rebuilds it with **Next.js, React, and TypeScript**, retaining the original MP3 recordings while redesigning the interface and audio playback.

The interface includes a responsive fragment grid, playback highlights, a live combination count, historical notes, an enlarged view of the historical game tables, and author and contact dialogs.

## Run locally

The commands below document the development setup. They do not grant reuse rights; see [Author and reuse](#author-and-reuse).

Use **Node.js 22** and npm. From the project directory:

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

For a production build:

```bash
npm run build
npm start
```

The application uses `next/font` to load Montserrat from Google Fonts during the build, so font downloads require internet access.

### Contact form configuration

The contact form uses EmailJS. To run it under your own account, replace the service ID, template ID, and public key in [`components/ContactModal.tsx`](components/ContactModal.tsx).

The EmailJS template expects these form fields:

| Field          | Value                  |
| -------------- | ---------------------- |
| `from_name`    | Sender’s name          |
| `from_email`   | Sender’s email address |
| `info_request` | Message                |

You can explore the game locally without configuring email delivery.

## Technical overview

| Technology               | Purpose                                            |
| ------------------------ | -------------------------------------------------- |
| Next.js App Router       | Page structure, rendering, and production builds   |
| React and TypeScript     | Interactive controls and application state         |
| Web Audio API            | Generated composition playback                     |
| Howler.js                | Complete-minuetto and individual-fragment previews |
| EmailJS                  | Contact form delivery                              |
| Bootstrap and custom CSS | Layout utilities and application styling           |
| Font Awesome             | Interface icons                                    |
| Montserrat               | Typography                                         |

### Audio playback

All twelve selected fragments are fetched and decoded before a composition starts. Their decoded samples are copied into **one continuous audio buffer**, which is played through a single audio source. Fragment boundaries are tracked by sample offset, and the grid follows the same audio clock. JavaScript callbacks do not start each subsequent fragment.

Two-millisecond fades smooth the copied samples at fragment edges. The source MP3 files and cached decoded buffers remain unchanged.

Recently decoded fragments are cached with a bounded size. Stopping, randomising, or changing selections invalidates the current playback run, including playback that is still loading. Switching to a preview stops the composition. Preview sounds are unloaded after use, and audio resources are released when the game unmounts.

### Combination numbering

Combinations are numbered from 1 to _n_¹². Each fragment’s source letter acts as a digit in base _n_, with included letters ordered alphabetically and column 1 as the most significant position. The same selection and number therefore reconstruct the same sequence.

### Project structure

```text
app/                  Page, layout, and global styles
components/           Game controls, navigation, dialogs, and content
lib/
  combinations.ts     Combination numbering and restoration
  sequence-player.ts  Audio loading, caching, assembly, and playback
public/assets/
  images/             Author portrait and historical imagery
  music/
    full/             Twelve original minuetti
    cells/            Individual fragment previews
    randomiser/       Fragments used in generated compositions
tests/                Audio and game-state regression tests
```

## Checks and tests

```bash
npm run lint
npm test
npm run build
```

The tests cover combination restoration, continuous-buffer assembly, caching, cancellation during loading, retry after failure, resource cleanup, preview switching, playback highlights, and the two-minuetto minimum.

Audio tests use a simulated audio context; they check scheduling and sample handling rather than judging how a transition sounds. Listening checks in the running application remain useful, especially across browsers and mobile devices.

## Author and reuse

Music and application by **Guillermo Brachetta**.

- [Website](https://www.gbrachetta.com/)
- [GitHub](https://github.com/GBrachetta/)

**Copyright © 2026 Guillermo Brachetta. All rights reserved.**

Prior written permission is required to reuse the original code, compositions, or recordings, including for non-commercial projects. Providing credit alone is not permission. Send requests to [brachetta@me.com](mailto:brachetta@me.com).

This is a source-available project, not an open-source release. Public visibility does not grant general reuse rights. Third-party materials retain their own licences, and applicable legal exceptions and hosting-platform permissions remain unaffected.

See [LICENSE](LICENSE) for the full copyright and permission notice.
