import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const oneOf = (list: string[]) =>
  list[Math.floor(Math.random() * list.length)]
