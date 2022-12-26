import {
  getCspInitialProps,
  provideComponents,
} from "@next-safe/middleware/dist/document";
import Document, { Html, Main, DocumentContext } from "next/document";
import LoadingScreen from "../components/LoadingScreen";

export default class DocumentWithNonce extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await getCspInitialProps({ ctx });
    return initialProps;
  }

  render() {
    const { Head, NextScript } = provideComponents(this.props);
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
}

// export default function Document() {
//   return (
//     <Html lang="en">
//       <Head />
//       <body>
//         <div id="init-load">
//           <LoadingScreen loading />
//         </div>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }
