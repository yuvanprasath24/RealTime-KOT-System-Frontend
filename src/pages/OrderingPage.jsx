'use client';
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { MyOrders } from '../components/OrderingComponents/MyOrders';
import { OrderSummaryModel } from '../components/OrderingComponents/OrderSummaryModel';
import { ReceiptView } from '../components/OrderingComponents/ReceiptView';
import { MenuItemsModel } from '../components/OrderingComponents/MenuItemsModel';
import axios from 'axios';

export function OrderingPage() {
    const [searchParams] = useSearchParams();
    const [currentView, setCurrentView] = useState('menu');
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([
        // { id: 1, itemName: 'Paneer Tikka', status: 'PENDING', time: '2 mins ago' },
        // { id: 2, itemName: 'Butter Chicken', status: 'PREPARING', time: '5 mins ago' },
    ]);

    // Hide scrollbars globally
    if (typeof window !== 'undefined') {
        if (!document.getElementById('hide-scrollbars-style')) {
            const style = document.createElement('style');
            style.id = 'hide-scrollbars-style';
            style.innerHTML = `
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        *::-webkit-scrollbar {
          display: none;
        }
        html, body {
          overflow: hidden;
        }
      `;
            document.head.appendChild(style);
        }
    }

    // Fetching menu items
    const restaurantID = searchParams.get('restaurantId');
    const tableId = searchParams.get('tableId');

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        if (restaurantID) {
            // Notice this hits a PUBLIC endpoint because customers don't have login tokens!
            axios.get(`http://127.0.0.1:8080/public/api/menu_items/customer/all?restaurantID=${restaurantID}`)
                .then((res) => { setMenuItems(res.data.data); })
                .catch(err => console.error("Could not fetch the menu:", err));
        }
    }, [restaurantID]);

    const categories = ['ALL', 'STARTERS', 'MAIN_COURSES', 'DESSERTS'];

    const filteredItems = activeCategory === 'ALL'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    const addToCart = (item) => {
        const existingItem = cart.find(c => c.id === item.id);
        if (existingItem) {
            setCart(cart.map(c =>
                c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const updateQuantity = (id, quantity) => {
        if (quantity === 0) {
            setCart(cart.filter(c => c.id !== id));
        } else {
            setCart(cart.map(c => c.id === id ? { ...c, quantity } : c));
        }
    };

    const placeOrder = async () => {
        const orderItemsPayload = cart.map(item => ({
            menuItemId: item.id,
            quantity: item.quantity
        }));

        const payload = {
            tableId: tableId,
            orderItems: orderItemsPayload
        };

        try {
            const response = await axios.post(`http://127.0.0.1:8080/public/api/orders?restaurantID=${restaurantID}`,
                payload
            );
            setOrders(response.data.data);
            console.log(response.data.data);
            setCart([]);
            setCurrentView('myOrders');
        }
        catch (err) {
            console.error("Order processing breakdown:", err);
            alert("Something went wrong. Please notify restaurant staff.");
        }

    };


    // Main Menu View
    if (currentView === 'menu') {
        return (
            <div className="flex flex-col h-screen w-screen bg-gray-200 text-gray-900 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-4 bg-gray-200 flex-shrink-0">
                    <button
                        onClick={() => setCurrentView('myOrders')}
                        className="bg-black text-white px-4 py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-gray-900 transition"
                    >
                        My Orders
                    </button>
                    <button
                        onClick={() => setCurrentView('receipt')}
                        className="bg-black text-white px-4 py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-gray-900 transition"
                    >
                        Close
                    </button>
                </div>

                {/* Menu Title */}
                <div className="text-center py-3 bg-gray-200 flex-shrink-0">
                    <h1 className="text-2xl sm:text-3xl font-bold">MENU</h1>
                </div>

                {/* Category Filters */}
                <div className="flex gap-2 px-4 py-3 bg-gray-200 overflow-x-auto flex-shrink-0 scrollbar-hide">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-1 text-sm rounded-full font-semibold whitespace-nowrap transition ${activeCategory === category
                                ? 'bg-black text-white'
                                : 'bg-white text-black hover:bg-gray-100'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Menu Items - Scrollable */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 pb-28">
                    {filteredItems.map(item => {
                        const cartItem = cart.find(c => c.id === item.id);
                        return (
                            <MenuItemsModel
                                key={item.id}
                                item={item}
                                cartItem={cartItem}
                                updateQuantity={updateQuantity}
                                addToCart={addToCart}
                            />
                        );
                    })}
                </div>

                {/* Place Order Button - Fixed at bottom */}
                <div className="fixed bottom-0 left-0 right-0 px-4 py-4 bg-gradient-to-t from-gray-200 via-gray-200 to-transparent">
                    <button
                        onClick={() => setCurrentView('orderSummary')}
                        disabled={cart.length === 0}
                        className="w-full bg-black text-white py-3 rounded-full font-bold text-lg hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        PLACE ORDER ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                    </button>
                </div>
            </div>
        );
    }

    // Order Summary Modal
    if (currentView === 'orderSummary') {
        return (
            <OrderSummaryModel
                onBack={() => { setCurrentView('menu') }}
                cart={cart}
                placeOrder={placeOrder}
                updateQuantity={updateQuantity}
            />
        );
    }

    // My Orders Panel
    if (currentView === 'myOrders') {
        return (
            <MyOrders
                orders={orders}
                onBack={() => { setCurrentView('menu') }}
            />
        );
    }

    // Receipt & Settlement View
    if (currentView === 'receipt') {
        return (
            <ReceiptView
                cart={cart}
                onBack={() => { setCurrentView('menu') }}
            />
        );
    }
}
