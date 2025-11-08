type Day = {
  marked: boolean;
};

export const getStreakDataFromStorage = (streakId: number): Day[] | null => {
  try {
    const data = localStorage.getItem(`streak_${streakId}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

export const saveStreakDataToStorage = (
  streakId: number,
  days: Day[]
): void => {
  try {
    localStorage.setItem(`streak_${streakId}`, JSON.stringify(days));
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
