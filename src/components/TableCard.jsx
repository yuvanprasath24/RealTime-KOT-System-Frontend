import { Download, Trash2 } from 'lucide-react';

export default function TableCard({ table, onDelete, onToggle }) {
  return (
    <div className="bg-white rounded-lg p-6 flex flex-col h-full shadow-sm hover:shadow-md transition">
      {/* Header: Table Name and Controls */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-black">{table.name}</h3>
        <div className="flex items-center gap-2">
          {/* Toggle Switch */}
          <button
            onClick={() => onToggle(table.id)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              table.isActive ? 'bg-black' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                table.isActive ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>

          {/* Download Icon */}
          <button className="p-2 hover:bg-gray-100 rounded transition">
            <Download size={18} className="text-black" />
          </button>
        </div>
      </div>

      {/* QR Code Placeholder */}
      <div className="flex-1 flex items-center justify-center mb-6">
        <div className="w-24 h-24 border-2 border-black rounded grid grid-cols-2 gap-1 p-2">
          <div className="bg-black rounded"></div>
          <div className="bg-black rounded"></div>
          <div className="bg-black rounded"></div>
          <div className="bg-black"></div>
        </div>
      </div>

      {/* Footer: Trash Icon */}
      <div className="flex justify-end">
        <button
          onClick={() => onDelete(table.id)}
          className="p-2 hover:bg-gray-100 rounded transition"
        >
          <Trash2 size={18} className="text-black" />
        </button>
      </div>
    </div>
  );
}
