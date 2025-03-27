"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { JobColumn } from "@/components/job-column"
import { ProfileDropdown } from "@/components/profile-dropdown"

interface User {
  name: string
  email: string
  provider?: string
}

export default function Home() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated")
    const userData = localStorage.getItem("user")

    if (authStatus === "true" && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    } else {
      router.push("/login")
    }
  }, [router])

  if (!isAuthenticated) {
    return null // Don't render anything while checking authentication
  }

  return (
    <main className="min-h-screen bg-[#f5f1e4]">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center">
              <Image
                src="/images/linkedinscope-logo.png"
                alt="LinkedinScope Logo"
                width={300}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Select defaultValue="resume1">
                  <SelectTrigger className="w-[180px] bg-white border-gray-300">
                    <SelectValue placeholder="Select Resume" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resume1">Resume 1</SelectItem>
                    <SelectItem value="resume2">Resume 2</SelectItem>
                    <SelectItem value="resume3">Resume 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-medium">|</span>
                <span className="text-blue-600 font-medium">Presets</span>
                <Button variant="outline" size="sm" className="h-8 px-2 bg-white text-blue-600 border-gray-300">
                  S1
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-2 bg-white text-blue-600 border-gray-300">
                  S2
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-2 bg-white text-blue-600 border-gray-300">
                  S3
                </Button>
              </div>
              <ProfileDropdown user={user} />
            </div>
          </div>
        </header>

        {/* Job Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <JobColumn
            title="NEW JOB LISTINGS"
            filterNumber={4}
            jobs={[
              {
                title: "Dishwasher",
                company: "Chipotle Mexican Grill",
                logo: "/images/chipotle-logo.png",
                postedTime: "Posted 2 Minutes Ago",
                status: "new",
              },
              {
                title: "Overnight Crew",
                company: "McDonald's",
                logo: "/images/mcdonalds-logo.png",
                postedTime: "Posted 7 Minutes Ago",
                status: "new",
              },
              {
                title: "Team Member",
                company: "Kentucky Fried Chicken",
                logo: "/images/kfc-logo.png",
                postedTime: "Posted 35 Minutes Ago",
                status: "new",
              },
              {
                title: "Drive Through",
                company: "Wendy's",
                logo: "/images/wendys-logo.png",
                postedTime: "Posted 2 Hours Ago",
                status: "new",
              },
              {
                title: "Sanitation",
                company: "Taco Bell",
                logo: "/images/tacobell-logo.png",
                postedTime: "Posted 3 Hours Ago",
                status: "new",
              },
            ]}
          />

          <JobColumn
            title="APPLICATION IN PROGRESS"
            filterNumber={5}
            jobs={[
              {
                title: "Customer Service",
                company: "Chick-fil-a",
                logo: "/images/chickfila-logo.png",
                postedTime: "Posted 8 Minutes Ago",
                status: "inProgress",
              },
              {
                title: "Cashier",
                company: "Burger King",
                logo: "/images/burgerking-logo.png",
                postedTime: "Posted 21 Minutes Ago",
                status: "inProgress",
              },
              {
                title: "Pizza Chef",
                company: "Papa Johns",
                logo: "/images/papajohns-logo.png",
                postedTime: "Posted 35 Minutes Ago",
                status: "inProgress",
              },
              {
                title: "Mobile Orders",
                company: "Whataburger",
                logo: "/images/whataburger-logo.png",
                postedTime: "Posted 42 Minutes Ago",
                status: "inProgress",
              },
              {
                title: "Fry Cook",
                company: "McDonalds",
                logo: "/images/mcdonalds-logo.png",
                postedTime: "Posted 48 Minutes Ago",
                status: "inProgress",
              },
            ]}
          />

          <JobColumn
            title="APPLIED FOR"
            filterNumber={3}
            jobs={[
              {
                title: "Crew Member",
                company: "White Castle",
                logo: "/images/whitecastle-logo.png",
                postedTime: "Posted 35 Minutes Ago",
                status: "applied",
              },
              {
                title: "Delivery Driver",
                company: "Pizza Hut",
                logo: "/images/pizzahut-logo.png",
                postedTime: "Posted 39 Minutes Ago",
                status: "applied",
              },
              {
                title: "Line Cook",
                company: "In-N-Out Burger",
                logo: "/images/innout-logo.png",
                postedTime: "Posted 48 Minutes Ago",
                status: "applied",
              },
              {
                title: "Cashier",
                company: "Chipotle Mexican Grill",
                logo: "/images/chipotle-logo.png",
                postedTime: "Posted 1 Hour Ago",
                status: "applied",
              },
              {
                title: "Assistant Manager",
                company: "Kentucky Fried Chicken",
                logo: "/images/kfc-logo.png",
                postedTime: "Posted 2 Hours Ago",
                status: "applied",
              },
            ]}
          />
        </div>
      </div>
    </main>
  )
}

