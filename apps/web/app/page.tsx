"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Hero } from "./landing-page/Hero";
import { Values } from "./landing-page/Values";
import { FAQ } from "./landing-page/FAQ";
import { HowItWorks } from "./landing-page/HowItWorks";

const queryClient = new QueryClient();

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
