'use client';

import { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import AddMenuModal from './AddMenuModal';
import EditMenuModal from './EditMenuModal';
import axios from 'axios';

export function MenuPanel() {
  const [menuItems, setMenuItems] = useState([
    //{ id: 1, name: 'Chinken Biriyani', price: 200, category: 'Main course' },
  ]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/menu_items')
    .then((response) => {
        setMenuItems(response.data);
    });
  });
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const categories = ['ALL', 'Starters', 'Main course', 'Deserts'];

  const filteredItems = activeCategory === 'ALL' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const addMenuItem = (name, price, category) => {
   // const newId = Math.max(...menuItems.map(m => m.id), 0) + 1;
    setMenuItems([...menuItems, { name, price, category }]);
    setShowModal(false);
  };

  const updateMenuItem = (id, name, price, category) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { id, name, price, category } : item
    ));
    setEditingItem(null);
  };

  const deleteMenuItem = (id) => {
    setMenuItems(menuItems.filter(m => m.id !== id));
  };

  return (
    <div className="flex-1 bg-gray-300 p-8 overflow-auto">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-8">MENU</h1>

      {/* Category Filter Tabs */}
      <div className="flex gap-3 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeCategory === category
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items List */}
      <div className="max-w-2xl mx-auto space-y-3 mb-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-4 flex items-center justify-between hover:shadow-md transition"
          >
            <span className="font-semibold text-gray-900">{item.name}</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 font-semibold text-black">
                <span className="text-gray-900">{item.price}</span>
                <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                  ₹
                </div>
              </div>
              <button
                onClick={() => setEditingItem(item)}
                className="p-2 hover:bg-gray-100 rounded transition text-gray-600 hover:text-gray-900"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => deleteMenuItem(item.id)}
                className="p-2 hover:bg-red-100 rounded transition text-gray-600 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Menu Button */}
      <div className="flex items-center gap-3 justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition"
        >
          <Plus size={24} className="text-black" />
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="text-lg font-semibold text-gray-800 hover:text-black transition"
        >
          Add Menu
        </button>
      </div>

      {/* Modals */}
      {showModal && (
        <AddMenuModal
          onClose={() => setShowModal(false)}
          onAdd={addMenuItem}
        />
      )}
      {editingItem && (
        <EditMenuModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdate={updateMenuItem}
        />
      )}
    </div>
  );
}

export default MenuPanel;
