'use client';

import { ChevronRight } from 'lucide-react';

export function KitchenOrderCard({
  order,
  status,
  onStatusChange,
}) {

  const filteredItems = order.orderItem.filter(
    item => item.status === status
  );

  if (filteredItems.length === 0) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300';

      case 'PREPARING':
        return 'bg-blue-100 text-blue-800 border border-blue-300';

      case 'READY':
        return 'bg-green-100 text-green-800 border border-green-300';

      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  const getNextStatus = (status) => {
    switch (status) {
      case 'PENDING':
        return 'PREPARING';

      case 'PREPARING':
        return 'READY';

      case 'READY':
        return 'READY';

      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg border-2 border-black p-6 shadow-sm hover:shadow-md transition">

      <div className="flex justify-between mb-4 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-black">Table: {order.table.tableId}</h3>
        <p className="text-xs text-gray-600">
          Order ID: {order.id}
        </p>
      </div>

      <ul className="space-y-3">

        {filteredItems.map(item => (

          <li
            key={item.id}
            className="flex justify-between items-center"
          >

            <div>
              <p className="text-sm text-gray-700 flex justify-between">
                {item.quantity} × {item.menuItemName}
              </p>

              <div
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}
              >
                {item.status}
              </div>
            </div>

            {item.status !== 'READY' && (

              <button
                onClick={() =>
                  onStatusChange(
                    order.id,
                    item.id,
                    getNextStatus(item.status)
                  )
                }
                className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-900 transition"
              >
                Next

                <ChevronRight size={16} />
              </button>

            )}

          </li>

        ))}

      </ul>

    </div>
  );
}