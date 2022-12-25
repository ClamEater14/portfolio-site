import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import PageBase from "../components/PageBase";
import { ViewProvider } from "../context/ViewContext";
import { DefaultSeo } from "next-seo";
import "../styles/globals.scss";

const TRANSITION_TIME = 0.5; // transition time in seconds
const TRANSITION_EXIT_DELAY = 0.5; // delay before transition begins to exit in seconds

export default function App({ Component, pageProps }: AppProps) {
  const [transitionEntered, setTransitionEntered] = useState(true); // loading screen appears by default, set as entered
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(true); // show loading screen by default

  const incomingComponent = useMemo(
    () => <Component {...pageProps} />,
    [Component, pageProps]
  );
  const prevComponentRef = useRef<JSX.Element>(incomingComponent);

  const router = useRouter();

  useEffect(() => {
    prevComponentRef.current = incomingComponent;

    const initLoad = document.getElementById("init-load");
    if (initLoad != null) {
      initLoad.remove();
    }

    const t = setTimeout(
      () => setLoading(false),
      (TRANSITION_TIME + TRANSITION_EXIT_DELAY) * 1000
    );
    const handleStart = (url: string) => {
      if (url != router.asPath) {
        setScrollY(window.scrollY);
        setTransitionEntered(false);
        setLoading(true);
      }
    };

    const handleStop = (url: string) => {
      window.scrollTo(0, scrollY);
      setTransitionEntered(false);
      url == router.asPath &&
        setTimeout(
          () => {
            window.scrollTo(0, 0);
            setLoading(false);
          },
          loading ? (TRANSITION_TIME + TRANSITION_EXIT_DELAY) * 1000 : 0
        );
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);
    return () => {
      clearTimeout(t);
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [incomingComponent, loading, router.asPath, router.events, scrollY]);

  return (
    <>
      <DefaultSeo
        themeColor="#043A9B"
        openGraph={{
          url: "https://www.caleblamcodes.dev/",
          title: "Caleb Lam",
          description:
            "A software developer focused on backend development. Greetings!",
          images: [
            {
              url: "https://files.caleblamcodes.dev/logo.png",
              width: 630,
              height: 630,
              alt: "Caleb Lam logo",
              type: "image/png",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/logo.svg",
          },
        ]}
      />
      <LoadingScreen
        duration={TRANSITION_TIME}
        loading={loading}
        onEntered={() => setTransitionEntered(true)}
      />
      <ViewProvider>
        <PageBase scrollable={!loading || !transitionEntered}>
          {!loading ? incomingComponent : prevComponentRef.current}
        </PageBase>
      </ViewProvider>
    </>
  );
}
