import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import axios from 'axios';

export default function CustomerMenuPage() {
    // 1. Hook provided by react-router-dom to read URL query strings
    const [searchParams] = useSearchParams();
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState([]);

    // Extract variables on load
    const restaurantId = searchParams.get('restaurantId');
    const tableId = searchParams.get('tableId');

    // 2. Fetch the corresponding menu from Spring Boot public controller
    useEffect(() => {
        if (restaurantId) {
            // Notice this hits a PUBLIC endpoint because customers don't have login tokens!
            axios.get(`http://localhost:8080/api/public/menu_items?restaurantId=${restaurantId}`)
                .then(res => setMenuItems(res.data.data))
                .catch(err => console.error("Could not fetch the menu:", err));
        }
    }, [restaurantId]);

    // 3. Placing an order
    const handleCheckout = async () => {
        const orderPayload = {
            tableId: Number(tableId),
            orderItems: cart.map(item => ({
                menuItemId: item.id,
                quantity: item.quantity
            }))
        };

        try {
            // Sends the order structure straight to your complex createOrders endpoint
            await axios.post(`http://localhost:8080/api/public/orders?restaurant_id=${restaurantId}`, orderPayload);
            alert("Order placed successfully! Sending to kitchen...");
            setCart([]); // Clear local cart state
        } catch (err) {
            console.error("Order submission failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-white p-4 max-w-md mx-auto">
            {/* Displaying Mobile Menu Layout for the customer */}
            <header className="border-b pb-3 mb-4">
                <h1 className="text-xl font-bold text-slate-900">Welcome to Table {tableId}</h1>
                <p className="text-xs text-slate-500">Scan verified. View menu below.</p>
            </header>

            {/* List Menu Items */}
            <div className="space-y-4">
                {menuItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-slate-600">₹{item.price}</p>
                        </div>
                        <button 
                            onClick={() => setCart([...cart, { ...item, quantity: 1 }])}
                            className="bg-emerald-600 text-white px-3 py-1 rounded text-sm font-bold"
                        >
                            + Add
                        </button>
                    </div>
                ))}
            </div>

            {/* Sticky Mobile Checkout Bar */}
            {cart.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900 p-4 text-white flex justify-between items-center">
                    <span>{cart.length} Items added</span>
                    <button onClick={handleCheckout} className="bg-emerald-500 px-4 py-2 rounded font-bold text-sm">
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
}