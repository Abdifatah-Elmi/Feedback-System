import React from 'react';
import { Star, Clock, User, Mail, MessageCircle, Bug, Lightbulb, MessageSquare, AlertTriangle } from 'lucide-react';
import { Feedback } from '../types/feedback';

interface FeedbackItemProps {
  feedback: Feedback;
  onStatusChange: (id: string, status: Feedback['status']) => void;
}

export const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback, onStatusChange }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bug':
        return <Bug className="w-5 h-5 text-red-600" />;
      case 'feature':
        return <Lightbulb className="w-5 h-5 text-blue-600" />;
      case 'general':
        return <MessageSquare className="w-5 h-5 text-green-600" />;
      case 'complaint':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default:
        return <MessageCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'bug':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'feature':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'general':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'complaint':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getCategoryIcon(feedback.category)}
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">{feedback.subject}</h3>
              <div className="flex items-center space-x-4 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(feedback.category)}`}>
                  {feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1)}
                </span>
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < feedback.rating ? 'fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">({feedback.rating})</span>
                </div>
              </div>
            </div>
          </div>
          <select
            value={feedback.status}
            onChange={(e) => onStatusChange(feedback.id, e.target.value as Feedback['status'])}
            className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer ${getStatusColor(feedback.status)}`}
          >
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {feedback.name}
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              {feedback.email}
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {formatDate(feedback.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};