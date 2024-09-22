import React, { useState, useEffect } from 'react'; 
import { FaUserPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(savedStudents);
  }, []);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddRow = () => {
    setStudents([...students, { name: '', id: '', serial: '', brand: '', color: '', status: true }]);
    setEditingIndex(students.length);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedStudents = [...students];
    updatedStudents[index] = { ...updatedStudents[index], [name]: value };
    setStudents(updatedStudents);
  };

  const handleStatusToggle = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].status = !updatedStudents[index].status;
    setStudents(updatedStudents);
  };

  const handleSave = (index) => {
    const student = students[index];
    if (!student.name || !student.id || !student.serial || !student.brand || !student.color) {
      alert('Please fill out all fields before saving.');
      return;
    }
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  return (
    <div className="bg-[#001F3D] min-h-screen p-4">
      <div className="flex items-center justify-end mb-8 space-x-2">
        <FaUserPlus 
          className="text-blue-300 text-2xl cursor-pointer hover:text-blue-400 transition duration-300" 
          title="Add New" 
          aria-label="Add New Student"
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

      <div className="bg-[#001F3D] lg:p-6 md:p-4 p-2 rounded-lg shadow-lg relative">
        <div className="overflow-x-auto">
          <div className="shadow-2xl p-2 rounded-lg">
            <table className="min-w-full text-left bg-[#001F3D] text-gray-400 border-collapse">
              <thead>
                <tr className="border-b border-blue-500 md:font-bold font-light lg:text-[15px] md:text-[12px] text-[10px]">
                  <th className="p-3 border-b border-blue-500">#</th>
                  <th className="p-3 border-b border-blue-500">Name</th>
                  <th className="p-3 border-b border-blue-500">ID Number</th>
                  <th className="p-3 border-b border-blue-500">PC Serial Number</th>
                  <th className="p-3 border-b border-blue-500">PC Brand</th>
                  <th className="p-3 border-b border-blue-500">PC Color</th>
                  <th className="p-3 border-b border-blue-500 w-32">Status</th>
                  <th className="p-3 border-b border-blue-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {students
                  .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((student, index) => (
                  <tr key={index} className={`bg-[#001F3D] border-b border-blue-500 ${index === editingIndex ? 'bg-[#002B6C]' : ''}`}>
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">
                      <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={(event) => handleInputChange(event, index)}
                        className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                        disabled={index !== editingIndex}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        name="id"
                        value={student.id}
                        onChange={(event) => handleInputChange(event, index)}
                        className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                        disabled={index !== editingIndex}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        name="serial"
                        value={student.serial}
                        onChange={(event) => handleInputChange(event, index)}
                        className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                        disabled={index !== editingIndex}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        name="brand"
                        value={student.brand}
                        onChange={(event) => handleInputChange(event, index)}
                        className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                        disabled={index !== editingIndex}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        name="color"
                        value={student.color}
                        onChange={(event) => handleInputChange(event, index)}
                        className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                        disabled={index !== editingIndex}
                      />
                    </td>
                    <td className="p-2 flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{student.status ? 'Inside' : 'Outside'}</span>
                        <label className="flex items-center cursor-pointer relative">
                          <input
                            type="checkbox"
                            className="appearance-none w-8 h-4 bg-gray-300 rounded-full relative cursor-pointer"
                            checked={student.status}
                            onChange={() => handleStatusToggle(index)}
                            disabled={index !== editingIndex}
                          />
                          <span
                            className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                              student.status ? 'translate-x-4 bg-green-500' : 'translate-x-0 bg-red-500'
                            }`}
                          />
                        </label>
                      </div>
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
                            const updatedStudents = students.filter((_, i) => i !== index);
                            setStudents(updatedStudents);
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

export default Students;
