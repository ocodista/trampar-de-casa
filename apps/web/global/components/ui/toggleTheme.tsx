"use client"
import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react"

export function ToggleTheme () {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return null
  }
  
  function toggle (e) {
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );
    const transition = document.startViewTransition(() => {
      // setClass((isDark = !isDark))
      theme == 'dark' ? setTheme("light") : setTheme("dark");
    })
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: theme == 'light' ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 300,
          easing: 'ease-in',
          pseudoElement: theme == 'light' ? '::view-transition-new(root)' : '::view-transition-old(root)',
        },
      )
    })
  }
  return (
    <button
      onClick={ toggle }
      className=''>
      { theme == "dark" ? <Moon /> : <Sun />}
    </button>
  )
}