# Cube Viewer

A React + TypeScript application that renders customizable animated 3D cubes using Three.js. Features an interactive settings menu with real-time control over cube count and color schemes.

## Features

### Interactive Settings Menu
- **Show/Hide Menu**: Toggle a responsive settings panel with animated menu button
  - **Animated Menu Button**: Pulse animation and smooth hover effects
  - **Gradient Background**: Beautiful gradient matching the header palette (#667eea to #764ba2)
  - **Transparent Design**: Semi-transparent menu on mobile (38vh max height) to see cubes behind
  - **White Text**: High contrast white text on gradient background for better readability
- **Cube Count Slider**: Dynamically adjust the number of cubes from 1 to 50
  - **Auto Layout**: Automatically creates multiple rows when cube count exceeds 25
  - **Animated Thumb**: Interactive slider with hover animations
- **Color Schemes**:
  - **Random**: Each cube gets a random color when created or updated
  - **Rainbow**: Cubes cycle through a beautiful rainbow color palette (7 colors)
  - **Single Color**: All cubes use the same color with an integrated color picker (react-colorful)
- **Responsive Design**: 
  - **Desktop**: Right-side drawer with full gradient background
  - **Mobile**: Bottom drawer (38vh max height) with transparent backdrop for cube visibility

### 3D Visualization
- **Smooth Animations**: Rotating cube animation with continuous rotation
- **Multi-Row Layout**: Automatically arranges cubes in grid when count > 25 (max 25 per row)
- **Dynamic Camera**: Automatically adjusts camera position based on cube grid size
- **Responsive Rendering**: Adapts to container size changes

## Project Structure

```
src/
├── App.tsx                    # Main app component with Material UI theme
├── App.css                    # App styles
├── main.tsx                   # React entry point
├── context/
│   └── CubeSettingsContext.tsx  # React Context for cube settings state
├── components/
│   ├── ThreeScene.tsx         # React wrapper for Three.js scene
│   ├── SettingsMenu.tsx       # Settings menu component with Material UI
│   └── __tests__/             # Component tests
├── three/
│   ├── CubeScene.ts           # Three.js scene logic with dynamic settings
│   └── __tests__/             # Three.js tests
└── test/
    └── setup.ts               # Test configuration

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

### Run Tests

```bash
npm test
```

### Run Tests with UI

```bash
npm run test:ui
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Three.js** - 3D graphics rendering
- **Material UI (MUI)** - UI component library for the settings menu
- **react-colorful** - Color picker component
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework
- **Testing Library** - React component testing utilities

## Usage

1. **Opening Settings**: 
   - Click the animated menu button (☰) in the top-right corner
   - The button has a pulse animation and gradient background
   - On desktop: Settings drawer opens from the right side
   - On mobile: Settings drawer slides up from the bottom (38vh height)

2. **Adjusting Cube Count**: 
   - Use the slider to change the number of cubes (1-50)
   - Cubes automatically arrange in multiple rows when count > 25
   - Camera position adjusts automatically to fit all cubes

3. **Changing Color Scheme**: 
   - Select one of three color schemes via radio buttons:
     - **Random**: Each cube gets a random color (regenerates on settings update)
     - **Rainbow**: Cubes use a rainbow color palette (cycles through 7 colors)
     - **Single Color**: All cubes share the same color (click the color button to open picker)

4. **Mobile Experience**: 
   - Bottom drawer is semi-transparent (85% opacity) with blur effect
   - You can see cubes changing in real-time behind the settings panel
   - Compact design optimized for touch interaction

## Features in Detail

### Color Schemes

- **Random Mode**: Each cube is assigned a random color when created or when the settings are updated
- **Rainbow Mode**: Uses a fixed palette of 7 colors (red, orange, yellow, green, blue, indigo, pink) that cycles through the cubes
- **Single Color Mode**: All cubes use the same user-selected color, with a color picker integrated using `react-colorful` and Material UI components

### Multi-Row Cube Layout

When the cube count exceeds 25, cubes are automatically arranged in multiple rows:
- **Maximum 25 cubes per row** for optimal display
- **Automatic row spacing** (2.5 units vertical spacing)
- **Centered layout** with proper spacing between rows
- **Dynamic camera positioning** adjusts automatically based on grid size

### Responsive Design

The settings menu adapts to screen size:
- **Desktop**: Right-side drawer with full gradient background and white text
- **Mobile**: Bottom drawer (38vh max height) with semi-transparent gradient background
  - **Transparent backdrop** (5% opacity) allows viewing cubes while adjusting settings
  - **Blur effect** (10px) for better text readability
  - **Compact design** with smaller fonts and spacing for mobile devices

Uses Material UI's `useMediaQuery` hook for responsive breakpoints.

### Animations

- **Menu Button**: 
  - Pulse animation with smooth shadow transitions (2s loop)
  - Scale animation on hover (1.1x) and active (0.95x)
  - Smooth transitions using cubic-bezier easing
- **Close Button**: Rotate animation on hover (90deg)
- **Slider Thumb**: Scale animation on hover (1.2x)
- **All transitions**: Smooth 0.2-0.3s cubic-bezier animations for professional feel

## Testing

The project includes comprehensive tests covering all major functionality:

### Test Coverage

- **Context Tests** (`src/context/__tests__/`):
  - State management (cubeCount, colorScheme, singleColor)
  - Default settings validation
  - Settings updates and state changes

- **Component Tests** (`src/components/__tests__/`):
  - SettingsMenu UI interactions
  - Menu button animations and styling
  - Drawer open/close functionality
  - Slider and color scheme selector interactions
  - Gradient background and white text styling
  - Mobile and desktop responsive behavior

- **Three.js Scene Tests** (`src/three/__tests__/`):
  - Cube creation and disposal
  - Settings updates (cube count, color schemes)
  - Multi-row layout (when cube count > 25)
  - Maximum cube count handling (50 cubes)
  - Dynamic camera positioning for grid layouts

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests in CI mode (single run)
npm test -- --run
```

All tests use Vitest as the test runner with React Testing Library for component testing and jsdom for DOM simulation.

