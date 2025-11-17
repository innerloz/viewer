import { ThreeScene } from './components/ThreeScene';
import { SettingsMenu } from './components/SettingsMenu';
import { CubeSettingsProvider } from './context/CubeSettingsContext';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CubeSettingsProvider>
        <div className="app">
          <header className="header">
            <h1>Cube Viewer</h1>
          </header>
          <main className="scene-container">
            <ThreeScene />
          </main>
          <SettingsMenu />
        </div>
      </CubeSettingsProvider>
    </ThemeProvider>
  );
}

export default App;

