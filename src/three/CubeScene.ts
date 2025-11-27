import * as THREE from 'three';

export class CubeScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private cubes: THREE.Mesh[] = [];
  private animationId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private rotationSpeed: number = 1.0;

  constructor(canvas: HTMLCanvasElement) {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a2e);

    // Get initial size from parent container
    const container = canvas.parentElement;
    const width = container?.clientWidth || window.innerWidth;
    const height = container?.clientHeight || window.innerHeight;

    // Create camera with proper aspect ratio
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    this.camera.position.set(0, 5, 15);
    this.camera.lookAt(0, 0, 0);

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

    // Create 8 cubes in a line
    this.createCubes();

    // Use ResizeObserver for better resize handling
    this.setupResizeObserver(canvas);

    // Start animation
    this.animate();
  }

  private createCubes(): void {
    const colors = [
      0xff6b6b, 
      0xff9f43, 
      0xfeca57, 
      0x1dd1a1, 
      0x0abde3, 
      0x5f27cd, 
    ];

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Position cubes from -7 to 7 on x-axis (2 units apart)
    for (let i = 0; i < 6; i++) {
      const material = new THREE.MeshStandardMaterial({ color: colors[i] });
      const cube = new THREE.Mesh(geometry, material);
      
      cube.position.x = -7 + i * 2;
      cube.position.y = 0;
      cube.position.z = 0;

      this.scene.add(cube);
      this.cubes.push(cube);
    }
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    // Rotate each cube with adjustable speed
    const rotationDelta = 0.01 * this.rotationSpeed;
    this.cubes.forEach((cube) => {
      cube.rotation.x += rotationDelta;
      cube.rotation.y += rotationDelta;
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

  public setRotationSpeed(speed: number): void {
    this.rotationSpeed = speed;
  }

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

