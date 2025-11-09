import { createContext, useState } from "react";

type DashboardContextType = {
    streakId: number | null;
    setStreakId: (Id: number | null) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}


export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [streakId, setStreakId] = useState<number | null>(null);
    return (
        <DashboardContext.Provider value={{ streakId, setStreakId, sidebarOpen, setSidebarOpen }}>
            {children}
        </DashboardContext.Provider>
    )
}


export default DashboardProvider

