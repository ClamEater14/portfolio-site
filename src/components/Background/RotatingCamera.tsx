import { useFrame } from "@react-three/fiber";
import React from "react";

export interface RotatingCameraProps {
  radiansPerFrame: number;
}

const RotatingCamera: React.FC<RotatingCameraProps> = ({ radiansPerFrame }) => {
  useFrame((state, delta) => {
    state.camera.rotation.y += radiansPerFrame * delta;
    state.camera.updateProjectionMatrix();
  });

  return null;
};

export default RotatingCamera;
