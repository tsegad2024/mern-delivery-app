import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  console.log("Log: signin 1")
  const [form, setForm] = useState({ email: '', password: '' });
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
      const response = await fetch('/api/auth/login', { // use '/api/login' if proxy is set!
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful!');
        localStorage.setItem('token', data.token); // Store JWT
        localStorage.setItem('user', JSON.stringify(data.user)); // Optional: store user
        setTimeout(() => {
          navigate('/'); // redirect to home or dashboard
        }, 1000);
      } else {
        setError(data.message || 'Login failed!');
      }
    } catch (err) {
      setError('Network/server error. Try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded shadow"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-green-600">Login</h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center">{success}</div>}

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
            autoComplete="current-password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 font-semibold text-white rounded bg-green-600 hover:bg-green-700"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;