# Musical Dice

**Musical Dice** is a web application inspired by Wolfgang Amadeus Mozart's famous **Musikalisches Würfelspiel** (Musical Dice Game).

The application provides a modern interactive version of the game, allowing users to select which minuetti to include, generate a random 12-bar sequence, and listen to the resulting composition.

The project was originally developed as a vanilla JavaScript application and has been migrated to **Next.js, React, and TypeScript** while preserving the original functionality and visual design.

## Features

- Listen to all 12 original minuetti individually.
- Select which minuetti should be included in the randomisation.
- Randomly generate a 12-bar composition.
- Listen to individual musical cells.
- Play the complete generated composition sequentially.
- Stop and replay the generated composition.
- Visual feedback for:
  - Selected cells
  - Currently playing cells
  - Currently playing minuetti
  - Disabled cells while the composition is playing
- Responsive layout for desktop and mobile devices.
- Animated mobile navigation.
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
- **Howler.js** — Audio playback and sequencing.
- **EmailJS** — Contact form email delivery.
- **Bootstrap 4.4.1** — Responsive layout and components.
- **Bootswatch Superhero** — Bootstrap theme.
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
│   ├── AvailableGrid.tsx
│   ├── BackToTop.tsx
│   ├── ContactModal.tsx
│   ├── ContactSection.tsx
│   ├── MinuettoList.tsx
│   ├── MinuettoSelector.tsx
│   └── MusicGame.tsx
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
