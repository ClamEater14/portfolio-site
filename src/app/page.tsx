"use client";

import React from "react";

import "./page.scss";

import AboutSection from "../components/sections/About";
import ProjectsLinkSection from "../components/sections/ProjectsLink";
import SkillsSection from "../components/sections/Skills";

const Home: React.FC = () => {
  return (
    <>
      <AboutSection />
      <SkillsSection />
      <ProjectsLinkSection />
    </>
  );
};

export default Home;
