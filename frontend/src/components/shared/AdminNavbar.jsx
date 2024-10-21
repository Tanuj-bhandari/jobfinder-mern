import { setUser } from '@/redux/authSlice';
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/admin/logout`, {}, {
                withCredentials: true, // Important for cookie-based auth
            });

            if (res.data.success) {
                dispatch(setUser(null)); // Clear user from Redux store
                // Optionally navigate to login or home page
                navigate("/admin");
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };
  return (
    <nav className="bg-white shadow-md flex justify-between items-center p-4">
    <div className="flex w-full justify-end space-x-4">
      <Link onClick={handleLogout} className="text-gray-600 hover:text-blue-600">
        <span className="material-icons">Logout</span>
      </Link>
    </div>
  </nav>
  );
};

export default AdminNavbar;
