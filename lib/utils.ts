import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Cookies from 'js-cookie'
import { toast } from 'sonner'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetcher = (url: string, options = {}) =>
  fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  }).then((res) => res.json())

export const getUrlfromPrefix = (prefix: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL_API}/${prefix}`
}

export const showToast = ({
  description = '',
  title = '',
  isError = false,
} = {}) => {
  if (isError) {
    toast.error(title, {
      description: description,
    })
  } else {
    toast.success(title, {
      description: description,
    })
  }
}
