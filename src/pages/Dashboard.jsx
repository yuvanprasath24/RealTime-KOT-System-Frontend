import  { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { DashboardHeader } from '../components/DashboardHeader';
import {TablesGrid} from '../components/TablesGrid';
import {MenuPanel} from '../components/MenuPanel';
import {KitchenDashboard} from '../components/KitchenDashboard';

export  function Dashboard() {
  const [activeTab, setActiveTab] = useState('admin');
  const [currentView, setCurrentView] = useState('tables');
  const [tables, setTables] = useState([
    { id: 1, name: 'table 1', isActive: true },
    { id: 2, name: 'table 2', isActive: true },
    { id: 3, name: 'table 3', isActive: false },
  ]);

  const addTable = () => {
    const newId = Math.max(...tables.map(t => t.id), 0) + 1;
    setTables([...tables, { id: newId, name: `table ${newId}`, isActive: true }]);
  };

  const deleteTable = (id) => {
    setTables(tables.filter(t => t.id !== id));
  };

  const toggleTable = (id) => {
    setTables(tables.map(t => 
      t.id === id ? { ...t, isActive: !t.isActive } : t
    ));
  };

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
                <TablesGrid 
                  tables={tables} 
                  onAddTable={addTable}
                  onDeleteTable={deleteTable}
                  onToggleTable={toggleTable}
                />
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
