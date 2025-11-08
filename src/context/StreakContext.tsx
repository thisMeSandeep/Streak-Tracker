import React, { createContext, useState, useEffect } from "react";
import { type Streak } from "../types/types";

type StreakContextType = {
    streaks: Streak[];
    addStreak: (streak: Streak) => void;
    deleteStreak: (streak: Streak) => void;
    updateStreak: (streak: Streak) => void;
};

export const StreakContext = createContext<StreakContextType | undefined>(undefined);

const STREAKS_KEY = "streaks";

const StreakProvider = ({ children }: { children: React.ReactNode }) => {
    const [streaks, setStreaks] = useState<Streak[]>([]);

    // Load streaks from localStorage 
    useEffect(() => {
        const stored = localStorage.getItem(STREAKS_KEY);
        if (stored) {
            try {
                setStreaks(JSON.parse(stored));
            } catch (err) {
                console.error("Error parsing streaks from localStorage:", err);
            }
        }
    }, []);

    // Persist streaks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem(STREAKS_KEY, JSON.stringify(streaks));
    }, [streaks]);

    // Add a new streak
    const addStreak = (streak: Streak) => {
        setStreaks((prev) => [...prev, streak]);
    };

    // Delete a streak
    const deleteStreak = (streak: Streak) => {
        setStreaks((prev) => prev.filter((s) => s.id !== streak.id));
    };

    //  Update a streak
    const updateStreak = (streak: Streak) => {
        setStreaks((prev) => prev.map((s) => (s.id === streak.id ? streak : s)));
    };

    return (
        <StreakContext.Provider value={{ streaks, addStreak, deleteStreak, updateStreak }}>
            {children}
        </StreakContext.Provider>
    );
};

export default StreakProvider;
