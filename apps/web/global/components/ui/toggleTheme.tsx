"use client"
import React from 'react'
import { useTheme } from "next-themes";

export function ToggleTheme () {
  const { systemTheme, theme, setTheme } = useTheme();
  
  return (
    <button
      onClick={ () => theme == "dark" ? setTheme('light') : setTheme("dark") }
      className=''>
      { theme == "dark" ? "🌞" : "🌙" }
    </button>
  )
}