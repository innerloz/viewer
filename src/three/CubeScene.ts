import * as THREE from 'three';

export type ColorScheme = 'random' | 'rainbow' | 'single';

export interface CubeSettings {
  cubeCount: number;
  colorScheme: ColorScheme;
  singleColor: string;
}

export class CubeScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private cubes: THREE.Mesh[] = [];
  private animationId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private settings: CubeSettings;
  private geometry: THREE.BoxGeometry;
  private rainbowColors: number[] = [
    0xff6b6b, // Red
    0xff9f43, // Orange
    0xfeca57, // Yellow
    0x1dd1a1, // Green
    0x0abde3, // Blue
    0x5f27cd, // Indigo
    0xee5a6f, // Pink
  ];

  constructor(canvas: HTMLCanvasElement, initialSettings: CubeSettings) {
    this.settings = { ...initialSettings };

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a2e);

    const container = canvas.parentElement;
    const width = container?.clientWidth || window.innerWidth;
    const height = container?.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    this.updateCameraPosition();

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true,
      alpha: false 
    });
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.position.set(5, 10, 7.5);
    this.scene.add(directionalLight);

    // Create shared geometry
    this.geometry = new THREE.BoxGeometry(1, 1, 1);

    // Create cubes
    this.createCubes();

    // Use ResizeObserver for better resize handling
    this.setupResizeObserver(canvas);

    // Start animation
    this.animate();
  }

  private getColorForCube(index: number): number {
    switch (this.settings.colorScheme) {
      case 'random':
        return Math.random() * 0xffffff;
      case 'rainbow':
        return this.rainbowColors[index % this.rainbowColors.length];
      case 'single':
        return new THREE.Color(this.settings.singleColor).getHex();
      default:
        return 0xff6b6b;
    }
  }

  private updateCameraPosition(): void {
    const cubeCount = this.settings.cubeCount;
    const cubesPerRow = 25;
    const numRows = Math.ceil(cubeCount / cubesPerRow);
    const spacing = 2;
    const rowSpacing = 2.5;
    
    // Calculate bounds
    const maxCubesInRow = Math.min(cubesPerRow, cubeCount);
    const totalWidth = (maxCubesInRow - 1) * spacing;
    const totalHeight = (numRows - 1) * rowSpacing;
    
    // Adjust camera position based on grid size
    const distance = Math.max(totalWidth, totalHeight) * 0.8 + 10;
    const height = Math.max(5, totalHeight * 0.3 + 5);
    
    this.camera.position.set(0, height, distance);
    this.camera.lookAt(0, 0, 0);
  }

  private createCubes(): void {
    // Remove existing cubes
    this.removeAllCubes();

    const cubeCount = this.settings.cubeCount;
    const spacing = 2;
    const cubesPerRow = 25; // Maximum cubes per row
    const rowSpacing = 2.5; // Vertical spacing between rows

    // Calculate number of rows needed
    const numRows = Math.ceil(cubeCount / cubesPerRow);

    // Create cubes in grid layout
    for (let i = 0; i < cubeCount; i++) {
      const row = Math.floor(i / cubesPerRow);
      const col = i % cubesPerRow;
      
      // Calculate position within row
      const cubesInRow = Math.min(cubesPerRow, cubeCount - row * cubesPerRow);
      const totalWidth = (cubesInRow - 1) * spacing;
      const startX = -totalWidth / 2;
      
      const color = this.getColorForCube(i);
      const material = new THREE.MeshStandardMaterial({ color });
      const cube = new THREE.Mesh(this.geometry, material);
      
      // Position cubes in grid
      cube.position.x = startX + col * spacing;
      cube.position.y = (numRows - 1) / 2 * rowSpacing - row * rowSpacing;
      cube.position.z = 0;

      this.scene.add(cube);
      this.cubes.push(cube);
    }
    
    // Update camera position after creating cubes
    this.updateCameraPosition();
  }

  private removeAllCubes(): void {
    this.cubes.forEach((cube) => {
      // Dispose of material
      if (cube.material instanceof THREE.Material) {
        cube.material.dispose();
      }
      // Remove from scene
      this.scene.remove(cube);
    });
    this.cubes = [];
  }

  public updateSettings(newSettings: CubeSettings): void {
    const cubeCountChanged = this.settings.cubeCount !== newSettings.cubeCount;
    const colorSchemeChanged = this.settings.colorScheme !== newSettings.colorScheme;
    const singleColorChanged = 
      this.settings.colorScheme === 'single' &&
      this.settings.singleColor !== newSettings.singleColor;

    this.settings = { ...newSettings };

    // If cube count or color scheme changed, recreate all cubes
    if (cubeCountChanged || colorSchemeChanged) {
      this.createCubes();
    } else if (singleColorChanged) {
      // If only single color changed, just update materials
      this.updateCubeColors();
    } else if (newSettings.colorScheme === 'random') {
      this.updateCubeColors();
    }
  }

  private updateCubeColors(): void {
    this.cubes.forEach((cube, index) => {
      const color = this.getColorForCube(index);
      if (cube.material instanceof THREE.MeshStandardMaterial) {
        cube.material.color.setHex(color);
      }
    });
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    // Rotate each cube
    this.cubes.forEach((cube) => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    });

    this.renderer.render(this.scene, this.camera);
  };

  private setupResizeObserver(canvas: HTMLCanvasElement): void {
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.handleResize(width, height);
      }
    });
    
    const container = canvas.parentElement;
    if (container) {
      this.resizeObserver.observe(container);
    }
  }

  private handleResize = (width: number, height: number): void => {
    if (width === 0 || height === 0) return;

    // Update camera aspect ratio
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    // Update renderer size (false = don't update canvas style)
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  public dispose(): void {
    // Stop animation
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }

    // Disconnect resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    // Dispose of geometries and materials
    this.cubes.forEach((cube) => {
      cube.geometry.dispose();
      if (cube.material instanceof THREE.Material) {
        cube.material.dispose();
      }
    });

    // Dispose of renderer
    this.renderer.dispose();
  }
}

