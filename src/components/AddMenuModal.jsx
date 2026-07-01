'use client';

import { useState } from 'react';

export default function AddMenuModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'MAIN_COURSES',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.price) {
      onAdd(formData.name, formData.price, formData.category);
      setFormData({ name: '', price: '', category: 'MAIN_COURSES' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-96 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Add Menu Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Menu Name Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Menu Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter menu name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-black placeholder-gray-400"
            />
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-black placeholder-gray-400"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-black"
            >
              <option>STARTERS</option>
              <option>MAIN_COURSES</option>
              <option>DESSERTS</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
