import Image from "next/image";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Fade from "react-bootstrap/Fade";

interface LoadingScreenProps {
  loading?: boolean;
  duration?: number;
  onEntered?: () => void;
  onExited?: () => void;
}

function LoadingScreen({
  loading,
  duration,
  onEntered,
  onExited,
}: LoadingScreenProps) {
  const [visible, setVisible] = useState(false);
  return (
    <Fade
      timeout={(duration ?? 1) * 1000}
      in={loading ?? false}
      onEnter={() => setVisible(true)}
      onEntered={onEntered}
      onExited={() => {
        setVisible(false);
        if (onExited) onExited();
      }}
      mountOnEnter={true}
    >
      <Container
        fluid
        style={{
          transitionDuration: `${duration ?? 1}s`,
          pointerEvents: visible ? "auto" : "none",
        }}
        className="bg-black vh-100 d-flex fixed-top justify-content-center align-items-center"
      >
        <Image src="/logo.svg" width={100} height={100} alt="Caleb Lam logo" />
      </Container>
    </Fade>
  );
}

export default LoadingScreen;
