"use client";
import React from "react";
import { Hero } from "../domains/landing-page/Hero";
import { Values } from "../domains/landing-page/Values";
import { FAQ } from "../domains/landing-page/FAQ";
import { HowItWorks } from "../domains/landing-page/HowItWorks";

export default function Page() {
  return (
    <>
      <Hero />
      <Values />
      <HowItWorks />
      <FAQ />
    </>
  );
}
