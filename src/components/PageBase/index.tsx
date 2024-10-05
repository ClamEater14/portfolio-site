import React from "react";
import { useCallback } from "react";
// import Background from "./Background";
import dynamic from "next/dynamic";
import Footer from "../Footer";
import Header from "../Header";
import "./index.scss";

class PageBaseProps {
  scrollable: boolean = true;
  onBackgroundLoad?: () => void;
  children: any;
}

const Background = dynamic(() => import("../Background"), {
  ssr: false,
});

function PageBase({ scrollable, onBackgroundLoad, children }: PageBaseProps) {
  return (
    <>
      <div className={!scrollable ? "overflow-hidden vh-100" : ""}>
        <Header />
        <Background onLoad={onBackgroundLoad} />
        <div id="page-base-content">
          <main>{children}</main>
        </div>
        <div id="page-base-footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default PageBase;
