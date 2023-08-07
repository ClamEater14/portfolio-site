"use client";

import React, { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import PageBase from "../components/PageBase";
import { ViewProvider } from "../context/ViewContext";
const TRANSITION_TIME = 0.5; // transition time in seconds

export interface RootBodyLayoutProps {
  children: React.ReactNode;
}

export default function RootBodyLayout({ children }: RootBodyLayoutProps) {
  const [loading, setLoading] = useState(true); // show loading screen by default
  return (
    <>
      <LoadingScreen duration={TRANSITION_TIME} loading={loading} />
      <ViewProvider>
        <PageBase
          onBackgroundLoad={() => {
            setLoading(false);
          }}
          scrollable={!loading}
        >
          {!loading && children}
        </PageBase>
      </ViewProvider>
    </>
  );
}
