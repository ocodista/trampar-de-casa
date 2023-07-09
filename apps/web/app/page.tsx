'use client'
import React from 'react'
import { Hero } from './landing-page/hero/Hero'
import { Values } from './landing-page/Values'
import { FAQ } from './landing-page/FAQ'
import { HowItWorks } from './landing-page/HowItWorks'

export default function Page() {
  return (
    <>
      <Hero />
      <Values />
      <HowItWorks />
      <FAQ />
    </>
  )
}
