import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

const StudentReportAdmin: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const [reports, setReports] = useState<any[]>([]);
  const token = localStorage.getItem('admin');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const fetchStudentReports = async () => {
      try {
        const response = await axios.get(`http://localhost:7777/api/reports/${assessmentId}`); // Adjust the endpoint accordingly
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching student reports:', error);
      }
    };

    fetchStudentReports();
  }, [assessmentId, navigate, token]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AdminNavbar />
      <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Student Reports for Assessment:</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-center table-auto">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-white">Student Name</th>
                <th className="px-4 py-2 text-sm font-medium text-white">Score</th>
                <th className="px-4 py-2 text-sm font-medium text-white">Status</th>
                <th className="px-4 py-2 text-sm font-medium text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.studentId} className="bg-gray-700 odd:bg-gray-600">
                    <td className="px-4 py-2 text-sm">{report.studentName}</td>
                    <td className="px-4 py-2 text-sm">{report.score}</td>
                    <td className="px-4 py-2 text-sm">{report.status}</td>
                    <td className="px-4 py-2 text-sm">
                      <button
                        onClick={() => navigate(`/admin/student-details/${report.studentId}`)} // Adjust route as needed
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-300"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-2 text-center">No reports available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentReportAdmin;
