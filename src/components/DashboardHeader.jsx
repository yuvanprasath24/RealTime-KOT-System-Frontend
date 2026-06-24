export  function DashboardHeader({ activeTab, setActiveTab }) {
  return (
    <div className="bg-gray-100 border-b border-gray-300 p-6 flex items-center gap-6">
      <h1 className="text-gray-400 text-sm font-medium mr-auto">dashboard</h1>
      
      <div className="flex items-center gap-4">
        {/* ADMIN Tab */}
        <button
          onClick={() => setActiveTab('admin')}
          className={`px-8 py-3 rounded-full font-bold transition ${
            activeTab === 'admin'
              ? 'bg-gray-400 text-black'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-350'
          }`}
        >
          ADMIN
        </button>

        {/* KITCHEN Tab */}
        <button
          onClick={() => setActiveTab('kitchen')}
          className={`px-8 py-3 rounded-full font-bold transition ${
            activeTab === 'kitchen'
              ? 'bg-gray-400 text-black'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-350'
          }`}
        >
          KITCHEN
        </button>
      </div>
    </div>
  );
}
