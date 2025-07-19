"use client";

import React, { useState } from 'react';
import { Mail, Download, FileText, Loader, Check, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

export default function BillHistoryExportButton({ billHistory, userEmail }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleGeneratePDF = async () => {
    if (!billHistory || billHistory.length === 0) {
      toast.error('No bill history data available to export');
      return;
    }

    setIsGeneratingPDF(true);
    setIsDropdownOpen(false);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/bill-history-email/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          billHistory: billHistory,
          userEmail: userEmail
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VoltBuddy-Bill-History-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('📄 Bill history PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSendEmail = async () => {
    if (!billHistory || billHistory.length === 0) {
      toast.error('No bill history data available to send');
      return;
    }

    if (!userEmail) {
      toast.error('User email not available');
      return;
    }

    setIsSendingEmail(true);
    setIsDropdownOpen(false);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/bill-history-email/send-bill-history-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userEmail: userEmail,
          billHistory: billHistory
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if email service is not available
        if (response.status === 503 || data.fallback === 'download') {
          toast.error(`📧 ${data.message || 'Email service not available'}`);
          toast.info('🔄 Switching to PDF download...');
          
          // Automatically trigger PDF download as fallback
          setTimeout(() => {
            handleGeneratePDF();
          }, 1500);
          return;
        }
        
        throw new Error(data.error || 'Failed to send email');
      }

      if (data.success) {
        toast.success('📧 Bill history report sent to your email successfully!');
      } else {
        // Handle partial success (email failed but PDF generated)
        toast.warning(`⚠️ ${data.message || 'Email delivery failed'}`);
        if (data.fallback === 'download') {
          toast.info('🔄 Switching to PDF download...');
          setTimeout(() => {
            handleGeneratePDF();
          }, 1500);
        }
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email. Please try again.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const paidBills = billHistory ? billHistory.filter(bill => bill.status === 'Paid') : [];
  const unpaidBills = billHistory ? billHistory.filter(bill => bill.status === 'Unpaid') : [];
  const totalBills = billHistory ? billHistory.length : 0;

  return (
    <div className="relative">
      {/* Main Export Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        disabled={isGeneratingPDF || isSendingEmail}
        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FileText className="w-5 h-5" />
        <span>Export Bill History</span>
        <div className="ml-2 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg text-xs">
          {totalBills} bills
        </div>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsDropdownOpen(false)}
          ></div>
          
          {/* Dropdown Content */}
          <div className="absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-blue-100/50 z-20 p-4">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Export Options</h3>
                <p className="text-sm text-gray-600">Choose your export format</p>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Bill Summary</h4>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center">
                  <div className="font-bold text-blue-600">{totalBills}</div>
                  <div className="text-gray-600">Total</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-600">{paidBills.length}</div>
                  <div className="text-gray-600">Paid</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-red-600">{unpaidBills.length}</div>
                  <div className="text-gray-600">Unpaid</div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="space-y-3">
              {/* Download PDF Option */}
              <button
                onClick={handleGeneratePDF}
                disabled={isGeneratingPDF || isSendingEmail}
                className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isGeneratingPDF ? (
                  <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                ) : (
                  <Download className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                )}
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900">Download PDF</div>
                  <div className="text-sm text-gray-600">
                    {isGeneratingPDF ? 'Generating PDF...' : 'Get comprehensive report with tables'}
                  </div>
                </div>
              </button>

              {/* Send Email Option */}
              <button
                onClick={handleSendEmail}
                disabled={isGeneratingPDF || isSendingEmail || !userEmail}
                className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSendingEmail ? (
                  <Loader className="w-5 h-5 text-green-600 animate-spin" />
                ) : userEmail ? (
                  <Mail className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900">
                    {isSendingEmail ? 'Sending...' : 'Email Report'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isSendingEmail 
                      ? 'Preparing email...' 
                      : !userEmail 
                        ? 'Email not available' 
                        : 'Send PDF to your email (if service available)'
                    }
                  </div>
                </div>
              </button>

              {/* Email Service Status Notice */}
              <div className="text-xs text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-2 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span>Note: If email service is unavailable, PDF download will be offered automatically.</span>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Report includes paid/unpaid bills, consumption analysis, and trends
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
