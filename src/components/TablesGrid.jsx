import TableCard from './TableCard';
import AddTableButton from './AddTableButton';

export function TablesGrid({ tables, onAddTable, onDeleteTable, onToggleTable }) {
  return (
    <div className="p-8">
      {/* Main Content Container */}
      <div className="bg-gray-200 rounded-2xl border-4 border-black p-12 min-h-screen">
        {/* Header */}
        <h2 className="text-4xl font-bold text-black text-center mb-12 uppercase">
          TABLES
        </h2>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tables.map((table) => (
            <TableCard
              key={table.id}
              table={table}
              onDelete={onDeleteTable}
              onToggle={onToggleTable}
            />
          ))}
        </div>

        {/* Add Table Button */}
        <div className="flex">
          <AddTableButton onAdd={onAddTable} />
        </div>
      </div>
    </div>
  );
}

export default TablesGrid;
