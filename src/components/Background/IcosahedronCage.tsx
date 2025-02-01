import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

import { AppConfig } from "../../config/AppConfig";

function IcosahedronCage() {
  const shapeRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (!shapeRef.current) {
      return;
    }

    shapeRef.current.rotation.y += 0.1 * delta;
  });

  return (
    <group position={[0, 0, 5]}>
      <mesh ref={shapeRef}>
        <icosahedronGeometry args={[3, 2]} />
        <meshBasicMaterial color={AppConfig.hedronColor} wireframe transparent opacity={0.75} />
      </mesh>
    </group>
  );
}

export default IcosahedronCage;
