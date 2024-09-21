import React, { useState } from 'react'; // Import React and useState hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios'; // Import axios for API requests
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons for password visibility toggle

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Toggle for confirm password visibility
  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const navigate = useNavigate(); // For navigation
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const [email, setEmail] = useState(''); // State for email
  const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number
  const [role, setRole] = useState('student'); // Default role to 'student'
  // const [profilePicture, setProfilePicture] = useState(null); // State for profile picture (Commented out)
  const [error, setError] = useState(null); // State for error handling

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = {
      username,
      password,
      email,
      phoneNumber,
      role,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/admins', formData);
      alert(response.data.message); // Show success message
      navigate('/login'); // Navigate to login page after successful signup
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed'); // Show error message
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-[#000F1F]'>
      <div className='text-center'>
        <h1 className='font-bold text-2xl md:text-4xl text-[#CCFFFF]'>PC Registration System</h1>
        <h2 className='text-xl md:text-2xl text-[#A9A9A9] mb-6'>Create your account</h2>
      </div>
      <form onSubmit={handleSignup} method='POST' className='flex flex-col justify-center items-center space-y-4'>
        <div className='mb-2 relative w-full'>
          <label htmlFor="username" className='text-left text-[#CCFFFF]'>Username</label>
          <input
            type="text"
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full p-2 border border-[#005F8F] bg-transparent text-[#A9A9A9]'
          />
        </div>
        <div className='mb-2 relative w-full'>
          <label htmlFor="email" className='text-left text-[#CCFFFF]'>Email</label>
          <input
            type="email"
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 border border-[#005F8F] bg-transparent text-[#A9A9A9]'
          />
        </div>
        <div className='mb-2 relative w-full'>
          <label htmlFor="phoneNumber" className='text-left text-[#CCFFFF]'>Phone Number</label>
          <input
            type="text"
            placeholder='Enter phone number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className='w-full p-2 border border-[#005F8F] bg-transparent text-[#A9A9A9]'
          />
        </div>
        <div className='mb-2 relative w-full'>
          <label htmlFor="role" className='text-left text-[#CCFFFF]'>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='w-full p-2 border border-[#005F8F] bg-transparent text-[#A9A9A9]'
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>
        <div className='mb-2 relative w-full'>
          <label htmlFor="password" className='text-left text-[#CCFFFF]'>Password</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 border border-[#005F8F] bg-transparent text-[#A9A9A9]'
          />
          <span
            className="absolute right-3 top-10 text-textSecondary cursor-pointer"
            onClick={toggleVisibility}
          >
            {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>
        <div className='mb-2 relative w-full'>
          <label htmlFor="confirmPassword" className='text-left text-[#CCFFFF]'>Confirm Password</label>
          <input
            type={confirmPasswordVisible ? 'text' : 'password'}
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='w-full p-2 border border-[#005F8F] bg-transparent text-[#A9A9A9]'
          />
          <span
            className="absolute right-3 top-10 text-textSecondary cursor-pointer"
            onClick={toggleConfirmVisibility}
          >
            {confirmPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>
        {/* Profile Picture Input (Commented Out)
        <div className='mb-2 relative w-full'>
          <label htmlFor="profile_picture" className='text-left text-[#CCFFFF]'>Profile Picture</label>
          <input
            type="file"
            onChange={(e) => setProfilePicture(e.target.files[0])} // Handle file upload
            className='w-full p-2 border border-[#005F8F] bg-transparent text-[#A9A9A9]'
          />
        </div>
        */}
        <div className='w-full'>
          <button type='submit' className='w-full p-2 bg-[#005F8F] text-[#CCFFFF]'>
            Sign Up
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error if signup fails */}
        <div className='text-left text-[#CCFFFF]'>
          Already have an account? <a href='/login' className="text-blue-500">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
