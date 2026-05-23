import React from "react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ErrorBoundary } from "react-error-boundary";

import { AppConfig } from "../../config/AppConfig";
import FallbackGradientBackground from "./FallbackGradientBackground";
import IcosahedronCage from "./IcosahedronCage";
import RotatingCamera from "./RotatingCamera";

interface BackgroundProps {
  onLoad?: () => void;
}

function Background({ onLoad }: BackgroundProps) {
  return (
    <ErrorBoundary FallbackComponent={FallbackGradientBackground} onError={onLoad}>
      <Canvas
        linear
        className="bg-canvas"
        style={{
          background: AppConfig.backgroundColor,
          zIndex: -9999,
          width: "100vw",
          height: "100vh",
          display: "block",
          position: "fixed",
          top: 0,
          left: 0,
        }}
        frameloop="always"
        onCreated={onLoad}
      >
        <RotatingCamera radiansPerFrame={0.03} />
        <IcosahedronCage />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} speed={2} fade />
      </Canvas>
    </ErrorBoundary>
  );
}

export default Background;
