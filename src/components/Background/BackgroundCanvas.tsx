import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import {
  AdditiveBlending,
  IcosahedronBufferGeometry,
  LineSegments,
} from 'three';
import { Config } from '../../Config';

function BackgroundCanvas() {
  const linesRef = useRef<LineSegments>(null);

  const icosahedronGeom = new IcosahedronBufferGeometry(3, 1);

  useFrame((_state, delta) => {
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.1 * delta;
      linesRef.current.computeLineDistances();
    }
  });

  return (
    <>
      <perspectiveCamera />
      <lineSegments ref={linesRef}>
        <edgesGeometry args={[icosahedronGeom]} />
        <lineBasicMaterial
          transparent
          blending={AdditiveBlending}
          color={Config.hedronColor}
          opacity={0.75}
        />
      </lineSegments>
    </>
  );
}

export default BackgroundCanvas;
