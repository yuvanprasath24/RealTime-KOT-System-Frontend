import { Download, Share2 } from "lucide-react";
import { handleShareReceipt } from "./handleShareReceipt";
import { handleDownloadReceipt } from "./handleDownloadReceipt";

export function ReceiptView({cart, onBack}) {
    const receiptItems = cart.length > 0 ? cart : [
        // { name: 'Chinken Biriyani', price: 200, quantity: 1 },
        // { name: 'Paneer Tikka', price: 180, quantity: 2 },
    ];
    const receiptTotal = receiptItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const receiptSgst = receiptTotal * 0.09;
    const receiptCgst = receiptTotal * 0.09;
    const receiptGrandTotal = receiptTotal + receiptSgst + receiptCgst;
    return (
        <div className="flex flex-col h-screen w-screen bg-gray-300 overflow-hidden">
            {/* Receipt Container */}
            <div className="flex-1 overflow-y-auto flex items-center justify-center px-3 py-4">
                <div className="bg-white w-full max-w-xs rounded-lg shadow-lg px-6 py-6 space-y-3 font-mono text-xs sm:text-sm">
                    {/* Restaurant Info */}
                    <div className="text-center border-b border-gray-300 pb-3">
                        <h1 className="text-xl font-bold text-black">The Restaurant</h1>
                        <p className="text-gray-600 text-xs mt-2">123 Main Street, City</p>
                    </div>

                    {/* Table Number */}
                    <div className="text-center pb-3">
                        <p className="text-gray-600">Table No: <span className="font-bold text-black">5</span></p>
                        <p className="text-gray-600 text-xs mt-1">Bill Date: 29/06/2026</p>
                    </div>

                    {/* Items */}
                    <div className="border-t border-b border-gray-300 py-3 space-y-1">
                        {receiptItems.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-black">
                                <span className="flex-1">{item.name} x{item.quantity}</span>
                                <span className="ml-2">₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tax and Total */}
                    <div className="space-y-1 text-black">
                        <div className="flex justify-between text-xs">
                            <span>Subtotal:</span>
                            <span>₹{receiptTotal}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span>SGST (9%):</span>
                            <span>₹{receiptSgst.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span>CGST (9%):</span>
                            <span>₹{receiptCgst.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-sm border-t border-gray-300 pt-2">
                            <span>Grand Total:</span>
                            <span>₹{receiptGrandTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Thank You */}
                    <div className="text-center pt-3 border-t border-gray-300">
                        <p className="text-gray-600 text-xs">Thank you for your order!</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white border-t border-gray-300 px-4 py-3 space-y-2 flex-shrink-0">
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => handleShareReceipt(receiptItems, receiptTotal, receiptSgst, receiptCgst, receiptGrandTotal)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-black"
                        title="Share Receipt"
                    >
                        <Share2 size={18} />
                    </button>
                    <button
                        onClick={() => handleDownloadReceipt(receiptItems, receiptTotal, receiptSgst, receiptCgst, receiptGrandTotal)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-black"
                        title="Download Receipt"
                    >
                        <Download size={18} />
                    </button>
                </div>

                <button
                    onClick={onBack}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-green-700 transition"
                >
                    PROCEED TO PAYMENT
                </button>

                <button
                    onClick={onBack}
                    className="w-full bg-gray-200 text-black py-2 rounded-lg font-bold text-sm hover:bg-gray-300 transition"
                >
                    Back to Menu
                </button>
            </div>
        </div>
    )
}