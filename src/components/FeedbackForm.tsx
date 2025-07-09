import React, { useState } from 'react';
import { Send, Star, AlertCircle, CheckCircle } from 'lucide-react';
import { Feedback } from '../types/feedback';
import { generateId } from '../utils/storage';

interface FeedbackFormProps {
  onSubmit: (feedback: Feedback) => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general' as const,
    subject: '',
    message: '',
    rating: 0
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    if (formData.rating === 0) {
      newErrors.rating = 'Please provide a rating';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newFeedback: Feedback = {
      id: generateId(),
      ...formData,
      timestamp: new Date(),
      status: 'new'
    };

    onSubmit(newFeedback);

    setFormData({
      name: '',
      email: '',
      category: 'general',
      subject: '',
      message: '',
      rating: 0
    });
    setErrors({});
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const categoryOptions = [
    { value: 'bug', label: 'Bug Report', color: 'text-red-600' },
    { value: 'feature', label: 'Feature Request', color: 'text-blue-600' },
    { value: 'general', label: 'General Feedback', color: 'text-green-600' },
    { value: 'complaint', label: 'Complaint', color: 'text-orange-600' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
          <Send className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Share Your Feedback</h2>
      </div>

      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          <p className="text-green-700">Thank you for your feedback! We appreciate your input.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 ${
                errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
              } focus:outline-none`}
              placeholder="Full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 ${
                errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
              } focus:outline-none`}
              placeholder="Your.email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-200"
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 ${
              errors.subject ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
            } focus:outline-none`}
            placeholder="Brief description of your feedback"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 resize-none ${
              errors.message ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
            } focus:outline-none`}
            placeholder="Please provide detailed feedback..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className={`p-1 rounded-full transition-colors duration-200 ${
                  star <= formData.rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                }`}
              >
                <Star className="w-6 h-6 fill-current" />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'No rating'}
            </span>
          </div>
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.rating}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
            isSubmitting
              ? 'opacity-75 cursor-not-allowed'
              : 'hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02]'
          } flex items-center justify-center`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit Feedback
            </>
          )}
        </button>
      </form>
    </div>
  );
};