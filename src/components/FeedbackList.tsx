import React, { useState } from 'react';
import { Search, Filter, MessageSquare, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Feedback } from '../types/feedback';
import { FeedbackItem } from './FeedbackItem';

interface FeedbackListProps {
  feedback: Feedback[];
  onStatusChange: (id: string, status: Feedback['status']) => void;
}

export const FeedbackList: React.FC<FeedbackListProps> = ({ feedback, onStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredFeedback = feedback.filter(item => {
    const matchesSearch = item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStats = () => {
    const total = feedback.length;
    const newCount = feedback.filter(f => f.status === 'new').length;
    const inProgressCount = feedback.filter(f => f.status === 'in-progress').length;
    const resolvedCount = feedback.filter(f => f.status === 'resolved').length;
    const averageRating = feedback.length > 0 
      ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
      : '0';

    return { total, newCount, inProgressCount, resolvedCount, averageRating };
  };

  const stats = getStats();

  if (feedback.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No feedback yet</h3>
        <p className="text-gray-500">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New</p>
              <p className="text-2xl font-bold text-blue-600">{stats.newCount}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.inProgressCount}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">{stats.resolvedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-200"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-200"
            >
              <option value="all">All Categories</option>
              <option value="bug">Bug Reports</option>
              <option value="feature">Feature Requests</option>
              <option value="general">General Feedback</option>
              <option value="complaint">Complaints</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-200"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feedback Items */}
      <div className="space-y-4">
        {filteredFeedback.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No feedback matches your filters</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredFeedback.map((item) => (
            <FeedbackItem
              key={item.id}
              feedback={item}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};