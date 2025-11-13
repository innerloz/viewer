import { ThreeScene } from './components/ThreeScene';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Cube Viewer</h1>
      </header>
      <main className="scene-container">
        <ThreeScene />
      </main>
    </div>
  );
}

export default App;

