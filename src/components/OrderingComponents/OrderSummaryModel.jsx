import { X, Minus, Plus } from "lucide-react"

export function OrderSummaryModel({onBack, cart, placeOrder, updateQuantity}) {
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const sgst = cartTotal * 0.09;
    const cgst = cartTotal * 0.09;
    const grandTotal = cartTotal + sgst + cgst;
    
    return (
        <div className="flex flex-col h-screen w-screen bg-gray-200 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-4 border-b border-gray-300 bg-white flex-shrink-0">
                <h2 className="text-2xl font-bold text-black">Order Summary</h2>
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-100 rounded transition"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-40">
                {cart.map(item => (
                    <div key={item.id} className="bg-white rounded-lg p-4 flex justify-between items-center">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-black">{item.name}</h3>
                                <span className="bg-black text-white px-2 py-1 rounded text-xs font-bold">x{item.quantity}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1 flex-shrink-0 ml-2">
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-black hover:text-gray-900 p-1"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="text-black font-semibold w-5 text-center text-sm">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-black hover:text-gray-900 p-1"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bill Breakdown & Actions */}
            <div className="bg-white border-t border-gray-300 px-4 py-4 space-y-3 flex-shrink-0">
                <div className="flex justify-between text-black text-sm">
                    <span>Subtotal:</span>
                    <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-black text-sm">
                    <span>SGST (9%):</span>
                    <span>₹{sgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black text-sm">
                    <span>CGST (9%):</span>
                    <span>₹{cgst.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-lg text-black">
                    <span>Total:</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                </div>

                <button
                    onClick={placeOrder}
                    className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-900 transition mt-3"
                >
                    Confirm & Send to Kitchen
                </button>

                <button
                    onClick={onBack}
                    className="w-full bg-gray-200 text-black py-3 rounded-lg font-bold hover:bg-gray-300 transition"
                >
                    Back to Menu
                </button>
            </div>
        </div>
    )
}