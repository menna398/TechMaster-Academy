import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";

function LandingPage() {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <Features></Features>
      <About></About>
      <Footer></Footer>
    </>
  );
}

export default LandingPage;
