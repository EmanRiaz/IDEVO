"use client"

import Button from "./Button"
import { Plus } from "lucide-react"

interface Tab {
  id: string
  label: string
  active: boolean
}

interface RouteTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  onAddCard: () => void
  onCreateTask: () => void
}

export default function RouteTabs({ tabs, activeTab, onTabChange, onAddCard, onCreateTask }: RouteTabsProps) {
  return (
    <div className="p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id ? "bg-[#C72C88] text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={onAddCard}>
            Add card
          </Button>
          <Button variant="outlineTask" onClick={onCreateTask}>
            <Plus className="w-4 h-4 mr-2" />
            Create task
          </Button>
      
        </div>
      </div>
    </div>
  )
}
