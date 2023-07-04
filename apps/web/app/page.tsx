"use client";
import React from "react";
import { Hero } from "./landing-page/hero/Hero";
import { Values } from "./landing-page/Values";
import { FAQ } from "./landing-page/FAQ";
import { HowItWorks } from "./landing-page/HowItWorks";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "next-themes";

export default function Page () {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute={"class"}>
          <Hero />
          <Values />
          <HowItWorks />
          <FAQ />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}
