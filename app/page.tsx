"use client"

import { useEffect, useRef, useState } from "react"
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
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
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
    return null 
  }

  const handleAddResumeClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log("Selected resume file:", file)
      // Insert your file upload logic here.
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f1e4]">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center">
              <Image
                src="/images/logo.png"
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
                <Button
                  onClick={handleAddResumeClick}
                  variant="outline"
                  size="sm"
                  className="h-8 px-2 bg-white text-blue-600 border-gray-300"
                >
                  Add Resume
                </Button>
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

        {/* Hidden file input for resume upload */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept=".pdf,.doc,.docx"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <JobColumn
            title="NEW JOB LISTINGS"
            filterNumber={4}
            jobs={[
              {
                title: "Software Engineer",
                company: "Google",
                // logo: "/images/google-logo.png",
                postedTime: "Posted 2 Minutes Ago",
                status: "new",
                salary: "$50,000 - $80,000",
                level: "Entry Level",
              },
              {
                title: "Data Scientist",
                company: "Meta",
                // logo: "/images/meta-logo.png",
                postedTime: "Posted 7 Minutes Ago",
                status: "new",
                salary: "$100,000 - $120,000",
                level: "Mid Level",
              },
              {
                title: "Cloud Architect",
                company: "Amazon AWS",
                // logo: "/images/aws-logo.png",
                postedTime: "Posted 35 Minutes Ago",
                status: "new",
                salary: "$160,000 - $200,000",
                level: "Senior Level",
              },
              {
                title: "Machine Learning Engineer",
                company: "NVIDIA",
                // logo: "/images/nvidia-logo.png",
                postedTime: "Posted 2 Hours Ago",
                status: "new",
                salary: "$70,000 - $100,000",
                level: "Mid Level",
              },
            ]}
          />

          <JobColumn
            title="APPLICATION IN PROGRESS"
            filterNumber={5}
            jobs={[
              {
                title: "Frontend Engineer",
                company: "Netflix",
                // logo: "/images/netflix-logo.png",
                postedTime: "Posted 8 Minutes Ago",
                status: "inProgress",
                salary: "$55,000 - $70,000",
                level: "Entry Level",
              },
              {
                title: "Backend Engineer",
                company: "Stripe",
                // logo: "/images/stripe-logo.png",
                postedTime: "Posted 21 Minutes Ago",
                status: "inProgress",
                salary: "$160,000 - $200,000",
                level: "Mid Level",
              },
              {
                title: "Security Engineer",
                company: "Tesla",
                // logo: "/images/tesla-logo.png",
                postedTime: "Posted 35 Minutes Ago",
                status: "inProgress",
                salary: "$145,000 - $175,000",
                level: "Senior Level",
              },
              {
                title: "DevOps Engineer",
                company: "IBM",
                // logo: "/images/ibm-logo.png",
                postedTime: "Posted 42 Minutes Ago",
                status: "inProgress",
                salary: "$40,000 - $70,000",
                level: "Entry Level",
              },
              {
                title: "AI Researcher",
                company: "OpenAI",
                // logo: "/images/openai-logo.png",
                postedTime: "Posted 48 Minutes Ago",
                status: "inProgress",
                salary: "$80,000 - $120,000",
                level: "Senior Level",
              },
            ]}
          />

          <JobColumn
            title="APPLIED FOR"
            filterNumber={3}
            jobs={[
              {
                title: "Embedded Systems Engineer",
                company: "Apple",
                // logo: "/images/apple-logo.png",
                postedTime: "Posted 35 Minutes Ago",
                status: "applied",
                salary: "$150,000 - $185,000",
                level: "Entry Level",
              },
              {
                title: "Game Developer",
                company: "Epic Games",
                // logo: "/images/epicgames-logo.png",
                postedTime: "Posted 39 Minutes Ago",
                status: "applied",
                salary: "$135,000 - $170,000",
                level: "Mid Level",
              },
              {
                title: "Systems Engineer",
                company: "Cisco",
                // logo: "/images/cisco-logo.png",
                postedTime: "Posted 48 Minutes Ago",
                status: "applied",
                salary: "$140,000 - $175,000",
                level: "Senior Level",
              },
              {
                title: "Software Developer",
                company: "Adobe",
                // logo: "/images/adobe-logo.png",
                postedTime: "Posted 1 Hour Ago",
                status: "applied",
                salary: "$130,000 - $160,000",
                level: "Entry Level",
              },
              {
                title: "Data Engineer",
                company: "Palantir",
                // logo: "/images/palantir-logo.png",
                postedTime: "Posted 2 Hours Ago",
                status: "applied",
                salary: "$160,000 - $200,000",
                level: "Mid Level",
              },
            ]}
          />
        </div>
      </div>
    </main>
  )
}
