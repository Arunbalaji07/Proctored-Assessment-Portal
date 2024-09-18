import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [latestUsers, setLatestUsers] = useState<any[]>([]);
  const [latestLogs, setLatestLogs] = useState<any[]>([]);
  const [systemStatus, setSystemStatus] = useState<any>({}); 

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
        const logsResponse = await axios.get('http://localhost:7777/api/student/'); 
        const allLogs = logsResponse.data;

        if (allLogs.length > 0) {
          allLogs.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setLatestLogs(allLogs.slice(0, 5)); // Get latest 5 logs
        }

        // Fetch system status
        const statusResponse = await axios.get('http://localhost:7777/api/status');
        setSystemStatus(statusResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AdminNavbar />

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row justify-between mb-6">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-0">
            ADMIN DASHBOARD
          </div>
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
            <Link to="/admin/create-user" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 text-lg text-center">
              Add User
            </Link>
            <Link to="/admin/create-assessment" className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-400 hover:text-black transition duration-300 text-lg text-center">
              Create Assessment
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* System Status Overview */}
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">System Status Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Total Users</h3>
                <p className="text-base sm:text-lg">{systemStatus.totalUsers || 'N/A'}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Active Sessions</h3>
                <p className="text-base sm:text-lg">{systemStatus.activeSessions || 'N/A'}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">System Health</h3>
                <p className="text-base sm:text-lg">{systemStatus.systemHealth || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">Recent Activity Feed</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-center table-auto">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-sm font-medium text-white">Activity</th>
                    <th className="px-4 py-2 text-sm font-medium text-white">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {latestLogs && latestLogs.length > 0 ? (
                    latestLogs.map((log: any, index: number) => (
                      <tr key={index} className="bg-gray-700 odd:bg-gray-600">
                        <td className="px-4 py-2 text-sm">{log.action}</td>
                        <td className="px-4 py-2 text-sm">{new Date(log.createdAt).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-4 py-2 text-center">
                        No recent activity available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Latest 5 Users */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            Latest Users
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-center table-auto">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-sm font-medium text-white">Name</th>
                  <th className="px-4 py-2 text-sm font-medium text-white">Email</th>
                  <th className="px-4 py-2 text-sm font-medium text-white">Created At</th>
                </tr>
              </thead>
              <tbody>
                {latestUsers && latestUsers.length > 0 ? (
                  latestUsers.map((user: any, index: number) => (
                    <tr key={index} className="bg-gray-700 odd:bg-gray-600">
                      <td className="px-4 py-2 text-sm">{user.fullName}</td>
                      <td className="px-4 py-2 text-sm">{user.email}</td>
                      <td className="px-4 py-2 text-sm">{new Date(user.createdAt).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-center">
                      No user data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Latest 5 Audit Logs */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            Latest Audit Logs
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-center table-auto">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-sm font-medium text-white">Action</th>
                  <th className="px-4 py-2 text-sm font-medium text-white">User</th>
                  <th className="px-4 py-2 text-sm font-medium text-white">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {latestLogs && latestLogs.length > 0 ? (
                  latestLogs.map((log: any, index: number) => (
                    <tr key={index} className="bg-gray-700 odd:bg-gray-600">
                      <td className="px-4 py-2 text-sm">{log.action}</td>
                      <td className="px-4 py-2 text-sm">{log.user}</td>
                      <td className="px-4 py-2 text-sm">{new Date(log.timestamp).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-center">
                      No log data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
