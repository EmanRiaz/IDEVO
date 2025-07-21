"use client"

import { useState, useEffect } from "react"
import NavBar from "@/components/NavBar"
import RouteTabs from "@/components/RouteTabs"
import TopHeader from "@/components/TopHeader"
import WorkspacePanel from "@/components/WorkspacePanel"
import { Task, KanbanColumn } from "./types"

const tabs = [
  { id: "overview", label: "Overview", active: false },
  { id: "onboard", label: "Onboard", active: true },
  { id: "milestones", label: "Milestones", active: false },
  { id: "deliverable", label: "Deliverable", active: false },
  { id: "calendar", label: "Calendar", active: false },
  { id: "discussion", label: "Discussion", active: false },
]

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [kanbanColumns, setKanbanColumns] = useState<KanbanColumn[]>([])
  const [activeTab, setActiveTab] = useState("onboard")
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showColumnModal, setShowColumnModal] = useState(false)
  const [newTask, setNewTask] = useState<Omit<Task, "_id" | "id">>({
    title: "",
    subtitle: "",
    priority: "Medium",
    status: "todo",
    assignees: [],
    comments: 0,
    dueDate: "",
    completion: 0,
  })
  const [newColumn, setNewColumn] = useState<Omit<KanbanColumn, "_id" | "id" | "tasks">>({ name: "" })

  // Fetch tasks and kanban columns from backend
  useEffect(() => {
    // Fetch kanban columns and tasks
    fetch("http://localhost:5000/api/kanban")
      .then((res) => res.json())
      .then((columns: any[]) => {
        console.log("Raw columns data:", columns);
        setKanbanColumns(columns);
        
        // Flatten all tasks from all columns
        let idCounter = 1;
        const allTasks: Task[] = [];
        
        columns.forEach((col: any) => {
          if (col.tasks && Array.isArray(col.tasks)) {
            col.tasks.forEach((task: any) => {
              allTasks.push({
                ...task,
                id: idCounter++,
                status: col.name.toLowerCase().replace(/\s+/g, ''), // Convert "In Progress" to "inprogress"
                assignees: (task.assignees || []).filter(Boolean),
              });
            });
          }
        });
        
        console.log("All tasks processed:", allTasks);
        setTasks(allTasks);
      })
      .catch(err => console.error("Error fetching kanban data:", err));
  }, [])

  // CRUD: Create Task
  const handleCreateTask = () => setShowTaskModal(true)
  const handleAddCard = () => setShowColumnModal(true)
  const submitCreateTask = async () => {
    try {
      const { assignees, ...taskData } = newTask;
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      let created: any = await res.json()
      console.log("Task created:", created);
      
      // Refresh kanban data to get updated columns and tasks
      const kanbanRes = await fetch("http://localhost:5000/api/kanban");
      if (kanbanRes.ok) {
        const columns: any[] = await kanbanRes.json();
        console.log("Refreshed kanban data:", columns);
        setKanbanColumns(columns);
        
        // Update tasks
        let idCounter = 1;
        const allTasks: Task[] = [];
        
        columns.forEach((col: any) => {
          if (col.tasks && Array.isArray(col.tasks)) {
            col.tasks.forEach((task: any) => {
              allTasks.push({
                ...task,
                id: idCounter++,
                status: col.name.toLowerCase().replace(/\s+/g, ''),
                assignees: (task.assignees || []).filter(Boolean),
              });
            });
          }
        });
        
        console.log("Updated tasks:", allTasks);
        setTasks(allTasks);
      }
      
      setShowTaskModal(false);
      setNewTask({
        title: "",
        subtitle: "",
        priority: "Medium",
        status: "todo",
        assignees: [],
        comments: 0,
        dueDate: "",
        completion: 0,
      });
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Error creating task. Please try again.");
    }
  }

  // CRUD: Create Kanban Column
  const submitCreateColumn = async () => {
    try {
      console.log("Creating column:", newColumn);
      const res = await fetch("http://localhost:5000/api/kanban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newColumn),
      })
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const created: KanbanColumn = await res.json()
      console.log("Column created:", created);
      
      // Refresh kanban data to get updated columns
      const kanbanRes = await fetch("http://localhost:5000/api/kanban");
      if (kanbanRes.ok) {
        const columns: any[] = await kanbanRes.json();
        console.log("Refreshed kanban data after column creation:", columns);
        setKanbanColumns(columns);
      }
      
      setShowColumnModal(false)
      setNewColumn({ name: "" })
    } catch (error) {
      console.error("Error creating column:", error);
      alert("Error creating column. Please try again.");
    }
  }

  // CRUD: Update Task
  const updateTask = async (id: string | number, updates: Partial<Task>) => {
    const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
    const updated: Task = await res.json()
    setTasks((prev) => prev.map((t) => (t._id === id || t.id === id ? updated : t)))
  }

  // CRUD: Delete Task
  const deleteTask = async (id: string | number) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" })
    setTasks((prev) => prev.filter((t) => t._id !== id && t.id !== id))
  }

  return (
    <div className="min-h-screen  bg-gray-50">
      <div className=" p-6">
          <TopHeader />
          <NavBar project={{ name: "Website Design", budget: 45000, status: "In Progress", completionRate: 75 }} />
          <div className="rounded-lg bg-[#F4F6F9] border ">
          <RouteTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onAddCard={handleAddCard}
            onCreateTask={handleCreateTask}
          />
        <WorkspacePanel
  items={tasks}
  segments={kanbanColumns.map(col => ({ label: col.name, items: col.tasks }))}
/>

        {/* Task Modal - Professional Design */}
        {showTaskModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Create New Task</h2>
                <button 
                  onClick={() => setShowTaskModal(false)}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-4 space-y-3">
                {/* Task Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., Design the new landing page"
                    value={newTask.title} 
                    onChange={e => setNewTask({ ...newTask, title: e.target.value })} 
                  />
                </div>
                
                {/* Task Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Add a more detailed description..."
                    value={newTask.subtitle} 
                    onChange={e => setNewTask({ ...newTask, subtitle: e.target.value })} 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input 
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={newTask.dueDate} 
                      onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} 
                    />
                  </div>
                  
                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={newTask.priority} 
                      onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Status/Column */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={newTask.status} 
                      onChange={e => setNewTask({ ...newTask, status: e.target.value })}
                    >
                      {kanbanColumns.map(col => (
                        <option key={col._id || col.id} value={col.name.toLowerCase().replace(/\s+/g, '')}>
                          {col.name}
                        </option>
                      ))}
                    </select>
                  </div>                 
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
                <button 
                  className="px-5 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  onClick={() => setShowTaskModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={submitCreateTask}
                  disabled={!newTask.title.trim()}
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Column Modal - Professional Design */}
        {showColumnModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Create New Column</h2>
                <button 
                  onClick={() => setShowColumnModal(false)}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Column Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., 'Testing' or 'Done'"
                    value={newColumn.name} 
                    onChange={e => setNewColumn({ ...newColumn, name: e.target.value })} 
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    This will create a new list on your board for organizing tasks.
                  </p>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button 
                  className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  onClick={() => setShowColumnModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={submitCreateColumn}
                  disabled={!newColumn.name.trim()}
                >
                  Create Column
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}