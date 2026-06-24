'use client';

import { ChevronRight } from 'lucide-react';

export default function KitchenOrderCard({ order, onStatusChange }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'ready':
        return 'bg-green-100 text-green-800 border border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'pending':
        return 'preparing';
      case 'preparing':
        return 'ready';
      case 'ready':
        return 'completed';
      default:
        return 'pending';
    }
  };

  const statusLabels = {
    pending: 'Pending',
    preparing: 'Preparing',
    ready: 'Ready',
    completed: 'Completed',
  };

  return (
    <div className="bg-white rounded-lg border-2 border-black p-6 shadow-sm hover:shadow-md transition">
      {/* Header Row - Table and Order ID */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-bold text-black">{order.tableId}</h3>
          <p className="text-xs text-gray-600 mt-1">Order ID: {order.id}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-600">{order.timestamp}</p>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">Items</h4>
        <ul className="space-y-2">
          {order.items.map((item, index) => (
            <li key={index} className="text-sm text-gray-700 flex justify-between">
              <span>{item.quantity}x {item.name}</span>
              <span className="text-gray-600">{item.notes && `(${item.notes})`}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Status Badge and Action Button */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className={`px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(order.status)}`}>
          {statusLabels[order.status]}
        </div>
        {order.status !== 'completed' && (
          <button
            onClick={() => onStatusChange(order.id, getNextStatus(order.status))}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition font-semibold text-sm"
          >
            Next <ChevronRight size={16} />
          </button>
        )}
        {order.status === 'completed' && (
          <div className="text-xs text-gray-600 font-medium">Order Complete</div>
        )}
      </div>
    </div>
  );
}
