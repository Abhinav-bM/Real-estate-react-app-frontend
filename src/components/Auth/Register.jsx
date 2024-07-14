import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/reducers/authReducer';
import axios from "../../axiosConfig";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    // Validate name
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const userData = { name, email, password, role };
      axios.post("/api/auth/register", userData, { withCredentials: true })
        .then(response => {
          console.log("Response from backend:", response.data);

          if (response.status === 201) {
            dispatch(setUser(response.data));
            navigate("/");
          }
          
          
        })
        .catch(error => {
          if(error.response.status === 400){
            setErrorMessage(error.response.data.message)
          }
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              <option value="buyer">Buyer</option>
              <option value="agent">Agent</option>
            </select>
          </div>
          <div className="mb-4">
            <Link to="/login">Already have an Account?</Link>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
