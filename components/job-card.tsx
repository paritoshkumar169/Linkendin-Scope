import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface JobCardProps {
  title: string
  company: string
  logo: string
  postedTime: string
  status: "new" | "inProgress" | "applied"
  salary: string
  level: "Entry Level" | "Mid Level" | "Senior Level"
}

export function JobCard({ title, company, logo, postedTime, status, salary, level }: JobCardProps) {
  return (
    <div className="bg-[#f5f1e4] border border-gray-200 rounded-md p-3 flex items-center gap-3 mb-2">
      <div className="flex-shrink-0">
        <Image
          src={logo || "/placeholder.svg"}
          alt={`${company} logo`}
          width={60}
          height={60}
          className="rounded-full"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm">{company}</p>
        <p className="text-xs text-gray-600">{level} • {salary}</p>
        <div className="flex items-center gap-2 mt-1">
          <X className="h-4 w-4" />
          <span className="inline-block w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center">
            <span className="text-xs">🌐</span>
          </span>
        </div>
        <p className="text-xs mt-1">{postedTime}</p>
      </div>
      <div className="flex-shrink-0">
        {status === "applied" ? (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Applied</Button>
        ) : (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Quick Apply</Button>
        )}
      </div>
    </div>
  )
}
