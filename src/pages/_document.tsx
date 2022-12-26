import { Html, Head, Main, NextScript } from "next/document";
import LoadingScreen from "../components/LoadingScreen";
import { NextStrictCSP } from "next-strict-csp";

const isProd = process.env.NODE_ENV === "production";
const HeadCSP = isProd ? NextStrictCSP : Head;

export default function Document() {
  return (
    <Html lang="en">
      <HeadCSP>
        {isProd && <meta httpEquiv="Content-Security-Policy" />}
      </HeadCSP>
      <body>
        <div id="init-load">
          <LoadingScreen loading />
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
