"use client";
import React from "react";
import { Hero, queryClient } from "./landing-page/Hero";
import { Values } from "./landing-page/Values";
import { FAQ } from "./landing-page/FAQ";
import { HowItWorks } from "./landing-page/HowItWorks";
import { QueryClientProvider } from "react-query";

export default function Page () {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hero />
        <Values />
        <HowItWorks />
        <FAQ />
      </QueryClientProvider>
    </>
  );
}
