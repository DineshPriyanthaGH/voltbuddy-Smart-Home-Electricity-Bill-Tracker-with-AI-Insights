import React, { useEffect, useState } from 'react';
import { TrendingUpIcon, TrendingDownIcon, BarChart3Icon } from 'lucide-react';
import { useDataRefresh } from '../context/DataRefreshContext';
import { toast } from 'react-toastify';

export default function DashboardPredictionTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { refreshTrigger, lastUpdated } = useDataRefresh();

  useEffect(() => {
    async function fetchPrediction() {
      const isInitialLoad = data.length === 0;
      
      if (!isInitialLoad) {
        setIsRefreshing(true);
        toast.info('🔄 Refreshing predictions...', { 
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      
      setLoading(isInitialLoad); // Only show skeleton on initial load
      setError('');
      
      try {
        const token = localStorage.getItem('token');

        console.log(' Fetching predictions (Dashboard)...', { 
          timestamp: new Date().toISOString(),
          refreshTrigger,
          lastUpdated: lastUpdated.predictions,
          isRefresh: !isInitialLoad
        });

        const res = await fetch('http://localhost:5001/api/energy-tips/predictions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({}),
        });
        const r = await res.json();
        if (res.ok && r.prediction) {
          setData(
            r.prediction.predictionTable.slice(0, 4).map((row) => ({
              month: row.month,
              current: row.currentConsumption || null,
              predicted: row.predictedConsumption || null,
            }))
          );
          console.log(' Predictions updated (Dashboard)', r.prediction.predictionTable.length);
          
          if (!isInitialLoad) {
            toast.success('Predictions updated!', { 
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        } else {
          setError(r.message || 'Failed to load predictions');
        }
      } catch (err) {
        setError('Could not fetch predictions. Please try again.');
        console.error('❌ Error fetching predictions:', err);
        
        if (!isInitialLoad) {
          toast.error('❌ Failed to refresh predictions', { 
            position: "bottom-right",
            autoClose: 3000,
          });
        }
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    }
    fetchPrediction();
  }, [refreshTrigger, lastUpdated.predictions]); // Re-fetch when refresh is triggered

  const calculateTrend = (current, predicted) => {
    if (!current || !predicted) return null;
    const change = ((predicted - current) / current) * 100;
    return {
      percentage: Math.abs(change).toFixed(1),
      isIncrease: change > 0,
      isDecrease: change < 0,
    };
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 
                    transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] 
                    bg-gradient-to-br from-white/80 to-blue-50/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-transparent flex items-center space-x-3" 
            style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                    WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
          <div className="p-2 rounded-xl text-white shadow-lg" 
               style={{background: 'linear-gradient(to bottom right, #2441E1, #3B82F6)'}}>
            <BarChart3Icon className="h-6 w-6" />
          </div>
          <span>Usage Predictions</span>
          {(loading || isRefreshing) && (
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          )}
        </h2>
      </div>

      {loading && (
        <div className="space-y-3">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="bg-gray-200 animate-pulse rounded-xl h-14"></div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-4 mb-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <span className="text-red-700 font-medium text-sm">{error}</span>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-hidden">
          <div className="space-y-3">
            {data.map((row, idx) => {
              const trend = calculateTrend(row.current, row.predicted);
              return (
                <div
                  key={idx}
                  className="group bg-gradient-to-br from-white/90 to-gray-50/80 
                           backdrop-blur-sm rounded-xl p-4 border border-white/30 
                           shadow-md hover:shadow-lg transform transition-all duration-300 
                           hover:scale-[1.02] hover:from-white hover:to-blue-50/80"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-800 group-hover:text-blue-700 
                                    transition-colors duration-300">{row.month}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">
                          Current: <span className="font-semibold text-gray-800">{row.current || 'N/A'} kWh</span>
                        </span>
                        <span className="text-sm text-gray-600">
                          Predicted: <span className="font-semibold text-blue-600">{row.predicted || 'N/A'} kWh</span>
                        </span>
                      </div>
                    </div>
                    
                    {trend && (
                      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold
                        ${trend.isIncrease 
                          ? 'bg-red-100 text-red-700' 
                          : trend.isDecrease 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                        {trend.isIncrease ? (
                          <TrendingUpIcon className="h-4 w-4" />
                        ) : trend.isDecrease ? (
                          <TrendingDownIcon className="h-4 w-4" />
                        ) : null}
                        <span>{trend.percentage}%</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <a 
              href="/ai-insights"
              className="group inline-flex items-center px-6 py-3 rounded-xl text-base font-bold text-white
                        shadow-lg hover:shadow-xl transform transition-all duration-300 
                        hover:scale-105 relative overflow-hidden"
              style={{background: 'linear-gradient(to right, #2441E1, #3B82F6)'}}
            >
              <span className="relative z-10 mr-2">View All Predictions</span>
              <BarChart3Icon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
