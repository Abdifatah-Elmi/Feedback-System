import React, { useState, useEffect } from 'react';
import { MessageSquare, Users, TrendingUp, Star } from 'lucide-react';
import { Feedback } from './types/feedback';
import { FeedbackForm } from './components/FeedbackForm';
import { FeedbackList } from './components/FeedbackList';
import { loadFeedback, saveFeedback } from './utils/storage';

function App() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  useEffect(() => {
    setFeedback(loadFeedback());
  }, []);

  const handleSubmitFeedback = (newFeedback: Feedback) => {
    const updatedFeedback = [newFeedback, ...feedback];
    setFeedback(updatedFeedback);
    saveFeedback(updatedFeedback);
  };

  const handleStatusChange = (id: string, status: Feedback['status']) => {
    const updatedFeedback = feedback.map(item =>
      item.id === id ? { ...item, status } : item
    );
    setFeedback(updatedFeedback);
    saveFeedback(updatedFeedback);
  };

  const getHeaderStats = () => {
    const total = feedback.length;
    const uniqueUsers = new Set(feedback.map(f => f.email)).size;
    const averageRating = feedback.length > 0
      ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length
      : 0;
    const recentFeedback = feedback.filter(f => 
      new Date().getTime() - f.timestamp.getTime() < 24 * 60 * 60 * 1000
    ).length;

    return { total, uniqueUsers, averageRating, recentFeedback };
  };

  const headerStats = getHeaderStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Feedback Center</h1>
                <p className="text-lg text-gray-600">Share your thoughts and help us improve</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Feedback</p>
                  <p className="text-2xl font-bold">{headerStats.total}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Unique Users</p>
                  <p className="text-2xl font-bold">{headerStats.uniqueUsers}</p>
                </div>
                <Users className="w-8 h-8 text-purple-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm font-medium">Average Rating</p>
                  <p className="text-2xl font-bold">{headerStats.averageRating.toFixed(1)}</p>
                </div>
                <Star className="w-8 h-8 text-pink-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Today's Feedback</p>
                  <p className="text-2xl font-bold">{headerStats.recentFeedback}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-200" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="xl:col-span-1">
            <FeedbackForm onSubmit={handleSubmitFeedback} />
          </div>

          {/* Feedback List */}
          <div className="xl:col-span-2">
            <FeedbackList feedback={feedback} onStatusChange={handleStatusChange} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;