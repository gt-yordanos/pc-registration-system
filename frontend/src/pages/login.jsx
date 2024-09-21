import React, { useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for API requests
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import icons for eye toggle

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate(); // For navigation
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(null); // State for error handling

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', { username, password });
      alert(response.data.message); // Show success message
      navigate('/'); // Navigate after successful login
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed'); // Show error message
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-[#000F1F]'>
      <div className='text-center'>
        <h1 className='font-bold text-2xl md:text-4xl text-[#CCFFFF]'>PC Registration System</h1>
        <h2 className='text-xl md:text-2xl text-[#A9A9A9] mb-6'>Sign in to your account</h2>
      </div>
      <form onSubmit={handleLogin} className='flex flex-col justify-center items-center space-y-4'>
        <div className='mb-2 relative'>
          <label htmlFor="username" className='text-left text-[#CCFFFF]'>Username</label>
          <input
            type="text"
            placeholder='Enter username'
            value={username} // Bind input value to username state
            onChange={(e) => setUsername(e.target.value)} // Update state on change
            className='w-full p-2 border border-[#005F8F] bg-transparent text-[#A9A9A9]'
          />
        </div>
        <div className='mb-2 relative'>
          <label htmlFor="password" className='text-left text-[#CCFFFF]'>Password</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder='Enter password'
            value={password} // Bind input value to password state
            onChange={(e) => setPassword(e.target.value)} // Update state on change
            className='w-full p-2 border border-[#005F8F] bg-transparent text-[#A9A9A9]'
          />
          <span
            className="absolute right-3 top-10 text-textSecondary cursor-pointer"
            onClick={toggleVisibility}
          >
            {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>
        <div className='w-full'>
          <button type='submit' className='w-full p-2 bg-[#005F8F] text-[#CCFFFF]'>
            Login
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error if login fails */}
        <div className='text-left text-[#CCFFFF]'>
          Don't have an account? <a href='/signup' className="text-blue-500">Signup</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
