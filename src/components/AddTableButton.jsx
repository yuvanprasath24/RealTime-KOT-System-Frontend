import { Plus } from 'lucide-react';

export default function AddTableButton({ onAdd }) {
  return (
    <button
      onClick={onAdd}
      className="flex items-center gap-3 px-6 py-4 rounded-lg hover:bg-gray-200 transition group"
    >
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition">
        <Plus size={20} className="text-black" />
      </div>
      <span className="font-bold text-black text-lg">Add Table</span>
    </button>
  );
}
