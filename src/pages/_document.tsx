import Document, {
  Html,
  Main,
  Head,
  NextScript,
  DocumentContext,
} from "next/document";
import LoadingScreen from "../components/LoadingScreen";
import generateNonce from "../utils/generate-nonce";
import generateCSP from "../utils/generate-csp";

interface DocumentProps {
  nonce: string;
}

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;
    const nonce = generateNonce();
    const csp = generateCSP({ nonce });

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });
    ctx.res?.setHeader("Content-Security-Policy", csp);
    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);
    const additionalProps = { nonce };

    return {
      ...initialProps,
      ...additionalProps,
    };
  }

  render() {
    const { nonce } = this.props;
    return (
      <Html nonce={nonce}>
        <Head nonce={nonce} />
        <body>
          <div id="init-load">
            <LoadingScreen loading />
          </div>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

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
