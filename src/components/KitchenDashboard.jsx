'use client';

import { useEffect, useState } from 'react';
import { KitchenOrderCard } from './KitchenOrderCard';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import API from '../configurations/api';

export function KitchenDashboard({ restaurantId }) {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await API.get('/orders/active');
      setOrders(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, []);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws-entry');
    const stompClient = Stomp.over(socket);

    stompClient.debug = null;

    stompClient.connect({}, () => {
      console.log('Connected');

      stompClient.subscribe(`/topic/kitchen/${restaurantId}`, (message) => {
       
        if (message.body) {
          const newOrder = JSON.parse(message.body);

          setOrders(prev => {
            const exists = prev.some(order => order.id === newOrder.id);

            if (exists) {
              return prev.map(order =>
                order.id === newOrder.id ? newOrder : order
              );
            }

            return [newOrder, ...prev];
          });
        }
      });
      console.log("Subscribed successfully");
    });

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, [restaurantId]);

  const handleStatusChange = async (orderId, itemId, newStatus) => {
    try {
      await API.patch(
        `/orders/orderItem/${itemId}/status`,
        {
          status: newStatus,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-200 p-8 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black">
          KITCHEN ORDERS
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* Pending */}

        <div className="bg-white rounded-lg border-2 border-black p-6">
          <h2 className="text-lg font-bold text-black mb-6 pb-4 border-b-2 border-yellow-40">
            PENDING
          </h2>

          <div className="space-y-4">
            {orders.map(order => (
              <KitchenOrderCard
                key={order.id}
                order={order}
                status="PENDING"
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </div>

        {/* Preparing */}

        <div className="bg-white rounded-lg border-2 border-black p-6">
          <h2 className="text-lg font-bold text-black mb-6 pb-4 border-b-2 border-yellow-40">
            PREPARING
          </h2>

          <div className="space-y-4">
            {orders.map(order => (
              <KitchenOrderCard
                key={order.id}
                order={order}
                status="PREPARING"
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </div>

        {/* Ready */}

        <div className="bg-white rounded-lg border-2 border-black p-6">
          <h2 className="text-lg font-bold text-black mb-6 pb-4 border-b-2 border-yellow-40">
            READY
          </h2>

          <div className="space-y-4">
            {orders.map(order => (
              <KitchenOrderCard
                key={order.id}
                order={order}
                status="READY"
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}