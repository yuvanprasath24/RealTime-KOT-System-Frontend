import { X } from "lucide-react"

export function MyOrders({orders, onBack}) {
    return (
        <div className="flex flex-col h-screen w-screen bg-gray-200 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-4 bg-white border-b border-gray-300 flex-shrink-0">
                <h2 className="text-2xl font-bold text-black">My Orders</h2>
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-100 rounded transition"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Orders List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-20">
                {orders.length === 0 ? (
                    <div className="text-center py-12 text-gray-600">
                        <p className="text-lg">No active orders</p>
                    </div>
                ) : (
                    orders.orderItem.map(orderItem => (
                        <div key={orderItem.id} className="bg-white rounded-lg p-4 border-l-4 border-black">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-black text-base sm:text-lg">{orderItem.menuItemName}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${orderItem.status === 'PENDING'
                                        ? 'bg-gray-200 text-gray-700'
                                        : orderItem.status === 'PREPARING'
                                            ? 'bg-yellow-100 text-yellow-700 animate-pulse'
                                            : 'bg-green-100 text-green-700'
                                    }`}>
                                    {orderItem.status}
                                </span>
                            </div>
                            {/* <p className="text-sm text-gray-600">{order.time}</p> */}
                        </div>
                    ))
                )}
            </div>

            {/* Back Button */}
            <div className="px-4 py-4 bg-white border-t border-gray-300 flex-shrink-0">
                <button
                    onClick={onBack}
                    className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-900 transition"
                >
                    Back to Menu
                </button>
            </div>
        </div>
    )
}