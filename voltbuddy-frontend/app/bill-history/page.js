'use client';
import React from 'react';
import Navbar from '../dashboard/Navbar';
import BillHistoryPage from '../bill-history/components/BillHistory';
import { Footer } from '../dashboard/Footer';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <BillHistoryPage />
      </main>
      <Footer />
    </div>
  );
}
