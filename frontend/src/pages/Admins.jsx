import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa'; // Imported icons

const Admins = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [admins, setAdmins] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Index of the row being edited

  useEffect(() => {
    // Load admins from local storage on component mount
    const savedAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    setAdmins(savedAdmins);
  }, []);

  useEffect(() => {
    // Save admins to local storage whenever admins state changes
    localStorage.setItem('admins', JSON.stringify(admins));
  }, [admins]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddRow = () => {
    setAdmins([
      ...admins,
      { name: '', id: '', phone: '' } // Add an empty row with phone number
    ]);
    setEditingIndex(admins.length); // Set the new row as the one being edited
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedAdmins = [...admins];
    updatedAdmins[index] = { ...updatedAdmins[index], [name]: value };
    setAdmins(updatedAdmins);
  };

  const handleSave = (index) => {
    const currentAdmin = admins[index];
    // Check for empty fields
    if (!currentAdmin.name || !currentAdmin.id || !currentAdmin.phone) {
      alert('Please fill in all the fields before saving.');
      return;
    }
    setEditingIndex(null); // Stop editing after saving
  };

  const handleEdit = (index) => {
    setEditingIndex(index); // Set the row to be edited
  };

  return (
    <div className="bg-[#001F3D] min-h-screen p-4 overflow-auto">
      {/* Container for search box and add icon */}
      <div className="flex items-center justify-end mb-8 space-x-2">
        {/* Add Admin icon */}
        <FaUserPlus 
          className="text-blue-300 text-2xl cursor-pointer hover:text-blue-400 transition duration-300" 
          title="Add New Admin" 
          aria-label="Add New Admin"
          onClick={handleAddRow} // Add a new row when clicked
        />

        {/* Search box container */}
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

      {/* Larger container for the table */}
      <div className="bg-[#001F3D] p-6 rounded-lg shadow-lg relative">
        <div className="overflow-x-auto">
          <div className="shadow-2xl p-2 rounded-lg">
            <table className="min-w-full text-left bg-[#001F3D] text-gray-400 border-collapse">
              <thead>
                <tr className="border-b border-blue-500">
                  <th className="p-3 border-b border-blue-500">#</th> {/* Row number */}
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
                  <tr key={index} className={`bg-[#001F3D] border-b border-blue-500 ${index === editingIndex ? 'bg-[#002B6C]' : ''}`}>
                    <td className="p-2">{index + 1}</td> {/* Row number */}
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
