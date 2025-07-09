export interface Feedback {
  id: string;
  name: string;
  email: string;
  category: 'bug' | 'feature' | 'general' | 'complaint';
  subject: string;
  message: string;
  rating: number;
  timestamp: Date;
  status: 'new' | 'in-progress' | 'resolved';
}