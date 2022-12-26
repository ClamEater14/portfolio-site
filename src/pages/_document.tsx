import { Html, Head, Main, NextScript } from "next/document";
import LoadingScreen from "../components/LoadingScreen";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
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
