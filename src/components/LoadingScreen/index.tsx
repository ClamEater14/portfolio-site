import Image from "next/image";
import { useState, useEffect } from "react";
// Removed unused import
import { AppConfig } from "../../config/AppConfig";
import { AnimationPlaybackControls, useAnimate } from "motion/react";

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
  const [logo, animateLogo] = useAnimate<HTMLDivElement>();
  const [screen, animateScreen] = useAnimate<HTMLDivElement>();
  const [currentAnimControls, setCurrentAnimControls] = useState<
    AnimationPlaybackControls | undefined
  >(undefined);

  useEffect(() => {
    if (loading) {
      setCurrentAnimControls(
        animateLogo(
          logo.current,
          {
            clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
          },
          {
            duration: logoFillDuration,
            repeat: Infinity,
            repeatType: "loop",
          }
        )
      );
    } else if (!startFading) {
      const finishCurrLoop = async () => {
        currentAnimControls?.stop();
        await animateLogo(
          logo.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
          },
          {
            duration: logoFillDuration - (currentAnimControls?.time ?? 0),
            repeat: 0,
          }
        );
        setStartFading(true);
      };

      finishCurrLoop();
    } else {
      const doExit = () => {
        if (onExited) onExited();
        setVisible(false); // Unmount the component
      };
      const exitAnim = async () => {
        animateLogo(
          logo.current,
          { rotate: [0, 360] },
          { duration: transitionDuration }
        );
        animateScreen(
          screen.current,
          { opacity: 0 },
          { duration: transitionDuration }
        ).then(doExit);
      };

      if (onExiting) onExiting();
      exitAnim();
    }
  }, [loading, startFading]);

  useEffect(() => {
    if (loading) {
      if (onEntered) onEntered();
    }
  }, [loading]);

  if (!visible) return null; // Conditionally render the component

  return (
    <div
      ref={screen}
      className={`bg-black vh-100 d-flex fixed-top justify-content-center align-items-center ${
        visible ? "pe-auto" : "pe-none"
      }`}
    >
      <div ref={logo} style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
        <Image
          src={AppConfig.logoURL}
          priority
          width={100}
          height={100}
          alt="Caleb Lam logo"
        />
      </div>
    </div>
  );
}

export default LoadingScreen;
