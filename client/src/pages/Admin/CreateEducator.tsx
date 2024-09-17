import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from '@/components/AdminNavbar';

const CreateEducator: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser = { fullName, email, password };
      await axios.post('http://localhost:7777/api/educator', newUser);
      alert('Educator created successfully');
      setFullName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <AdminNavbar />
    <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-700 p-8 rounded-lg">
        <h2 className="text-2xl mb-6">Create User</h2>
        <div className="mb-4">
          <label className="block mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 p-2 rounded text-white">Create User</button>
      </form>
    </div>
    </div>
  );
};

export default CreateEducator;
