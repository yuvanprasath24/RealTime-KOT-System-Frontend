'use client';

import { useState } from 'react';
import KitchenOrderCard from './KitchenOrderCard';

export function KitchenDashboard() {
  const [orders, setOrders] = useState([
    {
      id: 'K001',
      tableId: 'Table 1',
      timestamp: '14:25',
      status: 'pending',
      items: [
        { name: 'Chinken Biriyani', quantity: 2, notes: 'Extra spicy' },
        { name: 'Butter Chicken', quantity: 1, notes: '' },
      ],
    },
    {
      id: 'K002',
      tableId: 'Table 2',
      timestamp: '14:18',
      status: 'preparing',
      items: [
        { name: 'Masala Dosa', quantity: 1, notes: '' },
        { name: 'Paneer Tikka', quantity: 2, notes: 'No onion' },
      ],
    },
    {
      id: 'K003',
      tableId: 'Table 3',
      timestamp: '14:10',
      status: 'ready',
      items: [
        { name: 'Crispy Dosa', quantity: 1, notes: '' },
      ],
    },
  ]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const preparingOrders = orders.filter(order => order.status === 'preparing');
  const readyOrders = orders.filter(order => order.status === 'ready');

  return (
    <div className="bg-gray-200 p-8 min-h-screen">
      {/* Title Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black">KITCHEN ORDERS</h1>
      </div>

      {/* Kanban Board - Three Columns */}
      <div className="grid grid-cols-3 gap-6">
        {/* Pending Column */}
        <div className="bg-white rounded-lg border-2 border-black p-6">
          <h2 className="text-lg font-bold text-black mb-6 pb-4 border-b-2 border-yellow-400">
            Pending
          </h2>
          <div className="space-y-4">
            {pendingOrders.length > 0 ? (
              pendingOrders.map(order => (
                <KitchenOrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No pending orders</p>
            )}
          </div>
        </div>

        {/* Preparing Column */}
        <div className="bg-white rounded-lg border-2 border-black p-6">
          <h2 className="text-lg font-bold text-black mb-6 pb-4 border-b-2 border-blue-400">
            Preparing
          </h2>
          <div className="space-y-4">
            {preparingOrders.length > 0 ? (
              preparingOrders.map(order => (
                <KitchenOrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No orders preparing</p>
            )}
          </div>
        </div>

        {/* Ready Column */}
        <div className="bg-white rounded-lg border-2 border-black p-6">
          <h2 className="text-lg font-bold text-black mb-6 pb-4 border-b-2 border-green-400">
            Ready
          </h2>
          <div className="space-y-4">
            {readyOrders.length > 0 ? (
              readyOrders.map(order => (
                <KitchenOrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No ready orders</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KitchenDashboard;
