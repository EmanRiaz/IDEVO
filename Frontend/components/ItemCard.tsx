import { MoreHorizontal, MessageCircle, Calendar,Flag } from "lucide-react"
import Button from "./Button"
import { DropdownMenu, DropdownMenuItem } from "./DropdownMenu"
import Image from "next/image"
import { format, parseISO } from "date-fns";
import { Task as Entry, TeamMember as Collaborator } from "../app/types"

interface ItemCardProps {
  entry: Entry
  collaborators: (Collaborator | undefined)[]
}

export default function ItemCard({ entry, collaborators }: ItemCardProps) {
  console.log("collaborators for entry", collaborators);
  console.log("entry details", entry);
  
  const validCollaborators = collaborators.filter(Boolean) as Collaborator[]
  const remainingCount = validCollaborators.length - 3

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Priority and Menu */}
      <div className="flex items-center justify-between mb-3">
  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${entry.priority === "Urgent" ? "text-red-600 bg-[#FEE2E2]" : entry.priority === "Medium" ? "text-[#3A98EB] bg-[#3A98EB1A]" : ""}`}> 
  {entry.priority === "Urgent" && (
    <Image
      src="/Vector.png"
      alt="Urgent"
      width={16}
      height={16}
    />
  )}
  {entry.priority === "Medium" && (
    <Image
      src="/Vector (1).png"
      alt="Medium"
      width={16}
      height={16}
    />
  )}
  {entry.priority}
</span>

        <DropdownMenu
          trigger={
            <Button variant="ghost" size="sm" className="h-7 w-7 flex items-center justify-center p-0">
              <MoreHorizontal className="h-6 w-6 flex-shrink-0" />
            </Button>
          }
        >
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
        </DropdownMenu>
      </div>

      {/* Entry Title and Subtitle */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-1">{entry.title}</h4>
        <div className="relative inline-block align-middle" style={{ minHeight: '20px' }}>
          <Image
            src="/Vector (2).png"
            alt="Background"
            width={12}
            height={10.67}
            className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              opacity: 1,
              zIndex: 0
            }}
          />
          <p className="text-sm text-gray-500 relative z-10 pl-5" style={{ display: 'inline-block' }}>{entry.subtitle}</p>
        </div>
      </div>

      {/* Bottom Row: Avatars and Info */}
      <div className="flex items-center justify-between mt-2">
        {/* Avatars and +N badge */}
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {validCollaborators.slice(0, 3).map((collaborator) => (
              <Image
                key={collaborator.id}
                src={collaborator.avatar || "/placeholder.svg"}
                alt={collaborator.name}
                width={45}
                height={45}
                className="w-7 h-7 rounded-full border-2 border-white"
              />
            ))}
            {remainingCount > 0 && (
              <div className="w-7 h-7 rounded-full bg-sky-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                +{remainingCount}
              </div>
            )}
          </div>
        </div>

        {/* Info section border */}
      </div>
      <div style={{ borderTop: '0.5px solid #E7E7E7', marginTop: 8, marginBottom: 8 }} />
      {/* Info section */}
      <div className="flex items-center flex-nowrap min-w-0 overflow-hidden space-x-1 text-[11px] text-gray-500 flex-shrink-0" >
        <Image
          src="/Group.png"
          alt="Group"
          width={48}
          height={48}
        />
        <div className="flex items-center space-x-0.5 flex-shrink-0 min-w-0">
          <MessageCircle className="w-3 h-3 flex-shrink-0" />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">{entry.comments}</span>
        </div>
        {/* Divider after comments */}
        <div className="mx-1 w-px h-4 bg-[#E7E7E7] flex-shrink-0" />
        <div className="flex items-center space-x-0.5 flex-shrink-0 min-w-0">
          <Calendar className="w-3 h-3 flex-shrink-0" />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">{format(parseISO(entry.dueDate), "d MMM")}</span>
        </div>
        {/* Divider after date */}
        <div className="mx-1 w-px h-4 bg-[#E7E7E7] flex-shrink-0" />
        <div className="flex items-center space-x-0.5 flex-shrink-0 min-w-0">
          <svg width="14" height="14" className="flex-shrink-0"><circle cx="7" cy="7" r="5" stroke="#ccc" strokeWidth="2" fill="none" /></svg>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">{entry.completion}%</span>
        </div>
      </div>
    </div>
  )
}