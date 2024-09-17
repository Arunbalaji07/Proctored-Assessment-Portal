// src/components/AdminDashboard.tsx
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the admin-token exists
    const token = localStorage.getItem('admin');
    if (!token) {
      // If no token is found, redirect to the login page
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('admin');
    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <p className="mt-4">Welcome to the admin dashboard!</p>
      <Button className="mt-6 bg-red-600 text-white" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default AdminDashboard;
