"use client";
import React from "react";
import { FAQ } from "./landing-page/FAQ";
import { HowItWorks } from "./landing-page/HowItWorks";
import { Values } from "./landing-page/Values";
import { Hero } from "./landing-page/hero/Hero";
export default function Page () {
  return (
    <>
      <Hero />
      <Values />
      <HowItWorks />
      <FAQ />
    </>
  );
}
