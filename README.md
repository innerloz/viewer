# Cube Viewer

A simple React + TypeScript application that renders 8 colorful cubes in a line using Three.js. Fully responsive and optimized for desktop and mobile devices.

## Features

- 8 animated cubes positioned in a line, each with a unique color
- Smooth rotation animation
- Fully responsive design that works on mobile and desktop
- Automatic scene resizing using ResizeObserver
- Touch-optimized for mobile devices
- Built with React, TypeScript, and Three.js (without react-three-fiber)

## Project Structure

```
src/
├── App.tsx                    # Main app component
├── App.css                    # App styles
├── main.tsx                   # React entry point
├── components/
│   └── ThreeScene.tsx         # React wrapper for Three.js
└── three/
    └── CubeScene.ts           # Three.js scene logic
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Three.js** - 3D graphics
- **Vite** - Build tool and dev server

