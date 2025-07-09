import { Feedback } from '../types/feedback';

const STORAGE_KEY = 'user-feedback-data';

export const loadFeedback = (): Feedback[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return parsed.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));
    }
  } catch (error) {
    console.error('Error loading feedback:', error);
  }
  return [];
};

export const saveFeedback = (feedback: Feedback[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
  } catch (error) {
    console.error('Error saving feedback:', error);
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};