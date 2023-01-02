import { Canvas } from "@react-three/fiber";
import { AppConfig } from "../../config/AppConfig";
import BackgroundCanvas from "./BackgroundCanvas";

interface BackgroundProps {
  onLoad?: () => void;
}

function Background({ onLoad }: BackgroundProps) {
  return (
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
      onCreated={onLoad}
    >
      <ambientLight />
      <BackgroundCanvas />
    </Canvas>
  );
}

export default Background;
