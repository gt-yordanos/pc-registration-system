import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

const Admins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [admins, setAdmins] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    setAdmins(savedAdmins);
  }, []);

  useEffect(() => {
    localStorage.setItem('admins', JSON.stringify(admins));
  }, [admins]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddRow = () => {
    setAdmins([...admins, { name: '', id: '', phone: '', isActive: true }]);
    setEditingIndex(admins.length);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedAdmins = [...admins];
    updatedAdmins[index] = { ...updatedAdmins[index], [name]: value };
    setAdmins(updatedAdmins);
  };

  const handleSave = (index) => {
    const currentAdmin = admins[index];
    if (!currentAdmin.name || !currentAdmin.id || !currentAdmin.phone) {
      alert('Please fill in all the fields before saving.');
      return;
    }
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const toggleActiveStatus = (index) => {
    const updatedAdmins = [...admins];
    updatedAdmins[index].isActive = !updatedAdmins[index].isActive;
    setAdmins(updatedAdmins);
  };

  return (
    <div className="bg-[#001F3D] min-h-screen p-4">
      <div className="flex items-center justify-end mb-8 space-x-2">
        <FaUserPlus 
          className="text-blue-300 text-2xl cursor-pointer hover:text-blue-400 transition duration-300" 
          title="Add New Admin" 
          aria-label="Add New Admin"
          onClick={handleAddRow}
        />
        <div className="relative flex items-center bg-[#001F3D] rounded-lg border border-blue-500">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 bg-[#001F3D] text-blue-300 rounded-lg placeholder-blue-300 w-64 h-10 flex-1 border-none outline-none focus:border-blue-500 focus:ring-0 transition duration-300"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className="text-blue-300 ml-2 cursor-pointer h-10 mr-2" />
        </div>
      </div>

      <div className="bg-[#001F3D] p-6 rounded-lg shadow-lg relative">
        <div className="overflow-x-auto">
          <div className="shadow-2xl p-2 rounded-lg">
            <table className="min-w-full text-left bg-[#001F3D] text-gray-400 border-collapse">
              <thead>
                <tr className="border-b border-blue-500">
                  <th className="p-3 border-b border-blue-500">#</th>
                  <th className="p-3 border-b border-blue-500">Name</th>
                  <th className="p-3 border-b border-blue-500">ID Number</th>
                  <th className="p-3 border-b border-blue-500">Phone Number</th>
                  <th className="p-3 border-b border-blue-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {admins
                  .filter(admin => admin.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((admin, index) => (
                    <tr key={index} className={`border-b border-blue-500 ${!admin.isActive ? 'bg-red-600 text-white line-through' : 'bg-[#001F3D] text-gray-400'}`}>
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">
                        <input
                          type="text"
                          name="name"
                          value={admin.name}
                          onChange={(event) => handleInputChange(event, index)}
                          className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                          disabled={index !== editingIndex}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          name="id"
                          value={admin.id}
                          onChange={(event) => handleInputChange(event, index)}
                          className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                          disabled={index !== editingIndex}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          name="phone"
                          value={admin.phone}
                          onChange={(event) => handleInputChange(event, index)}
                          className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                          disabled={index !== editingIndex}
                        />
                      </td>
                      <td className="p-2">
                        <div className="flex items-center space-x-2 justify-center">
                          {index === editingIndex ? (
                            <button
                              className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition duration-300"
                              onClick={() => handleSave(index)}
                            >
                              Save
                            </button>
                          ) : (
                            <FaEdit
                              className="text-blue-600 cursor-pointer hover:text-blue-400 transition duration-300"
                              onClick={() => handleEdit(index)}
                            />
                          )}
                          <FaTrash
                            className="text-red-600 cursor-pointer hover:text-red-400 transition duration-300"
                            onClick={() => {
                              const updatedAdmins = admins.filter((_, i) => i !== index);
                              setAdmins(updatedAdmins);
                            }}
                          />
                          <button
                            className={`bg-${admin.isActive ? 'red' : 'green'}-500 text-white py-1 px-4 rounded-md hover:bg-${admin.isActive ? 'red' : 'green'}-600 transition duration-300`}
                            onClick={() => toggleActiveStatus(index)}
                          >
                            {admin.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admins;
