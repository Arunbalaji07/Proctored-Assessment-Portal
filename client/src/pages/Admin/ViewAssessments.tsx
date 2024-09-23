import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

const ViewAssessmentList: React.FC = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<any[]>([]);
  const token = localStorage.getItem('admin');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const fetchAssessments = async () => {
      try {
        const response = await axios.get('http://localhost:7777/api/assessment'); // Adjust the endpoint accordingly
        setAssessments(response.data);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    fetchAssessments();
  }, [navigate, token]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:7777/api/assessment/${id}`);
      setAssessments((prevAssessments) => prevAssessments.filter((assessment) => assessment.id !== id));
    } catch (error) {
      console.error('Error deleting assessment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AdminNavbar />
      <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Assessment List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-center table-auto">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-white">Assessment Title</th>
                <th className="px-4 py-2 text-sm font-medium text-white">Category</th>
                <th className="px-4 py-2 text-sm font-medium text-white">Educator</th>
                <th className="px-4 py-2 text-sm font-medium text-white">Students Attended</th>
                <th className="px-4 py-2 text-sm font-medium text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assessments.length > 0 ? (
                assessments.map((assessment) => (
                  <tr key={assessment.id} className="bg-gray-700 odd:bg-gray-600">
                    <td className="px-4 py-2 text-sm">{assessment.title}</td>
                    <td className="px-4 py-2 text-sm">{assessment.category}</td>
                    <td className="px-4 py-2 text-sm">{assessment.educator}</td>
                    <td className="px-4 py-2 text-sm">{assessment.studentsAttended}</td>
                    <td className="px-4 py-2 text-sm">
                      <button
                        onClick={() => navigate(`/admin/assessment-details/${assessment.id}`)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg mr-2 hover:bg-blue-700 transition duration-300"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDelete(assessment.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-lg mr-2 hover:bg-red-700 transition duration-300"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => navigate(`/admin/student-reports/${assessment.id}`)}
                        className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition duration-300"
                      >
                        View Reports
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-center">No assessments available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAssessmentList;
