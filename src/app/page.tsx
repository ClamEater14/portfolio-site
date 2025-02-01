"use client";

import React from "react";
import "./page.scss";
import AboutSection from "../components/sections/About";
import SkillsSection from "../components/sections/Skills";
import ProjectLinkSection from "../components/sections/ProjectLink";

const Home: React.FC = () => {
  return (
    <>
      <AboutSection />
      <SkillsSection />
      <ProjectLinkSection />
    </>
  );
};

export default Home;
