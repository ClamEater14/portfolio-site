import { Canvas, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Euler, PerspectiveCamera } from 'three';
import { Config } from '../../Config';
import BackgroundCanvas from './BackgroundCanvas';

function Background() {
  return (
    <Canvas
      linear
      className="bg-canvas"
      style={{
        background: Config.backgroundColor,
        zIndex: -9999,
        width: '100vw',
        height: '100vh',
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <ambientLight />
      <BackgroundCanvas />
    </Canvas>
  );
}

export default Background;
