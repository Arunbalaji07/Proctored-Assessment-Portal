import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from '@/components/AdminNavbar';

const CreateUser: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'educator' | 'student'>('educator');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser = { fullName, email, password };
      if (activeTab === 'educator') {
        await axios.post('http://localhost:7777/api/educator', newUser);
        alert('Educator created successfully');
      } else {
        await axios.post('http://localhost:7777/api/student', newUser);
        alert('Student created successfully');
      }
      setFullName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AdminNavbar />
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setActiveTab('educator')}
              className={`px-4 py-2 mr-2 rounded-lg ${activeTab === 'educator' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              Add Educator
            </button>
            <button
              onClick={() => setActiveTab('student')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'student' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              Add Student
            </button>
          </div>
          {activeTab === 'educator' ? (
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl font-bold mb-6 text-center">Create Educator</h2>
              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 p-3 rounded-md text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                Create Educator
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl font-bold mb-6 text-center">Create Student</h2>
              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 p-3 rounded-md text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              >
                Create Student
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
