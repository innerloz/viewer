import { useEffect, useRef } from 'react';
import { CubeScene } from '../three/CubeScene';
import { useCubeSettings } from '../context/CubeSettingsContext';

export const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<CubeScene | null>(null);
  const { settings } = useCubeSettings();

  useEffect(() => {
    if (!canvasRef.current) return;

    sceneRef.current = new CubeScene(canvasRef.current, settings);

    // Cleanup on unmount
    return () => {
      if (sceneRef.current) {
        sceneRef.current.dispose();
        sceneRef.current = null;
      }
    };
  }, []); // Only run once on mount

  // Update scene when settings change
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.updateSettings(settings);
    }
  }, [settings]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        touchAction: 'none', // Prevent default touch gestures
      }}
    />
  );
};

