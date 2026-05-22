import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';

const Signup = () => {
  console.log("Log; signup 1s")
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await  axiosInstance.post("/auth/signup", data);
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message || 'Signup successful!');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network/server error. Try again.');
      console.log(err)
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded shadow"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-green-600">Sign Up</h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            required
            autoComplete="name"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
            autoComplete="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            required
            autoComplete="new-password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 font-semibold text-white rounded bg-green-600 hover:bg-green-700"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;