import { Share2 } from "lucide-react"
import Button from "./Button"
import Image from "next/image"
import { TeamMember } from "../app/types"

interface Project {
  name: string
  budget: number
  status: string
  completionRate: number
  // teamMembers removed
}

interface NavBarProps {
  project: Project
}

export default function NavBar({ project }: NavBarProps) {
  // Removed teamMembers-related code

  return (
    <div className="rounded-lg bg-[#F4F6F9] border border-[#DFDFDF] shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex  space-x-8">
          {/* Project Name */}
          <div>
            <p className="text-base text-gray-500 uppercase tracking-wide">NAME</p>
            <h1 className="text-xl font-normal text-black">{project.name}</h1>
          </div>

          {/* Budget */}
          <div>
            <p className="text-base text-gray-500 uppercase tracking-wide">BUDGET</p>
            <p className="text-xl font-normal text-black">${project.budget.toLocaleString()}</p>
          </div>

          {/* Status */}
          <div>
            <p className="text-base text-gray-500 uppercase tracking-wide">STATUS</p>
            <p className="text-xl font-normal text-black">{project.status}</p>
          </div>

          {/* Team Members */}
          <div>
            <p className="text-base text-gray-500 uppercase tracking-wide">TEAM ON PROJECT</p>
            {/* GroupExport image below avatars */}
            <div className="mt-2 flex justify-center">
              <Image src="/GroupExport.png" alt="Group Export" width={100} height={32} />
            </div>
          </div>

          {/* Completion Rate */}
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide">Completion Rate</p>
            <div className="mt-2">
              <div className="relative w-32 h-6 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="bg-teal-500 h-6 rounded-full transition-all duration-300 flex items-center justify-center"
                  style={{ width: `${project.completionRate}%` }}
                >
                  <span className="text-white text-sm font-medium">{project.completionRate}%</span>
                </div>
                <div
                  className="absolute top-0 right-0 h-6 bg-gray-200 rounded-r-full"
                  style={{ 
                    width: `${100 - project.completionRate}%`,
                    backgroundImage: `repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 2px,
                      rgba(0,0,0,0.05) 2px,
                      rgba(0,0,0,0.05) 4px
                    )`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Share Button */}
        <Button className="px-6">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  )
}
