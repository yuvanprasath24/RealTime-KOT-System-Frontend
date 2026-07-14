import TableCard from './TableCard';
import AddTableButton from './AddTableButton';
import { useEffect, useState } from 'react';
import API from '../configurations/api';

export function TablesGrid({restaurantId}) {
  const [tables, setTables] = useState([]);

  // FETCHING TABELS
  const fetchTables = async () => {
    try{
      const respone = await API.get('/tables');
      setTables(respone.data.data);
    }
    catch(err){
      console.error(err);
    }
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTables();
  },[])

  //ADDING NEW TABLE
  const addTable = async () => {
    try{
      await API.post('/tables');
      await fetchTables();
    }
    catch(err){
      console.error(err);
    }
  };

  // TO DELETE A TABLE
  const deleteTable = async (tableId) => {
    try{
      await API.delete(`/tables/${tableId}/delete`);
      await fetchTables();
    }
    catch(err){
      console.error(err);
    }
  };

  // CHANGING TABLE STATUS
  const toggleTable = async (tableId, currentStatus) => {
    const newStatus = 
      currentStatus === "VACANT"
        ? "OUT_OF_SERVICE"
        : "VACANT";
    
    try{
      const respone = await API.patch(
         `/tables/${tableId}/status`,
        {
          status : newStatus
        }
        );

        setTables(prev => 
          prev.map(table => 
            table.tableId === tableId
              ? respone.data.data
              : table
          )
        );
    } catch(err){
      console.error(err);
    }
  };


  return (
    <div className="p-8">
      {/* Main Content Container */}
      {/* <div className="bg-gray-200 rounded-2xl border-4 border-black p-12 min-h-screen"> */}
      <div className="bg-gray-200 rounded-2xl border-4 p-12 min-h-screen">
        {/* Header */}
        <h2 className="text-4xl font-bold text-black text-center mb-12 uppercase">
          TABLES
        </h2>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tables.map((table) => (
            <TableCard
              key={table.id}
              restaurantId={restaurantId}
              table={table}
              onDelete={deleteTable}
              onToggle={toggleTable}
            />
          ))}
        </div>

        {/* Add Table Button */}
        <div className="flex">
          <AddTableButton onAdd={addTable} />
        </div>
      </div>
    </div>
  );
}

export default TablesGrid;
