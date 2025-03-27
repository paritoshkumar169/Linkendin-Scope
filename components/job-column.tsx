"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { JobCard } from "@/components/job-card"
import { SlidersHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Job {
  title: string
  company: string
  logo: string
  postedTime: string
  status: "new" | "inProgress" | "applied"
  salary: string
  level: "Entry Level" | "Mid Level" | "Senior Level"
}

interface JobColumnProps {
  title: string
  filterNumber: number
  jobs: Job[]
}

// Helper to parse a salary string like "$150,000 - $180,000"
const parseSalary = (salaryStr: string) => {
  const parts = salaryStr.replace(/\$/g, '').replace(/,/g, '').split(' - ')
  if (parts.length === 2) {
    const min = parseInt(parts[0], 10)
    const max = parseInt(parts[1], 10)
    return { min, max }
  }
  return null
}

export function JobColumn({ title, filterNumber, jobs }: JobColumnProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [jobLevel, setJobLevel] = useState("all")
  const [isRemote, setIsRemote] = useState(false)
  const [salaryRange, setSalaryRange] = useState("all")

  const filteredJobs = jobs.filter((job) => {
    const matchesLevel = jobLevel === "all" || job.level === jobLevel

    const salaryObj = parseSalary(job.salary)
    const matchesSalary =
      salaryRange === "all" ||
      (salaryRange === "0-30k" && salaryObj && salaryObj.max <= 30000) ||
      (salaryRange === "30k-60k" && salaryObj && salaryObj.min >= 30000 && salaryObj.max <= 60000) ||
      (salaryRange === "60k-100k" && salaryObj && salaryObj.min >= 60000 && salaryObj.max <= 100000) ||
      (salaryRange === "100k+" && salaryObj && salaryObj.min >= 100000)

    return matchesLevel && matchesSalary
  })

  return (
    <div className="bg-[#f5f1e4] rounded-md">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-blue-600 font-bold">{title}</h2>
        <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 bg-white border-gray-300 flex items-center gap-1">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filter {filterNumber}</span>
              <span className="text-xs">▼</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <div className="p-2">
              <h4 className="mb-2 text-sm font-medium">Job Level</h4>
              <DropdownMenuRadioGroup value={jobLevel} onValueChange={setJobLevel}>
                <DropdownMenuRadioItem value="all">All Levels</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Entry Level">Entry Level</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Mid Level">Mid Level</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Senior Level">Senior Level</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </div>

            <DropdownMenuSeparator />

            <div className="p-2">
              <h4 className="mb-2 text-sm font-medium">Salary Range</h4>
              <DropdownMenuRadioGroup value={salaryRange} onValueChange={setSalaryRange}>
                <DropdownMenuRadioItem value="all">Any Salary</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="0-30k">$0 - $30,000</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="30k-60k">$30,000 - $60,000</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="60k-100k">$60,000 - $100,000</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="100k+">$100,000+</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </div>

            <DropdownMenuSeparator />

            <div className="p-2 flex justify-end">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsFilterOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
        {filteredJobs.map((job, index) => (
          <JobCard
            key={index}
            title={job.title}
            company={job.company}
            logo={job.logo}
            postedTime={job.postedTime}
            status={job.status}
            salary={job.salary}
            level={job.level}
          />
        ))}
      </div>
    </div>
  )
}
