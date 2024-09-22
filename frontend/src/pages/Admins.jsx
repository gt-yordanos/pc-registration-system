import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaSearch, FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Admins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [admins, setAdmins] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formdata, setFormdata] = useState(null);

   // Fetch students from the API on component mount
   useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/admins')
      .then((response) => {
        console.log('Admins:', response.data); 
        setAdmins(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, []);

  // Fetch admins from the API on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = (search = "") => {
    axios.get(`http://127.0.0.1:8000/api/admins/search?search=${search}`)
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching admins:', error);
      });
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    fetchAdmins(value); 
  };

  const handleAddRow = () => {
    setAdmins([...admins, { username: '', admin_id: '', phoneNumber: '', email: '', password: '', profile_picture: '' }]);
    setEditingIndex(admins.length);
    setCreatingNew(true);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedAdmins = [...admins];
    updatedAdmins[index] = { ...updatedAdmins[index], [name]: value };
    setAdmins(updatedAdmins);
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const updatedAdmins = [...admins];
    updatedAdmins[index] = { ...updatedAdmins[index], profile_picture: file };
    setAdmins(updatedAdmins);
  };

  const handleSave = (index) => {
    const admin = admins[index];
    

    if (creatingNew) {
      // Create new admin
      if (!admin.username || !admin.admin_id || !admin.phoneNumber || !admin.email || !admin.password) {
        alert('Please fill in all fields before saving.');
        return;
      }
  
      const formData = new FormData();
      formData.append('username', admin.username);
      formData.append('admin_id', admin.admin_id);
      formData.append('phoneNumber', admin.phoneNumber);
      formData.append('email', admin.email);
      formData.append('password', admin.password);
      formData.append('profile_picture', admin.profile_picture); 

      axios.post('http://127.0.0.1:8000/api/admins/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          const updatedAdmins = [...admins.slice(0, index), response.data, ...admins.slice(index + 1)];
          setAdmins(updatedAdmins);
          setEditingIndex(null);
          setCreatingNew(false);
        })
        .catch((error) => {
          console.error('Error creating admin:', error);
        });
    } else {
      // Update existing admin
      axios.put(`http://127.0.0.1:8000/api/admins/${editId}`, admin, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          const updatedAdmins = admins.map((admin, i) => (i === index ? response.data : admin));
          setAdmins(updatedAdmins);
          setEditingIndex(null);
        })
        .catch((error) => {
          console.error('Error updating admin:', error);
        });
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditId(admins[index].admin_id); // Set the edit ID
    setCreatingNew(false); // Indicate it's not a new admin
  };

  const handleDelete = (index) => {
    const adminId = admins[index].admin_id;
    axios.delete(`http://127.0.0.1:8000/api/admins/${adminId}`)
      .then(() => {
        const updatedAdmins = admins.filter((_, i) => i !== index);
        setAdmins(updatedAdmins);
      })
      .catch((error) => {
        console.error('Error deleting admin:', error);
      });
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
                  <th className="p-3 border-b border-blue-500">Email</th>
                  <th className="p-3 border-b border-blue-500">Password</th>
                  <th className="p-3 border-b border-blue-500">Profile Picture</th>
                  <th className="p-3 border-b border-blue-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">No admins found.</td>
                  </tr>
                ) : (
                  admins
                    .filter(admin => admin.username.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((admin, index) => (
                      <tr key={admin.id || index} className={`bg-[#001F3D] border-b border-blue-500 ${index === editingIndex ? 'bg-[#002B6C]' : ''}`}>
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="username"
                            value={admin.username} // Controlled input
                            onChange={(event) => handleInputChange(event, index)}
                            className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="admin_id"
                            value={admin.admin_id} // Controlled input
                            className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                           
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="phoneNumber"
                            value={admin.phoneNumber} // Controlled input
                            onChange={(event) => handleInputChange(event, index)}
                            className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="email"
                            name="email"
                            value={admin.email} // Controlled input
                            onChange={(event) => handleInputChange(event, index)}
                            className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="password"
                            name="password"
                            value={admin.password} // Controlled input
                            onChange={(event) => handleInputChange(event, index)}
                            className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="file"
                            name="profile_picture"
                            onChange={(event) => handleFileChange(event, index)}
                            className="bg-[#001F3D] text-blue-300 p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          {index === editingIndex ? (
                            <FaSave
                              className="text-blue-300 text-xl cursor-pointer mr-2"
                              title="Save"
                              onClick={() => handleSave(index)}
                            />
                          ) : (
                            <FaEdit
                              className="text-blue-300 text-xl cursor-pointer mr-2"
                              title="Edit"
                              onClick={() => handleEdit(index)}
                            />
                          )}
                          <FaTrash
                            className="text-red-600 cursor-pointer hover:text-red-400 transition duration-300"
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

export default Admins;