import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const Students = () => {
  const [status, setStatus] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/students')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    fetchStudents(value);
  };

  const handleDelete = (index) => {
    const studentId = students[index].student_id;
    axios.delete(`http://127.0.0.1:8000/api/students/${studentId}`)
      .then(() => {
        const updatedStudents = students.filter((_, i) => i !== index);
        setStudents(updatedStudents);
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };

  const fetchStudents = (search = "") => {
    axios.get(`http://127.0.0.1:8000/api/students/search?search=${search}`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const toggleStatus = () => {
    setStatus(!status);
  };

  const handleAddRow = () => {
    setStudents([...students, { student_name: '', student_id: '', serial_number: '', pc_brand: '', pc_color: '', phoneNumber: '', email: '' }]);
    setEditingIndex(students.length);
    setCreatingNew(true);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedStudents = [...students];
    updatedStudents[index] = { ...updatedStudents[index], [name]: value };
    setStudents(updatedStudents);
  };

  const handleSave = (index) => {
    const student = students[index];
    if (!student.student_name || !student.student_id || !student.serial_number || !student.pc_brand || !student.pc_color || !student.email) {
      alert('Please fill out all fields before saving.');
      return;
    }

    const formData = {
      student_id: student.student_id,
      serial_number: student.serial_number,
      pc_brand: student.pc_brand,
      pc_color: student.pc_color,
      student_name: student.student_name,
      phoneNumber: student.phoneNumber,
      email: student.email,  // Add email here
    };

    if (creatingNew) {
      axios.post('http://127.0.0.1:8000/api/students/register', formData)
        .then((response) => {
          const updatedStudents = [...students.slice(0, index), response.data, ...students.slice(index + 1)];
          setStudents(updatedStudents);
          setEditingIndex(null);
          setCreatingNew(false);
        })
        .catch((error) => {
          console.error('Error creating student:', error);
        });
    } else {
      axios.put(`http://127.0.0.1:8000/api/students/${editId}`, formData)
        .then((response) => {
          const updatedStudents = students.map((s, i) => (i === index ? response.data : s));
          setStudents(updatedStudents);
          setEditingIndex(null);
        })
        .catch((error) => {
          console.error('Error updating student:', error);
        });
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const editId = students[index].student_id;
    setEditId(editId);
    setCreatingNew(false);
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

      <div className="bg-[#001F3D] p-6 rounded-lg shadow-lg relative">
        <div className="overflow-x-auto">
          <div className="shadow-2xl p-2 rounded-lg">
            <table className="min-w-full text-left bg-[#001F3D] text-gray-400 border-collapse">
              <thead>
                <tr className="border-b border-blue-500">
                  <th className="p-3 border-b border-blue-500">#</th>
                  <th className="p-3 border-b border-blue-500">Name</th>
                  <th className="p-3 border-b border-blue-500">ID Number</th>
                  <th className="p-3 border-b border-blue-500">PC Serial Number</th>
                  <th className="p-3 border-b border-blue-500">PC Brand</th>
                  <th className="p-3 border-b border-blue-500">PC Color</th>
                  <th className="p-3 border-b border-blue-500">Phone NO</th>
                  <th className="p-3 border-b border-blue-500">Email</th>  {/* New Email Column */}
                  <th className="p-3 border-b border-blue-500 w-32">Status</th>
                  <th className="p-3 border-b border-blue-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center">No students found.</td>
                  </tr>
                ) : (
                  students
                    .filter(student => student.student_name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((student, index) => (
                      <tr key={student.id || index} className={`bg-[#001F3D] border-b border-blue-500 ${index === editingIndex ? 'bg-[#002B6C]' : ''}`}>
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="student_name"
                            value={student.student_name}
                            onChange={(event) => handleInputChange(event, index)}
                            className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="student_id"
                            value={student.student_id}
                            onChange={(event) => handleInputChange(event, index)}
                            className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="serial_number"
                            value={student.serial_number}
                            onChange={(event) => handleInputChange(event, index)}
                            className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="pc_brand"
                            value={student.pc_brand}
                            onChange={(event) => handleInputChange(event, index)}
                            className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="pc_color"
                            value={student.pc_color}
                            onChange={(event) => handleInputChange(event, index)}
                            className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="phoneNumber"
                            value={student.phoneNumber}
                            onChange={(event) => handleInputChange(event, index)}
                            className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="email"
                            name="email"
                            value={student.email}
                            onChange={(event) => handleInputChange(event, index)}
                            className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <select className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full">
                            <option value="Inactive">Inactive</option>
                            <option value="Active">Active</option>
                          </select>
                        </td>
                        <td className="p-2 flex justify-start space-x-2">
                          {index === editingIndex ? (
                            <button onClick={() => handleSave(index)} className="text-green-300">
                              Save
                            </button>
                          ) : (
                            <FaEdit
                              className="text-yellow-300 cursor-pointer hover:text-yellow-400"
                              onClick={() => handleEdit(index)}
                            />
                          )}
                          <FaTrash
                            className="text-red-300 cursor-pointer hover:text-red-400"
                            onClick={() => handleDelete(index)}
                          />
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
