'use client';

import { Menu, Table, Utensils, ListOrdered, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUser } from '../configurations/GetUser';

export function Sidebar({ currentView, setCurrentView }) {
  const [userName, setUserName] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Controls modal visibility

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setUserName(user.username);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  // Wipes token state vectors and routes execution to Spring Boot invalidation endpoint
  const executeLogout = () => {
    localStorage.removeItem('APP_TOKEN');
    sessionStorage.clear();
    window.location.href = 'http://localhost:8080/logout';
  };

  const navItems = [
    { id: 'tables', label: 'TABLES', icon: Table },
    { id: 'menu', label: 'MENU', icon: Utensils },
    { id: 'orders', label: 'ORDERS', icon: ListOrdered },
  ];

  return (
    <>
      <div className="w-72 bg-gray-200 flex flex-col p-6 border-r border-gray-300">
        {/* Header with Menu Icon */}
        <div className="mb-8">
          <button className="p-2 rounded-lg hover:bg-gray-300 transition">
            <Menu size={28} className="text-gray-800" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-4">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCurrentView(id)}
              className={`w-full rounded-full py-3 px-6 flex items-center gap-3 transition font-bold ${
                currentView === id
              ? 'bg-black text-white hover:bg-gray-900'
              : 'bg-black text-white hover:bg-gray-900'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-300">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-black"></div>
            <span className="font-bold text-gray-800 text-sm truncate max-w-[120px]">
              {userName}
            </span>
          </div>
          {/* Triggers the confirmation popup context overlay */}
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="p-2 hover:bg-rose-100 text-gray-800 hover:text-rose-600 rounded-lg transition"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* --- Elegant Modal Confirmation Popup Container --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Confirm Sign Out</h3>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              Are you sure you want to log out of the dashboard? Any unsaved live operational monitors will close.
            </p>
            
            <div className="flex gap-3 mt-6 justify-end">
              {/* Cancel Operation (No) */}
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2.5 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-250 rounded-xl transition"
              >
                Cancel
              </button>
              
              {/* Confirm Operation (Yes) */}
              <button
                onClick={executeLogout}
                className="px-4 py-2.5 text-sm font-bold text-white bg-black hover:bg-gray-900 rounded-xl shadow-md transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;