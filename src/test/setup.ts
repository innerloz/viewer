import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock WebGL context globally for all tests
const mockGetContext = vi.fn((contextType: string) => {
  if (contextType !== 'webgl' && contextType !== 'webgl2' && !contextType) {
    return null;
  }
  
  const mockContext = {
    canvas: document.createElement('canvas'),
    drawingBufferWidth: 800,
    drawingBufferHeight: 600,
    getParameter: vi.fn((param: number) => {
      if (param === 0x0B70) return 16;
      if (param === 0x0B6C) return 32;
      if (param === 0x8B4C) return 'WebGL 1.0'; // GL_SHADING_LANGUAGE_VERSION
      if (param === 0x1F00) return 'WebGL'; // GL_VENDOR
      if (param === 0x1F01) return 'WebGL'; // GL_RENDERER
      return null;
    }),
    getExtension: vi.fn(() => null),
    getShaderPrecisionFormat: vi.fn(() => ({
      rangeMin: 127,
      rangeMax: 127,
      precision: 23,
    })),
    createShader: vi.fn(() => ({} as WebGLShader)),
    shaderSource: vi.fn(),
    compileShader: vi.fn(),
    getShaderParameter: vi.fn(() => true),
    createProgram: vi.fn(() => ({} as WebGLProgram)),
    attachShader: vi.fn(),
    linkProgram: vi.fn(),
    getProgramParameter: vi.fn(() => true),
    useProgram: vi.fn(),
    createBuffer: vi.fn(() => ({} as WebGLBuffer)),
    bindBuffer: vi.fn(),
    bufferData: vi.fn(),
    enableVertexAttribArray: vi.fn(),
    vertexAttribPointer: vi.fn(),
    drawArrays: vi.fn(),
    clearColor: vi.fn(),
    clear: vi.fn(),
    viewport: vi.fn(),
    uniformMatrix4fv: vi.fn(),
    uniform3f: vi.fn(),
    uniform4f: vi.fn(),
    uniform1i: vi.fn(),
    uniform1f: vi.fn(),
    activeTexture: vi.fn(),
    bindTexture: vi.fn(),
    texParameteri: vi.fn(),
    pixelStorei: vi.fn(),
    texImage2D: vi.fn(),
    generateMipmap: vi.fn(),
    createTexture: vi.fn(() => ({} as WebGLTexture)),
    deleteTexture: vi.fn(),
    deleteProgram: vi.fn(),
    deleteShader: vi.fn(),
    deleteBuffer: vi.fn(),
    getUniformLocation: vi.fn(() => ({} as WebGLUniformLocation)),
    getAttribLocation: vi.fn(() => 0),
    blendFunc: vi.fn(),
    enable: vi.fn(),
    disable: vi.fn(),
    depthFunc: vi.fn(),
    cullFace: vi.fn(),
    frontFace: vi.fn(),
    lineWidth: vi.fn(),
    polygonOffset: vi.fn(),
    scissor: vi.fn(),
    colorMask: vi.fn(),
    depthMask: vi.fn(),
    stencilMask: vi.fn(),
    stencilFunc: vi.fn(),
    stencilOp: vi.fn(),
    clearDepth: vi.fn(),
    clearStencil: vi.fn(),
    flush: vi.fn(),
    finish: vi.fn(),
    VERSION: 'WebGL 1.0',
    SHADING_LANGUAGE_VERSION: 'WebGL GLSL ES 1.0',
  };
  return mockContext as any;
});

// Setup WebGL mock before tests run
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = mockGetContext as any;
}

// Cleanup after each test
afterEach(() => {
  cleanup();
});


