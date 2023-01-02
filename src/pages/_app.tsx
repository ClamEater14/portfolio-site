import { DefaultSeo } from "next-seo";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import PageBase from "../components/PageBase";
import { AppConfig } from "../config/AppConfig";
import { ViewProvider } from "../context/ViewContext";
import NextNProgress from "nextjs-progressbar";
import "../styles/globals.scss";
import "../styles/fonts.scss";
import "../styles/vars.css";

const TRANSITION_TIME = 0.5; // transition time in seconds
const TRANSITION_EXIT_DELAY = 0.5; // delay before transition begins to exit in seconds

const PageApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(true); // show loading screen by default

  const router = useRouter();

  useEffect(() => {
    const initLoad = document.getElementById("init-load");
    if (initLoad != null) {
      initLoad.remove();
    }
  }, [loading, router.asPath, router.events]);

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
              url: AppConfig.ogImageURL,
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
            href: AppConfig.logoURL,
          },
        ]}
      />
      <div>
        <LoadingScreen duration={TRANSITION_TIME} loading={loading} />
        <NextNProgress color={AppConfig.hedronColor?.toString() ?? "#29D"} />
        <ViewProvider>
          <PageBase
            onBackgroundLoad={() => {
              setLoading(false);
            }}
            scrollable={!loading}
          >
            {!loading && <Component {...pageProps} />}
          </PageBase>
        </ViewProvider>
      </div>
    </>
  );
};

PageApp.getInitialProps = async (
  context: AppContext
): Promise<AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  return {
    ...ctx,
  };
};

export default PageApp;
