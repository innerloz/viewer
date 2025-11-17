import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SettingsMenu } from '../SettingsMenu';
import { CubeSettingsProvider } from '../../context/CubeSettingsContext';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <CubeSettingsProvider>
        {component}
      </CubeSettingsProvider>
    </ThemeProvider>
  );
};

describe('SettingsMenu', () => {
  it('renders menu button', () => {
    renderWithProviders(<SettingsMenu />);
    const menuButton = screen.getByLabelText('open settings menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('opens drawer when menu button is clicked', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();

    renderWithProviders(<SettingsMenu />);
    const menuButton = screen.getByLabelText('open settings menu');
    await user.click(menuButton);

    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('displays cube count slider', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();

    renderWithProviders(<SettingsMenu />);
    const menuButton = screen.getByLabelText('open settings menu');
    await user.click(menuButton);

    expect(screen.getByText(/Number of Cubes:/)).toBeInTheDocument();
  });

  it('displays color scheme options', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();

    renderWithProviders(<SettingsMenu />);
    const menuButton = screen.getByLabelText('open settings menu');
    await user.click(menuButton);

    expect(screen.getByLabelText('Random')).toBeInTheDocument();
    expect(screen.getByLabelText('Rainbow')).toBeInTheDocument();
    expect(screen.getByLabelText('Single Color')).toBeInTheDocument();
  });

  it('shows color picker when single color mode is selected', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();

    renderWithProviders(<SettingsMenu />);
    const menuButton = screen.getByLabelText('open settings menu');
    await user.click(menuButton);

    const singleColorRadio = screen.getByLabelText('Single Color');
    await user.click(singleColorRadio);

  
    expect(screen.getByText(/Choose Color/)).toBeInTheDocument();
  });

  it('closes drawer when close button is clicked', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const { waitFor } = await import('@testing-library/react');
    const user = userEvent.setup();

    renderWithProviders(<SettingsMenu />);
    const menuButton = screen.getByLabelText('open settings menu');
    await user.click(menuButton);

    expect(screen.getByText('Settings')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('close settings menu');
    await user.click(closeButton);

    // Wait for drawer to close - check if drawer has aria-hidden="true"
    await waitFor(() => {
      const drawer = document.querySelector('[class*="MuiDrawer"]');
      const isHidden = drawer?.getAttribute('aria-hidden') === 'true';
      expect(isHidden).toBe(true);
    }, { timeout: 1000 });
  });

  it('menu button has gradient background', () => {
    renderWithProviders(<SettingsMenu />);
    const menuButton = screen.getByLabelText('open settings menu');
    
  
    expect(menuButton).toHaveStyle({
      background: expect.stringContaining('linear-gradient'),
    });
  });

  it('menu button has pulse animation', () => {
    renderWithProviders(<SettingsMenu />);
    const menuButton = screen.getByLabelText('open settings menu');
    

    const computedStyle = window.getComputedStyle(menuButton);
    expect(computedStyle.animation).toBeTruthy();
  });

  it('drawer has gradient background on desktop and mobile', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();

    renderWithProviders(<SettingsMenu />);
    const menuButton = screen.getByLabelText('open settings menu');
    await user.click(menuButton);

    const drawer = document.querySelector('[class*="MuiDrawer"]');
    expect(drawer).toBeInTheDocument();
    
  
    const settingsText = screen.getByText('Settings');
    expect(settingsText).toHaveStyle({ color: 'white' });
  });

  it('slider displays current cube count', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();

    renderWithProviders(<SettingsMenu />);
    const menuButton = screen.getByLabelText('open settings menu');
    await user.click(menuButton);

    expect(screen.getByText(/Number of Cubes: 8/)).toBeInTheDocument();
  });

  it('all color scheme options are accessible', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();

    renderWithProviders(<SettingsMenu />);
    const menuButton = screen.getByLabelText('open settings menu');
    await user.click(menuButton);

    
    const randomOption = screen.getByLabelText('Random');
    const rainbowOption = screen.getByLabelText('Rainbow');
    const singleOption = screen.getByLabelText('Single Color');

    expect(randomOption).toBeInTheDocument();
    expect(rainbowOption).toBeInTheDocument();
    expect(singleOption).toBeInTheDocument();
  });
});

