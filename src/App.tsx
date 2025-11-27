import { useState } from 'react';
import { ThreeScene } from './components/ThreeScene';
//import { VERSION_INFO, CERTIFICATION_TEXT } from './constants/version';

import './App.css';

function App() {
  const [rotationSpeed, setRotationSpeed] = useState(1.0);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Cube Viewer</h1>
          {/*
          <div className="certification-badge">
            <span className="ce-mark">{VERSION_INFO.ceMark}</span>
            <span className="version">v{VERSION_INFO.version}</span>
          </div>
          */}
        </div>
      </header>
      <main className="scene-container">
        <ThreeScene rotationSpeed={rotationSpeed} />
        <div className="speed-control">
          <label htmlFor="speed-slider">
            Rotation Speed: <strong>{rotationSpeed.toFixed(1)}x</strong>
          </label>
          <input
            id="speed-slider"
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
          />
          <div className="speed-labels">
            <span>0x</span>
            <span>1.5x</span>
            <span>3x</span>
          </div>
        </div>
      </main>
      {/*
      <footer className="footer">
        <div className="footer-content">
          <span className="certification-text">
            {CERTIFICATION_TEXT}
          </span>
          <span className="compliance-text">
            {VERSION_INFO.intendedUse}
          </span>
        </div>
      </footer>
      */}
    </div>
  );
}

export default App;

