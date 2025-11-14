type Day = {
  marked: boolean;
};

type StreakData = {
  days: Day[];
  startDate: string;
  endDate: string;
};

export const getStreakDataFromStorage = (streakId: number): StreakData | null => {
  try {
    const data = localStorage.getItem(`streak_${streakId}`);
    if (!data) return null;
    
    const parsed = JSON.parse(data);
    // Handle legacy format 
    if (Array.isArray(parsed)) {
      return null; // Return null to trigger recalculation
    }
    return parsed;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

export const saveStreakDataToStorage = (
  streakId: number,
  days: Day[],
  startDate: string,
  endDate: string
): void => {
  try {
    const data: StreakData = {
      days,
      startDate,
      endDate
    };
    localStorage.setItem(`streak_${streakId}`, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const deleteStreakDataFromStorage = (streakId: number): void => {
  try {
    localStorage.removeItem(`streak_${streakId}`);
  } catch (error) {
    console.error("Error deleting from localStorage:", error);
  }
};
