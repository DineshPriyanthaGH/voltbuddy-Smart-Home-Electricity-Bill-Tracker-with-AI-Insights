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
          <InfoCard title="Actionable Tips">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Optimal Usage Times</h4>
                  <p className="text-sm text-gray-500">Turn off the AC during the day or use it during off-peak hours.</p>
                </div>
              </li>
              
              {/* <li className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Energy Efficient Appliances</h4>
                  <p className="text-sm text-gray-500">Switch to energy-efficient appliances to lower your bills.</p>
                </div>
              </li> */}
              
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Reduce Standby Power</h4>
                  <p className="text-sm text-gray-500">Unplug devices that are not in use to avoid phantom energy usage.</p>
                </div>
              </li>
            </ul>
          </InfoCard>

          <InfoCard title="Potential Causes">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Higher Appliance Usage</h4>
                  <p className="text-sm text-gray-500">Your air conditioner might be using more power than needed.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-yellow-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Extreme Weather</h4>
                  <p className="text-sm text-gray-500">High temperatures have caused an increase in AC usage.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-red-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Faulty Appliances</h4>
                  <p className="text-sm text-gray-500">Check if your refrigerator is consuming more power than needed.</p>
                </div>
              </li>
            </ul>
          </InfoCard>
          <InfoCard title="Potential Causes">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Higher Appliance Usage</h4>
                  <p className="text-sm text-gray-500">Your air conditioner might be using more power than needed.</p>
                </div>
              </li>n</ul>
            </InfoCard>
          
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
