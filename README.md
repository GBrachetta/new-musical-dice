# Musical Dice

**Musical Dice** is a web application inspired by Wolfgang Amadeus Mozart's famous **Musikalisches Würfelspiel** (Musical Dice Game).

The application provides a modern interactive version of the game, allowing users to select which minuetti to include, generate a random 12-fragment (24-measure) sequence, and listen to the resulting composition.

The project was originally developed as a vanilla JavaScript application and has been migrated to **Next.js, React, and TypeScript** while preserving the original musical assets and functionality with a redesigned interface.

## Features

- Listen to all 12 original minuetti individually.
- Select which minuetti should be included in the randomisation.
- Randomly generate a 12-fragment (24-measure) composition.
- Listen to individual musical cells.
- Play the complete generated composition sequentially.
- Stop and replay the generated composition.
- Visual feedback for:
  - Selected cells
  - Currently playing cells
  - Currently playing minuetti
  - Disabled cells while the composition is playing
- Responsive layout for desktop and mobile devices.
- Sticky navigation with an active-section indicator.
- About Me modal.
- Contact form with email delivery through EmailJS.
- Smooth scrolling navigation.
- Back-to-top button.
- Responsive Bootstrap-based layout.

## Technology

The application is built with:

- **Next.js** — React framework using the App Router.
- **React** — Component-based user interface.
- **TypeScript** — Type-safe application code.
- **Howler.js** — Original-minuetto and individual-fragment previews.
- **Web Audio API** — Continuous-buffer composition playback.
- **EmailJS** — Contact form email delivery.
- **Bootstrap 4.6.2** — Responsive layout and components.
- **Font Awesome** — Icons.
- **Montserrat** — Application typography.

## Project Structure

```text
MUSICAL-DICE/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── AboutModal.tsx
│   ├── AboutSection.tsx
│   ├── AnimatedDisclosure.tsx
│   ├── AvailableGrid.tsx
│   ├── BackToTop.tsx
│   ├── ContactModal.tsx
│   ├── ContactSection.tsx
│   ├── HistoricalImage.tsx
│   ├── MinuettoList.tsx
│   ├── MusicGame.tsx
│   └── Navbar.tsx
│
├── lib/
│   ├── combinations.ts
│   └── sequence-player.ts
├── tests/
│
├── public/
│   └── assets/
│       ├── images/
│       └── music/
│           ├── cells/
│           ├── full/
│           └── randomiser/
│
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Audio sequencing

Generated compositions use the Web Audio API. All twelve MP3 fragments are
loaded and decoded before playback, then copied into one continuous playback buffer using
their decoded sample lengths. One audio source plays the whole composition. Grid highlights follow that same clock;
JavaScript end callbacks do not trigger the next fragment. Two-millisecond gain
ramps smooth waveform discontinuities at fragment edges without shifting their
start times or modifying the files. Original minuetti
and individual-cell previews continue to use Howler.js.

Stopping, randomising, or changing selections cancels the current run, including
pending playback. Recently decoded fragments are cached with a bounded size,
and audio resources are released when the game unmounts. The MP3 assets are
unchanged.

Run `npm test` for scheduling, caching, cancellation, retry, and cleanup tests.
These tests use a simulated audio context; audible transitions should also be
checked in the running app.
