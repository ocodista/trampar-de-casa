"use client";
import React from "react";
import { Hero } from "./landing-page/Hero";
import { Values } from "./landing-page/Values";
import { FAQ } from "./landing-page/FAQ";
import { HowItWorks } from "./landing-page/HowItWorks";
import { ThemeProvider } from "next-themes";

export default function Page () {
  return (
    <>
      <ThemeProvider attribute='class'>
        <Hero/>
        <Values/>
        <HowItWorks/>
        <FAQ/>
      </ThemeProvider>
    </>
  );
}