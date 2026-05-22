import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  console.log("log: navbar 1")

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const resp = await fetch('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await resp.json();
        if (!resp.ok) {
          setError(data.message || 'Could not fetch profile');
        } else {
          setUser(data.user);
        }
      } catch {
        setError('Failed to connect to server');
      }
    };

    fetchProfile();
  }, [navigate]);

  if (error) return <div className="text-center pt-10 text-red-600">{error}</div>;
  if (!user) return <div className="text-center pt-10">Loading profile...</div>;

  const isAdminUser = user?.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-primary">
          <span role="img" aria-label="Logo" className="mr-2">🚚</span>
          OnDelivery
        </div>
        <div className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary font-medium">Home</Link>
          <Link to="/menu" className="text-gray-700 hover:text-primary font-medium">Menu</Link>
          <Link to="/cart" className="text-gray-700 hover:text-primary font-medium">Cart</Link>
          <Link to="/orders" className="text-gray-700 hover:text-primary font-medium">Orders</Link>
          <div>
            {user ? (
              <>
                <Link to="/profile" className="bg-white text-green-700 px-3 py-2 rounded mr-3 hover:bg-green-100 transition">Profile</Link>
                <Link to="/request-shop" className="bg-white text-green-700 px-3 py-2 rounded mr-3 hover:bg-green-100 transition">Create shop</Link>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 px-3 py-2 rounded">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="bg-white text-green-700 px-3 py-2 rounded mr-3 hover:bg-green-100 transition">Login</Link>
                <Link to="/signup" className="bg-white text-green-700 px-3 py-2 rounded hover:bg-green-100 transition">Sign Up</Link>
              </>
            )}
          </div>
          {isAdminUser && (
            <Link to="/admin-dashboard" className="bg-white text-green-700 px-3 py-2 rounded mr-3 hover:bg-green-100 transition">
              Admin Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
