import { useEffect, useState } from "react";
import Image from "next/image";
import { useAnimate } from "motion/react";

// Removed unused import
import { AppConfig } from "../../config/AppConfig";

interface LoadingScreenProps {
  loading?: boolean;
  logoFillDuration?: number;
  transitionDuration?: number;
  onEntered?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
}

function LoadingScreen({
  loading = false,
  logoFillDuration = 1,
  transitionDuration = 1,
  onEntered,
  onExiting,
  onExited,
}: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [startFading, setStartFading] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [logo, animateLogo] = useAnimate<HTMLDivElement>();
  const [screen, animateScreen] = useAnimate<HTMLDivElement>();
  const [currLoopTime, setCurrLoopTime] = useState(0);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const anim = animateLogo(
      logo.current,
      {
        clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
      },
      {
        duration: logoFillDuration,
        repeat: Infinity,
        repeatType: "loop",
      }
    );

    if (onEntered) onEntered();

    return () => {
      anim.stop();
      setCurrLoopTime(anim.time);
    };
  }, [animateLogo, loading, logo, logoFillDuration, onEntered]);

  useEffect(() => {
    if (loading || startFading) {
      return;
    }

    animateLogo(
      logo.current,
      {
        clipPath: "inset(0% 0% 0% 0%)",
      },
      {
        duration: logoFillDuration - currLoopTime,
        repeat: 0,
      }
    ).then(() => setStartFading(true));
  }, [animateLogo, currLoopTime, loading, logo, logoFillDuration, startFading]);

  useEffect(() => {
    if (loading || !startFading || exiting) {
      return;
    }
    setExiting(true);

    const doExit = () => {
      if (onExited) onExited();
      setVisible(false); // Unmount the component
    };

    const exitAnim = async () => {
      animateLogo(logo.current, { rotate: [0, 360] }, { duration: transitionDuration });
      animateScreen(screen.current, { opacity: 0 }, { duration: transitionDuration }).then(doExit);
    };

    if (onExiting) onExiting();
    exitAnim();
  }, [
    animateLogo,
    animateScreen,
    exiting,
    loading,
    logo,
    onExited,
    onExiting,
    screen,
    startFading,
    transitionDuration,
  ]);
  if (!visible) return null; // Conditionally render the component

  return (
    <div
      ref={screen}
      className={`bg-black vh-100 d-flex fixed-top justify-content-center align-items-center ${
        visible ? "pe-auto" : "pe-none"
      }`}
    >
      <div ref={logo} style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
        <Image src={AppConfig.logoURL} priority width={100} height={100} alt="Caleb Lam logo" />
      </div>
    </div>
  );
}

export default LoadingScreen;
