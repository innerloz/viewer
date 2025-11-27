# Cube Viewer - CE MDR Version

A React + TypeScript 3D visualization application using Three.js.

**Version:** 2.1.0-MDR  
**Certification:** CE Marked Medical Device (MDR 2017/745, Class I)  
**Status:** For professional medical use only

> This is a CE marked medical device viewer compliant with the European Medical Device Regulation (MDR 2017/745). 

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

## Regulatory Information

### CE Marking
This software is CE marked as a Class I medical device under the Medical Device Regulation (EU) 2017/745.

### Intended Use
This application is intended for professional medical visualization purposes by qualified healthcare professionals.

### Version History
- **v2.1.0-MDR** - Current CE certified release
- Compliant with MDR 2017/745
- For professional use in clinical environments

### Warnings
⚠️ This device is intended for use by trained medical professionals only.  
⚠️ Not for consumer or home use.

