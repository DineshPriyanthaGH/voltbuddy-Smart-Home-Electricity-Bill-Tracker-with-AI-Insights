// import React, { useState } from 'react';
import Alert from '../components/Alert';
import InfoCard from '../components/InfoCard';
import Navbar from '../dashboard/Navbar';

// Assuming NavBar is already created and imported
// import NavBar from '../components/NavBar';

export default function BillDetection() {
//   const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Bill Increase Detection</h1>
        <p className="text-sm text-gray-600 mb-6">We monitor your electricity usage to help you save money.</p>
        

        <Alert 
            type="warning" 
            icon={
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            }
            // onClose={() => setShowAlert(false)
                
            // }
          >
            <div>
              <p className="font-medium">Your electricity bill has increased by 30%</p>
              <p className="text-sm">We've detected an unusual increase in your electricity consumption.</p>
            </div>
          </Alert>
            
        {/* {showAlert && (
          <Alert 
            type="warning" 
            icon={
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            }
            onClose={() => setShowAlert(false)}
          >
            <div>
              <p className="font-medium">Your electricity bill has increased by 30%</p>
              <p className="text-sm">We've detected an unusual increase in your electricity consumption.</p>
            </div>
          </Alert>
        )} */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          
          
        </div>
        
        <InfoCard title="Your Electricity Usage" className="mb-8">
          <div className="bg-gray-100 p-8 rounded-md flex items-center justify-center h-64">
            <p className="text-gray-500">Usage chart visualization would appear here</p>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}
