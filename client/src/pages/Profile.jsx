import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async resp => {
        const data = await resp.json();
        if (!resp.ok) {
          setError(data.message || 'Could not fetch profile');
        } else {
          setUser(data.user);
        }
      })
      .catch(() => setError('Failed to connect to server'));
  }, [navigate]);

  if (error) return <div className="text-center pt-10 text-red-600">{error}</div>;
  if (!user) return <div className="text-center pt-10">Loading profile...</div>;

  return (
    <div className="flex flex-col max-w-md mx-auto mt-10 bg-white rounded shadow p-8">
      <h2 className="text-2xl font-bold mb-5 text-green-700 text-center">Profile</h2>
      <div className="mb-3 text-lg flex justify-between">
        <span className="font-semibold">Name:</span>
        <span>{user.name}</span>
      </div>
      <div className="mb-3 text-lg flex justify-between">
        <span className="font-semibold">Email:</span>
        <span>{user.email}</span>
      </div>
      <div className="mb-3 text-lg flex justify-between">
        <span className="font-semibold">Role:</span>
        <span>{user.role}</span>
      </div>
      <div className="mb-3 text-lg flex justify-between">
        <span className="font-semibold">Joined:</span>
        <span>{new Date(user.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default Profile;