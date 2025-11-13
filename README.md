# Cube Viewer

A simple React + TypeScript application that renders colorful cubes in a line using Three.js. 

## Project Structure

```
src/
├── App.tsx                    # Main app component with state management
├── App.css                    # App styles
├── main.tsx                   # React entry point
├── components/
│   ├── ThreeScene.tsx         # React wrapper for Three.js
└── three/
    └── CubeScene.ts           # Three.js scene logic with dynamic spacing
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

