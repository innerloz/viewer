import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CubeSettingsProvider, useCubeSettings } from '../CubeSettingsContext';

// Test component that uses the context
const TestComponent: React.FC = () => {
  const { settings, setCubeCount, setColorScheme, setSingleColor } = useCubeSettings();

  return (
    <div>
      <div data-testid="cube-count">{settings.cubeCount}</div>
      <div data-testid="color-scheme">{settings.colorScheme}</div>
      <div data-testid="single-color">{settings.singleColor}</div>
      <button
        onClick={() => setCubeCount(10)}
        data-testid="set-cube-count"
      >
        Set Cube Count
      </button>
      <button
        onClick={() => setColorScheme('rainbow')}
        data-testid="set-color-scheme"
      >
        Set Color Scheme
      </button>
      <button
        onClick={() => setSingleColor('#ff0000')}
        data-testid="set-single-color"
      >
        Set Single Color
      </button>
    </div>
  );
};

describe('CubeSettingsContext', () => {
  it('provides default settings', () => {
    render(
      <CubeSettingsProvider>
        <TestComponent />
      </CubeSettingsProvider>
    );

    expect(screen.getByTestId('cube-count')).toHaveTextContent('8');
    expect(screen.getByTestId('color-scheme')).toHaveTextContent('random');
    expect(screen.getByTestId('single-color')).toHaveTextContent('#ff6b6b');
  });

  it('allows updating cube count', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();

    render(
      <CubeSettingsProvider>
        <TestComponent />
      </CubeSettingsProvider>
    );

    const button = screen.getByTestId('set-cube-count');
    await user.click(button);

    expect(screen.getByTestId('cube-count')).toHaveTextContent('10');
  });

  it('allows updating color scheme', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();

    render(
      <CubeSettingsProvider>
        <TestComponent />
      </CubeSettingsProvider>
    );

    const button = screen.getByTestId('set-color-scheme');
    await user.click(button);

    expect(screen.getByTestId('color-scheme')).toHaveTextContent('rainbow');
  });

  it('allows updating single color', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();

    render(
      <CubeSettingsProvider>
        <TestComponent />
      </CubeSettingsProvider>
    );

    const button = screen.getByTestId('set-single-color');
    await user.click(button);

    expect(screen.getByTestId('single-color')).toHaveTextContent('#ff0000');
  });
});

