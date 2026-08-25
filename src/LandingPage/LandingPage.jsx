import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";

function LandingPage() {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <Features></Features>
    </>
  );
}

export default LandingPage;
