import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BoxHelper, Mesh, PerspectiveCamera } from "three";
import { AppConfig } from "../../config/AppConfig";

function IcosahedronCage() {
  const shapeRef = useRef<Mesh>(null);
  const camera = useRef<PerspectiveCamera>(null);

  useFrame((_state, delta) => {
    if (!shapeRef.current) {
      return;
    }

    if (!camera.current) {
      return;
    }

    shapeRef.current.rotation.y += 0.1 * delta;
  });

  return (
    <group position={[0, 0, 5]}>
      <perspectiveCamera ref={camera} />
      <mesh ref={shapeRef}>
        <icosahedronGeometry args={[3, 2]} />
        <meshBasicMaterial
          color={AppConfig.hedronColor}
          wireframe
          transparent
          opacity={0.75}
        />
      </mesh>
    </group>
  );
}

export default IcosahedronCage;
