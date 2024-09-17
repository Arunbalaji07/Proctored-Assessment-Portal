import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [latestUsers, setLatestUsers] = useState<any[]>([]);
  const [latestLogs, setLatestLogs] = useState<any[]>([]);

  const token = localStorage.getItem('admin');
  if (!token) {
    navigate('/');
    return;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch latest 5 users
        const usersResponse = await axios.get('http://localhost:7777/api/educator/');
        const allUsers = usersResponse.data;

        if (allUsers.length > 0) {
          allUsers.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setLatestUsers(allUsers.slice(0, 5)); // Get latest 5 users
        }

        // Fetch latest 5 audit logs
        const logsResponse = await axios.get('http://localhost:7777/api/student/'); // Adjust the endpoint if necessary
        const allLogs = logsResponse.data;

        if (allLogs.length > 0) {
          allLogs.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setLatestLogs(allLogs.slice(0, 5)); // Get latest 5 logs
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <AdminNavbar />

      <div className="p-6">
        <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
          ADMIN DASHBOARD
        </div>

        {/* Latest 5 Users */}
        <h2 className="text-2xl lg:text-3xl font-semibold text-left mb-6">
          Latest Users
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-center table-auto">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-white">Name</th>
                <th className="px-6 py-3 text-sm font-medium text-white">Email</th>
                <th className="px-6 py-3 text-sm font-medium text-white">Created At</th>
              </tr>
            </thead>
            <tbody>
              {latestUsers && latestUsers.length > 0 ? (
                latestUsers.map((user: any, index: number) => (
                  <tr key={index} className="bg-gray-700 odd:bg-gray-600">
                    <td className="px-6 py-4 text-sm">{user.fullName}</td>
                    <td className="px-6 py-4 text-sm">{user.email}</td>
                    <td className="px-6 py-4 text-sm">{new Date(user.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center">
                    No user data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Latest 5 Audit Logs */}
        <h2 className="text-2xl lg:text-3xl font-semibold text-left mt-10 mb-6">
          Latest Audit Logs
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-center table-auto">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-white">Action</th>
                <th className="px-6 py-3 text-sm font-medium text-white">User</th>
                <th className="px-6 py-3 text-sm font-medium text-white">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {latestLogs && latestLogs.length > 0 ? (
                latestLogs.map((log: any, index: number) => (
                  <tr key={index} className="bg-gray-700 odd:bg-gray-600">
                    <td className="px-6 py-4 text-sm">{log.action}</td>
                    <td className="px-6 py-4 text-sm">{log.fullName}</td>
                    <td className="px-6 py-4 text-sm">{new Date(log.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center">
                    No audit log data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
