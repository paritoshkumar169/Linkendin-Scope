"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut } from "lucide-react"

interface ProfileDropdownProps {
  user: {
    name: string
    email: string
    provider?: string
  } | null
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    router.push("/login")
  }

  const handleAccountSecurity = () => {
    // Mock function - would navigate to account settings in a real app
    alert("Account and Security settings would open here")
    setOpen(false)
  }

  if (!user) return null

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-gray-800 text-white">
          <span className="sr-only">Open user menu</span>
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-gray-900 text-white border-gray-800">
        <DropdownMenuItem
          className="cursor-pointer flex items-center py-2 hover:bg-gray-800"
          onClick={handleAccountSecurity}
        >
          <User className="mr-2 h-4 w-4" />
          <span>Account and Security</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem
          className="cursor-pointer flex items-center py-2 text-pink-500 hover:bg-gray-800"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

