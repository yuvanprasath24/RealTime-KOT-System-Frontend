'use client';

import { Menu, Table, Utensils, ListOrdered, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUser } from '../configurations/GetUser';

export function Sidebar({ currentView, setCurrentView }) {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const user = await getUser();
        setUserName(user);
      }
      catch(err){
        console.error(err);
      }
    }
    fetchUser();
  },[])

  const navItems = [
    { id: 'tables', label: 'TABLES', icon: Table },
    { id: 'menu', label: 'MENU', icon: Utensils },
    { id: 'orders', label: 'ORDERS', icon: ListOrdered },
  ];

  return (
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
            className={`w-full rounded-full py-3 px-6 flex items-center gap-3 transition font-bold ${currentView === id
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
          <span className="font-bold text-gray-800 text-sm">{userName}</span>
        </div>
        <button className="p-2 hover:bg-gray-300 rounded-lg transition text-gray-800">
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
