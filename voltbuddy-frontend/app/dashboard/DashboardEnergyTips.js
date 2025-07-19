import React, { useEffect, useState } from 'react';
import { LightbulbIcon, ThermometerIcon, TvIcon, PlugZapIcon, ArrowRightIcon } from 'lucide-react';
import { useDataRefresh } from '../context/DataRefreshContext';
import { toast } from 'react-toastify';

const iconMap = {
  led: <LightbulbIcon className="h-6 w-6 text-yellow-400" />,
  thermostat: <ThermometerIcon className="h-6 w-6" style={{color: '#2441E1'}} />,
  tv: <TvIcon className="h-6 w-6" style={{color: '#2441E1'}} />,
  plug: <PlugZapIcon className="h-6 w-6" style={{color: '#2441E1'}} />,
};

function getIconForTip(title) {
  title = title.toLowerCase();
  if (title.includes('led')) return iconMap.led;
  if (title.includes('thermostat')) return iconMap.thermostat;
  if (title.includes('tv')) return iconMap.tv;
  if (title.includes('plug') || title.includes('unplug')) return iconMap.plug;
  return <LightbulbIcon className="h-6 w-6 text-yellow-400" />;
}

export default function DashboardEnergyTips() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { refreshTrigger, lastUpdated } = useDataRefresh();

  useEffect(() => {
    async function fetchTips() {
      const isInitialLoad = tips.length === 0;
      
      if (!isInitialLoad) {
        setIsRefreshing(true);
        toast.info('🔄 Refreshing energy tips...', { 
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
        const billHistory = JSON.parse(localStorage.getItem('billHistory') || '[]');
        const applianceUsage = JSON.parse(localStorage.getItem('applianceUsage') || '[]');

        console.log('🔄 Fetching energy tips (Dashboard)...', { 
          timestamp: new Date().toISOString(),
          refreshTrigger,
          lastUpdated: lastUpdated.energyTips,
          isRefresh: !isInitialLoad
        });

        const res = await fetch('http://localhost:5001/api/energy-tips', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
          body: JSON.stringify({
            billHistory,
            applianceUsage,
          }),
        });
        const data = await res.json();
        if (res.ok && data.tips) {
          setTips(data.tips.slice(0, 4)); // Only show first 4 tips
          console.log('Energy tips updated (Dashboard)', data.tips.length);
          
          if (!isInitialLoad) {
            toast.success('Energy tips updated!', { 
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        } else {
          setError(data.message || 'Failed to load tips');
        }
      } catch (e) {
        setError('Could not fetch energy tips. Please try again.');
        console.error('❌ Error fetching energy tips:', e);
        
        if (!isInitialLoad) {
          toast.error('❌ Failed to refresh energy tips', { 
            position: "bottom-right",
            autoClose: 3000,
          });
        }
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    }
    fetchTips();
  }, [refreshTrigger, lastUpdated.energyTips]); // Re-fetch when refresh is triggered

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 
                    transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] 
                    bg-gradient-to-br from-white/80 to-green-50/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-transparent flex items-center space-x-3" 
            style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                    WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
          <div className="p-2 rounded-xl text-white shadow-lg" 
               style={{background: 'linear-gradient(to bottom right, #2441E1, #3B82F6)'}}>
            <LightbulbIcon className="h-6 w-6 text-yellow-400" />
          </div>
          <span>Energy Tips</span>
          {(loading || isRefreshing) && (
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          )}
        </h2>
        {tips.length > 0 && !loading && (
          <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-green-100 
                         text-emerald-700 text-sm font-bold px-4 py-2 rounded-full border border-emerald-200
                         shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>{tips.length} Tips</span>
          </div>
        )}
      </div>

      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="bg-gray-200 animate-pulse rounded-2xl h-16"></div>
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

      <div className="space-y-4">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="group relative bg-gradient-to-br from-white/90 to-gray-50/80 
                       backdrop-blur-sm rounded-xl p-4 border border-white/30 
                       shadow-md hover:shadow-lg transform transition-all duration-300 
                       hover:scale-[1.02] hover:from-white hover:to-green-50/80"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                {getIconForTip(tip.title)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-800 group-hover:text-green-700 
                              transition-colors duration-300 mb-1 truncate">{tip.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 
                             transition-colors duration-300 line-clamp-2">
                  {tip.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && !error && (
        <div className="mt-6 text-center">
          <a 
            href="/ai-insights"
            className="group inline-flex items-center px-6 py-3 rounded-xl text-base font-bold text-white
                      shadow-lg hover:shadow-xl transform transition-all duration-300 
                      hover:scale-105 relative overflow-hidden"
            style={{background: 'linear-gradient(to right, #10B981, #059669)'}}
          >
            <span className="relative z-10 mr-2">More Tips</span>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
          </a>
        </div>
      )}
    </div>
  );
}
