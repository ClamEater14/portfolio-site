import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending, IcosahedronGeometry, LineSegments } from "three";
import { AppConfig } from "../../config/AppConfig";

function BackgroundCanvas() {
  const linesRef = useRef<LineSegments>(null);

  const icosahedronGeom = new IcosahedronGeometry(3, 1);

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
          color={AppConfig.hedronColor}
          opacity={0.75}
        />
      </lineSegments>
    </>
  );
}

export default BackgroundCanvas;
