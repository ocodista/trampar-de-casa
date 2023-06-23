"use client";
import React from "react";
import { Hero } from "../domains/landing-page/Hero";
import { Values } from "../domains/landing-page/Values";
import { FAQ } from "../domains/landing-page/FAQ";
import { HowItWorks } from "../domains/landing-page/HowItWorks";
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