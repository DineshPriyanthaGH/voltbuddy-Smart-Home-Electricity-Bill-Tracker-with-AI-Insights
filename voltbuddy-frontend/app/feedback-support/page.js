"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';

export default function FeedbackSupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'feedback',
    message: '',
    rating: 5
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'feedback',
        message: '',
        rating: 5
      });
    } catch (err) {
      setError('There was an error submitting your form. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow container my-10 mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 p-6 text-white">
            <h1 className="text-2xl font-bold">We Value Your Feedback</h1>
            <p className="mt-2">Help us improve VoltBuddy by sharing your thoughts and experiences.</p>
          </div>
          
          <div className="p-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      I want to
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="feedback">Provide Feedback</option>
                      <option value="support">Get Customer Support</option>
                      <option value="bug">Report a Bug</option>
                      <option value="feature">Request a Feature</option>
                    </select>
                  </div>
                  
                  {formData.subject === 'feedback' && (
                    <div>
                      <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                        How would you rate your experience with VoltBuddy?
                      </label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, rating }))}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              formData.rating >= rating ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Please provide as much detail as possible..."
                    ></textarea>
                  </div>
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-md">
                    {error}
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Your Feedback!</h2>
                <p className="text-gray-600 mb-6">
                  We appreciate you taking the time to share your thoughts with us. Your feedback helps us improve VoltBuddy.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit Another Response
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-5">
              <h3 className="font-bold text-lg text-gray-800">How can I track my electricity usage with VoltBuddy?</h3>
              <p className="mt-2 text-gray-600">
                VoltBuddy automatically retrieves your electricity bill data via SMS. Once you sign up, our system will analyze your consumption patterns and provide AI-driven insights to help optimize your usage.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-5">
              <h3 className="font-bold text-lg text-gray-800">Is my personal data secure with VoltBuddy?</h3>
              <p className="mt-2 text-gray-600">
                Yes, we take data security very seriously. All your personal information and bill data are encrypted and stored securely. We never share your data with third parties without your explicit consent.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-5">
              <h3 className="font-bold text-lg text-gray-800">How much can I save using VoltBuddy?</h3>
              <p className="mt-2 text-gray-600">
                On average, our users save 10-15% on their electricity bills after implementing VoltBuddy's recommendations. The exact amount varies based on your current usage patterns and how consistently you follow the optimization suggestions.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-5">
              <h3 className="font-bold text-lg text-gray-800">How do I get started with VoltBuddy?</h3>
              <p className="mt-2 text-gray-600">
                Getting started is simple! Just sign up with your mobile number, and we'll guide you through a quick setup process. You'll start receiving SMS notifications about your electricity bills, and our AI will begin generating insights to help you save.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Saving on Your Electricity Bills?</h2>
          <p className="text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of users who are already reducing their energy costs with VoltBuddy.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-md font-medium hover:bg-blue-50 shadow-md">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
