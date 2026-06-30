import { Plus, Minus } from "lucide-react"

export function MenuItemsModel({item, cartItem, updateQuantity, addToCart}) {
    return (
        <div key={item.id} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-black">{item.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-black font-semibold text-sm">{item.price}</span>
                    <div className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                        ₹
                    </div>
                </div>
            </div>
            {cartItem ? (
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1 flex-shrink-0 ml-2">
                    <button
                        onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                        className="text-black hover:text-gray-900 p-1"
                    >
                        <Minus size={16} />
                    </button>
                    <span className="text-black font-semibold w-5 text-center text-sm">{cartItem.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                        className="text-black hover:text-gray-900 p-1"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => addToCart(item)}
                    className="w-9 h-9 flex-shrink-0 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition ml-2"
                >
                    <Plus size={18} />
                </button>
            )}
        </div>
    )
}