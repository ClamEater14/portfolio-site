import React, { useRef, useEffect } from "react";
import { PerspectiveCamera } from "three";
import { useFrame, useThree } from "@react-three/fiber";

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
