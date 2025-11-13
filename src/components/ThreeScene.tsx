import { useEffect, useRef } from 'react';
import { CubeScene } from '../three/CubeScene';

export const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<CubeScene | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize the Three.js scene
    sceneRef.current = new CubeScene(canvasRef.current);

    // Cleanup on unmount
    return () => {
      if (sceneRef.current) {
        sceneRef.current.dispose();
        sceneRef.current = null;
      }
    };
  }, []);

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

