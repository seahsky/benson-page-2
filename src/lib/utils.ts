import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Animation utilities for staggered reveals
export const staggerDelay = (index: number, baseDelay: number = 100): string => {
  return `${index * baseDelay}ms`
}

// Social media link generators
export const generateWhatsAppLink = (phoneNumber: string, message?: string): string => {
  const encodedMessage = message ? encodeURIComponent(message) : ''
  return `https://wa.me/${phoneNumber}${encodedMessage ? `?text=${encodedMessage}` : ''}`
}

export const generateLINELink = (lineId: string): string => {
  return `https://line.me/ti/p/${lineId}`
}

// Format pricing with currency
export const formatPrice = (amount: number, currency: string = 'AUD'): string => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Language detection utility
export const getPreferredLanguage = (): 'en' | 'zh' => {
  if (typeof window === 'undefined') return 'en'

  const stored = localStorage.getItem('preferred-language')
  if (stored === 'zh' || stored === 'en') return stored

  const browserLang = navigator.language.toLowerCase()
  return browserLang.startsWith('zh') ? 'zh' : 'en'
}