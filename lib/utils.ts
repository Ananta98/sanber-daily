import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Cookies from 'js-cookie'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  }).then((res) => res.json())

export const getUrlfromPrefix = (prefix: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL_API}/${prefix}`
}

export function timeAgo(timestamp: Date | number): string {
  const now = new Date()
  const past = new Date(timestamp)
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000) // Difference in seconds

  const intervals = [
    { label: 'y', seconds: 31536000 }, // 1 year = 31536000 seconds
    { label: 'mon', seconds: 2592000 }, // 1 month = 2592000 seconds
    { label: 'w', seconds: 604800 }, // 1 week = 604800 seconds
    { label: 'd', seconds: 86400 }, // 1 day = 86400 seconds
    { label: 'h', seconds: 3600 }, // 1 hour = 3600 seconds
    { label: 'm', seconds: 60 }, // 1 minute = 60 seconds
    { label: 's', seconds: 1 }, // 1 second = 1 second
  ]

  for (const interval of intervals) {
    const count = Math.floor(diff / interval.seconds)
    if (count >= 1) {
      return `${count} ${interval.label} ago`
    }
  }

  return 'just now'
}
