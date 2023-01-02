import { useCallback } from "react";
// import Background from "./Background";
import dynamic from "next/dynamic";
import { useViewContext } from "../context/ViewContext";
import Footer from "./Footer";
import Header from "./Header";

class PageBaseProps {
  scrollable: boolean = true;
  onBackgroundLoad?: () => void;
  children: any;
}

const Background = dynamic(() => import("../components/Background"), {
  ssr: false,
});

function PageBase({ scrollable, onBackgroundLoad, children }: PageBaseProps) {
  const { headerOffset, setHeaderOffset, footerOffset, setFooterOffset } =
    useViewContext();

  const headerRef = useCallback(
    (node: HTMLElement) => {
      if (node != null) {
        setHeaderOffset(node.clientHeight);
        document.documentElement.style.setProperty(
          "--header-height",
          `${node.clientHeight}px`
        );
      }
    },
    [setHeaderOffset]
  );

  const footerRef = useCallback(
    (node: HTMLElement) => {
      if (node != null) {
        setFooterOffset(node.clientHeight);
        document.documentElement.style.setProperty(
          "--footer-height",
          `${node.clientHeight}px`
        );
      }
    },
    [setFooterOffset]
  );

  return (
    <>
      <div className={!scrollable ? "overflow-hidden vh-100" : ""}>
        <Header ref={headerRef} />
        <Background onLoad={onBackgroundLoad} />
        <div className="position-relative">
          <div
            style={{
              paddingBottom: `${footerOffset}px`,
            }}
          >
            <main
              style={{
                minHeight: `calc(100vh - ${headerOffset + footerOffset}px)`,
              }}
            >
              {children}
            </main>
          </div>
          <Footer ref={footerRef} />
        </div>
      </div>
    </>
  );
}

export default PageBase;
