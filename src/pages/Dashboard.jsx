import  { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { DashboardHeader } from '../components/DashboardHeader';
import {TablesGrid} from '../components/TablesGrid';
import {MenuPanel} from '../components/MenuPanel';
import {KitchenDashboard} from '../components/KitchenDashboard';

export  function Dashboard() {
  const [activeTab, setActiveTab] = useState('admin');
  const [currentView, setCurrentView] = useState('tables');
  

  return (
    <div className="flex h-screen bg-gray-100">
      {activeTab === 'admin' && <Sidebar currentView={currentView} setCurrentView={setCurrentView} />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-auto">
          {activeTab === 'kitchen' ? (
            <KitchenDashboard />
          ) : (
            <>
              {currentView === 'tables' && (
                <TablesGrid />
              )}
              {currentView === 'menu' && (
                <MenuPanel />
              )}
              {currentView === 'orders' && (
                <div className="p-8 text-center text-gray-600">
                  <h2 className="text-2xl font-bold">Orders View</h2>
                  <p>Orders management coming soon...</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export const RestaurantDash = Dashboard;
