import { ThreeScene } from './components/ThreeScene';
import { VERSION_INFO, CERTIFICATION_TEXT } from './constants/version';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Cube Viewer</h1>
          <div className="certification-badge">
            <span className="ce-mark">{VERSION_INFO.ceMark}</span>
            <span className="version">v{VERSION_INFO.version}</span>
          </div>
        </div>
      </header>
      <main className="scene-container">
        <ThreeScene />
      </main>
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
    </div>
  );
}

export default App;

