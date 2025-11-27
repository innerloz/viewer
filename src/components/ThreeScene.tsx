import { useEffect, useRef } from 'react';
import { CubeScene } from '../three/CubeScene';

interface ThreeSceneProps {
  rotationSpeed: number;
  cubesVisible: boolean;
}

export const ThreeScene = ({ rotationSpeed, cubesVisible }: ThreeSceneProps) => {
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

  // Update rotation speed when it changes
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setRotationSpeed(rotationSpeed);
    }
  }, [rotationSpeed]);

  // Update cube visibility when it changes
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setCubesVisible(cubesVisible);
    }
  }, [cubesVisible]);

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

