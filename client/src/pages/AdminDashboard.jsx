// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/pending-requests', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        setRequests(data.requests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    await fetch('/api/approve-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ requestId })
    });
    setRequests(prev => prev.filter(r => r._id !== requestId));
  };

  const handleReject = async (requestId) => {
    const notes = prompt('Reason for rejection:');
    await fetch('/api/reject-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ requestId, adminNotes: notes })
    });
    setRequests(prev => prev.filter(r => r._id !== requestId));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">User</th>
              <th className="p-2">Shop Name</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id} className="border-b">
                <td className="p-2">{req.userId.name}</td>
                <td className="p-2">{req.shopName}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleApprove(req._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(req._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
