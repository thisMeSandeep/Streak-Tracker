import { useState } from "react"
import { X } from "lucide-react"
import ReactDOM from "react-dom"
import type { Streak } from "../types/types";
import { useStreak } from "../hooks/useStreak";



type InputType = {
    name: string;
    value: string;
}

type PopupType = {
    streakData: Streak | null;
    onClose: () => void;
}

const AddStreakPopup = ({ streakData, onClose }: PopupType) => {
    const [streak, setStreak] = useState<Streak>({
        id: streakData?.id ?? Date.now(),
        title: streakData?.title ?? "",
        startDate: streakData?.startDate ?? "",
        endDate: streakData?.endDate ?? ""
    });
    const [error, setError] = useState<string>('')

    const { addStreak } = useStreak()

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value }: InputType = e.target
        setStreak({ ...streak, [name]: value })
        if (error) setError('')
    }

    const createStreak = () => {
        try {
            if (!streak.title || !streak.startDate || !streak.endDate) {
                throw new Error('Please fill in all fields')
            }
            if (new Date(streak.startDate) > new Date(streak.endDate)) {
                throw new Error('Start date must be before end date')
            }
            if (streak.title.trim() === "") {
                throw new Error('Title cannot be empty')
            }

            addStreak(streak)
            // clear the fields
            setStreak({ id: Date.now(), title: "", startDate: "", endDate: "" })
            onClose()

        } catch (err) {
            const message = err instanceof Error ? err.message : 'Something went wrong'
            setError(message)
        }
    }

    return ReactDOM.createPortal(
        (
            <div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <div
                    className="bg-white rounded-lg shadow-lg w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">{streakData ? 'Update Streak' : 'Add a new Streak'}</h2>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="p-6 space-y-4">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={streak.title}
                                onChange={handleOnChange}
                                placeholder="Enter streak title"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                                Start Date
                            </label>
                            <input
                                id="startDate"
                                name="startDate"
                                type="date"
                                value={streak.startDate}
                                onChange={handleOnChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                                End Date
                            </label>
                            <input
                                id="endDate"
                                name="endDate"
                                type="date"
                                value={streak.endDate}
                                onChange={handleOnChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={createStreak}
                            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded"
                        >
                            {streakData ? 'Update Streak' : 'Create Streak'}
                        </button>
                    </div>
                </div>
            </div>
        ),
        document.body
    )
}


export default AddStreakPopup