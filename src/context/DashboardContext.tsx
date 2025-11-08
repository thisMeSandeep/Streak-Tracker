import { createContext, useState } from "react";

type DashboardContextType = {
    streakId: number | null;
    setStreakId: (Id: number | null) => void;
}


export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const [streakId, setStreakId] = useState<number | null>(null);
    return (
        <DashboardContext.Provider value={{ streakId, setStreakId }}>
            {children}
        </DashboardContext.Provider>
    )
}


export default DashboardProvider

