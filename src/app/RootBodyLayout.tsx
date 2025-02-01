"use client";

import React, { useState } from "react";

import LoadingScreen from "../components/LoadingScreen";
import PageBase from "../components/PageBase";

const TRANSITION_TIME = 1; // transition time in seconds
const LOGO_FILL_DURATION = 1;

export interface RootBodyLayoutProps {
  children: React.ReactNode;
}

export default function RootBodyLayout({ children }: RootBodyLayoutProps) {
  const [loading, setLoading] = useState(true); // show loading screen by default
  const [exiting, setExiting] = useState(false);

  return (
    <>
      <LoadingScreen
        transitionDuration={TRANSITION_TIME}
        logoFillDuration={LOGO_FILL_DURATION}
        loading={loading}
        onExiting={() => setExiting(true)}
        onExited={() => console.log("Loading done!")}
      />
      <PageBase onBackgroundLoad={() => setLoading(false)} scrollable={!loading && exiting}>
        {!loading && exiting && children}
      </PageBase>
    </>
  );
}
