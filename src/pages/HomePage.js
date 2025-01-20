import React from "react";
import NavBar1 from "../components/NavBar1";
import Hero from "../components/Hero";
import Features from "../components/Features";
import ContactUs from "../components/ContactUs";
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <NavBar1 />
      <Hero />
      <Features />
      <ContactUs/>
      <Footer/>
    </>
  );
}

export default HomePage;
