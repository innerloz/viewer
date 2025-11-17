import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ColorScheme = 'random' | 'rainbow' | 'single';

interface CubeSettings {
  cubeCount: number;
  colorScheme: ColorScheme;
  singleColor: string;
}

interface CubeSettingsContextType {
  settings: CubeSettings;
  setCubeCount: (count: number) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  setSingleColor: (color: string) => void;
}

const defaultSettings: CubeSettings = {
  cubeCount: 8,
  colorScheme: 'random',
  singleColor: '#ff6b6b',
};

const CubeSettingsContext = createContext<CubeSettingsContextType | undefined>(undefined);

export const CubeSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CubeSettings>(defaultSettings);

  const setCubeCount = (count: number) => {
    setSettings((prev) => ({ ...prev, cubeCount: count }));
  };

  const setColorScheme = (scheme: ColorScheme) => {
    setSettings((prev) => ({ ...prev, colorScheme: scheme }));
  };

  const setSingleColor = (color: string) => {
    setSettings((prev) => ({ ...prev, singleColor: color }));
  };

  return (
    <CubeSettingsContext.Provider
      value={{
        settings,
        setCubeCount,
        setColorScheme,
        setSingleColor,
      }}
    >
      {children}
    </CubeSettingsContext.Provider>
  );
};

export const useCubeSettings = () => {
  const context = useContext(CubeSettingsContext);
  if (context === undefined) {
    throw new Error('useCubeSettings must be used within a CubeSettingsProvider');
  }
  return context;
};


