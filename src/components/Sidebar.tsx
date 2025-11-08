import { useState } from "react"
import { Plus, Trash2, Edit, Calendar } from "lucide-react"
import { useStreak } from "../hooks/useStreak"
import AddStreakPopup from "./AddStreakPopup"
import { Activity } from "react"
import type { Streak } from "../types/types"


const Sidebar = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedStreak, setSelectedStreak] = useState<Streak | null>(null)
  const { streaks, deleteStreak } = useStreak()

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setOpenPopup(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} />
          Add New Streak
        </button>
      </div>

      {/* Sidebar Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {streaks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No streaks yet</p>
            <p className="text-xs mt-1">Create your first streak to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {streaks.map((streak) => (
              <div
                key={streak.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                {/* Streak Title */}
                <h3 className="font-medium text-gray-900 mb-3">{streak.title}</h3>

                {/* Dates */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar size={14} />
                    <span>Start: {new Date(streak.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar size={14} />
                    <span>End: {new Date(streak.endDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedStreak(streak)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStreak(streak)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 border border-red-300 rounded hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popup  */}
      <Activity mode={openPopup || selectedStreak ? 'visible' : 'hidden'}>
        <AddStreakPopup streakData={selectedStreak} onClose={() => {
          setOpenPopup(false);
          setSelectedStreak(null);
        }} />
      </Activity>
    </div>
  )
}

export default Sidebar