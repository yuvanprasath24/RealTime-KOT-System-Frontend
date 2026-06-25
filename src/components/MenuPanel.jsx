'use client';

import { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import AddMenuModal from './AddMenuModal';
import EditMenuModal from './EditMenuModal';
import API from '../configurations/api';


export function MenuPanel() {

  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = async () => {
    try {
      const response = await API.get('/menu_items/all');
      setMenuItems(response.data.data);
      console.log(response.data.data)
    }
    catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMenuItems();
  }, []);

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const categories = ['ALL', 'STARTERS', 'MAIN_COURSES', 'DESSERTS'];

  const filteredItems = activeCategory === 'ALL'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  //ADDING MENU ITEM
  const addMenuItem = async (name, price, category) => {
    const menuItemDTO = {
      name: name,
      price: price,
      category: category,
      menuStatus: "ACTIVE"
    }
    try {
      const reponse = await API.post('/menu_items/addMenu', menuItemDTO);
      await fetchMenuItems();
      setShowModal(false);
    }
    catch (err) {
      console.error(err);
    }
  };

  const updateMenuItem = (id, name, price, category) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { id, name, price, category } : item
    ));
    setEditingItem(null);
  };

  //TO DELETE A MENU ITEM
  const deleteMenuItem = async (id) => {
    try{
      const response = await API.delete(`/menu_items/${id}/delete`);
      console.log(response);
      await fetchMenuItems();
    }
    catch(err){
      console.error(err);
    }
  };

  //CHANGING MENU STATUS
  const toggleMenu = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "ACTIVE"
        ? "INACTIVE"
        : "ACTIVE";

    try {
      const response = await API.patch(
        `/menu_items/${id}/status`,
        {
          menuStatus: newStatus
        }
      );
      // Update local state
      setMenuItems(prev =>
        prev.map(item =>
          item.id === id
            ? response.data.data
            : item
        )
      );

    } catch (err) {
      console.error(err);
    }
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
            className={`px-6 py-2 rounded-full font-semibold transition ${activeCategory === category
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

              {/* Toggle Switch */}
              <button
                onClick={() => toggleMenu(item.id, item.menuStatus)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${item.menuStatus === "ACTIVE"
                  ? "bg-black"
                  : "bg-gray-300"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${item.menuStatus === "ACTIVE"
                    ? "translate-x-6"
                    : "translate-x-1"
                    }`}
                />
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
