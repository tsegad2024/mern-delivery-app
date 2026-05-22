// src/pages/RequestShop.jsx
import React, { useState } from 'react';

const RequestShop = () => {
  const [form, setForm] = useState({ shopName: '', shopDescription: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/request-shop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      setMessage('Error submitting request');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Request to Open a Shop</h2>
      <input
        name="shopName"
        placeholder="Shop Name"
        value={form.shopName}
        onChange={(e) => setForm({ ...form, shopName: e.target.value })}
        className="w-full px-3 py-2 border rounded mb-3"
        required
      />
      <textarea
        name="shopDescription"
        placeholder="Shop Description"
        value={form.shopDescription}
        onChange={(e) => setForm({ ...form, shopDescription: e.target.value })}
        className="w-full px-3 py-2 border rounded mb-3"
      />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
        Submit Request
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  );
};

export default RequestShop;