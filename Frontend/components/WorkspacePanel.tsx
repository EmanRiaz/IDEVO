import ItemCard from "./ItemCard"
import { CheckCircle, Clock, Eye, FileText, Archive, Columns } from "lucide-react"
import { Task as Entry } from "../app/types"

interface WorkspacePanelProps {
  items: Entry[]
  segments?: { label: string; items: any[] }[]
}

// Icon selection for each segment
const getSegmentIcon = (segmentLabel: string) => {
  const label = segmentLabel?.toLowerCase() || '';
  if (label.includes('todo') || label.includes('to do')) return FileText;
  if (label.includes('progress') || label.includes('inprogress')) return Clock;
  if (label.includes('review')) return Eye;
  if (label.includes('complete') || label.includes('completed')) return CheckCircle;
  if (label.includes('archive')) return Archive;
  return FileText; // fallback
};

console.log("segments",Columns);

const getSegmentColor = (segmentLabel: string) => {
  const label = segmentLabel?.toLowerCase() || '';
  if (label.includes('todo') || label.includes('to do')) return { color: "text-gray-600", bgColor: "bg-gray-100" };
  if (label.includes('progress') || label.includes('inprogress')) return { color: "text-blue-600", bgColor: "bg-blue-50" };
  if (label.includes('review')) return { color: "text-orange-600", bgColor: "bg-orange-50" };
  if (label.includes('complete') || label.includes('completed')) return { color: "text-green-600", bgColor: "bg-green-50" };
  if (label.includes('archive')) return { color: "text-gray-600", bgColor: "bg-gray-50" };
  return { color: "text-gray-600", bgColor: "bg-gray-100" };
};

export default function WorkspacePanel({ items, segments = [] }: WorkspacePanelProps) {
  const getItemsByStatus = (status: string) => {
    return items.filter((entry) => entry.status === status)
  }

  // Gather unique segment labels from items
  const segmentLabels = [...new Set(items.map(entry => entry.status))];
  
  // Extract segment labels from segments prop
  const providedSegmentLabels = segments.map(seg => seg.label.toLowerCase().replace(/\s+/g, ''));
  
  // Ensure default segments are present
  const defaultSegments = ['todo', 'inprogress', 'review', 'completed', 'archive'];
  const allSegmentLabels = [...new Set([...defaultSegments, ...segmentLabels, ...providedSegmentLabels])];

  console.log("All segment labels:", allSegmentLabels);
  console.log("Items:", items);
  console.log("Segments:", segments);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-start px-6">
      {allSegmentLabels.map((segmentLabel) => {
        const segmentItems = getItemsByStatus(segmentLabel)
        const Icon = getSegmentIcon(segmentLabel)
        const { color, bgColor } = getSegmentColor(segmentLabel)

        return (
          <div key={segmentLabel} className="bg-white rounded-lg shadow-sm">
            <div className={`${bgColor} p-2 m-2 rounded-lg`}>
              <div className="flex items-center space-x-2">
                <Icon className={`w-5 h-5 ${color}`} />
                <h3 className={`font-medium ${color}`}>
                  {segmentLabel.charAt(0).toUpperCase() + segmentLabel.slice(1).replace(/([A-Z])/g, " $1")}
                </h3>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {segmentItems.length > 0 ? (
                segmentItems.map((entry) => (
                  <ItemCard key={`${entry._id || entry.id}`} entry={entry} collaborators={[]} />
                ))
              ) : (
                <div className="text-center text-sm text-gray-500 py-10">
                  No items here.
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
