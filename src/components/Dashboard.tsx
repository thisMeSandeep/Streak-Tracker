import { useState, useEffect } from "react"
import { Check, Calendar } from "lucide-react"
import type { Streak } from "../types/types"
import { useDashboard } from "../hooks/useDashboard"
import { useStreak } from "../hooks/useStreak"
import { getStreakDataFromStorage, saveStreakDataToStorage } from "../utils/localStorageUtils"

function countDays(startDate: string, endDate: string): number {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diff = end.getTime() - start.getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1
}

type Day = {
    marked: boolean;
}


const Dashboard = () => {
    const [streak, setStreak] = useState<Streak | null>(null)
    const [days, setDays] = useState<Day[]>([])
    const [error, setError] = useState<string | null>(null)

    const { streakId } = useDashboard()
    const { getStreakDetails } = useStreak()

    useEffect(() => {
        if (!streakId) {
            setStreak(null)
            setDays([])
            setError(null)
            return
        }

        const s = getStreakDetails(streakId)

        if (!s) {
            setStreak(null)
            setDays([])
            setError("No streak found with this ID.")
            return
        }

        setError(null)
        setStreak(s)
    }, [streakId, getStreakDetails])

    useEffect(() => {
        if (!streak) {
            return
        }

        //  load existing data from localStorage
        const savedData = getStreakDataFromStorage(streak.id)

        if (savedData) {
            // Use saved data if it exists
            setDays(savedData)
        } else {
            // Create new data if no saved data exists
            const numDays = countDays(streak.startDate, streak.endDate)
            const newDays = Array.from({ length: numDays }, () => ({ marked: false }))
            setDays(newDays)
            // Save the initial state
            saveStreakDataToStorage(streak.id, newDays)
        }
    }, [streak])

    const handleToggle = (index: number) => {
        if (!streak) return

        const newDays = [...days]
        newDays[index].marked = !newDays[index].marked
        setDays(newDays)

        // Save to localStorage whenever a day is toggled
        saveStreakDataToStorage(streak.id, newDays)
    }

    if (error) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            </div>
        )
    }

    if (!streak) {
        return (
            <div className="h-full flex items-center justify-center py-10">
                <div className="text-center">
                    <p className="text-sm text-gray-500">No streak selected</p>
                    <p className="text-xs text-gray-400 mt-1">Create a streak to get started</p>
                </div>
            </div>
        )
    }

    const completedDays = days.filter(day => day.marked).length
    const totalDays = days.length
    const progressPercentage = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0

    return (
        <div className="h-full overflow-y-auto px-4">
            {/* Header */}
            <div className="border-b border-gray-200 p-6">
                <h1 className="text-2xl lg:text-3xl font-medium text-gray-700 mb-3">{streak.title}</h1>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Calendar size={16} />
                    <span>{new Date(streak.startDate).toLocaleDateString()} - {new Date(streak.endDate).toLocaleDateString()}</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{completedDays} / {totalDays} days ({progressPercentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Days Grid */}
            <div className="p-6">
                <div className="grid grid-cols-5 lg:grid-cols-10 gap-2 place-items-center">
                    {days.map((day, i) => (
                        <div
                            key={i}
                            onClick={() => handleToggle(i)}
                            className={`
                                relative flex items-center justify-center 
                                w-10 h-10 rounded cursor-pointer border transition-colors
                                ${day.marked
                                    ? "bg-green-500 border-green-600 text-white"
                                    : "bg-white border-gray-300 hover:border-gray-400 text-gray-700"}
                            `}
                        >
                            {day.marked ? (
                                <Check size={16} />
                            ) : (
                                <span className="text-xs font-medium">{i + 1}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard