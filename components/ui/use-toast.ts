"use client"

import { useState, useEffect } from "react"

interface ToastProps {
  title: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

export function toast(props: ToastProps) {
  const toastEvent = new CustomEvent("toast", { detail: props })
  document.dispatchEvent(toastEvent)
}

export function useToast() {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([])

  useEffect(() => {
    const handleToast = (e: Event) => {
      const detail = (e as CustomEvent<ToastProps>).detail
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prev) => [...prev, { ...detail, id }])

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, detail.duration || 3000)
    }

    document.addEventListener("toast", handleToast)
    return () => document.removeEventListener("toast", handleToast)
  }, [])

  return { toasts }
}

