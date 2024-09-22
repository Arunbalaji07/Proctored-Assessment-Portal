import React, { useState } from 'react';
import EducatorNavbar from '@/components/EducatorNavbar';
import { useNavigate } from 'react-router-dom';

const AssessmentManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssessments, setSelectedAssessments] = useState<number[]>([]);
  const navigate = useNavigate();

  // Dummy data for assessments
  const assessments = [
    { id: 1, title: 'Assessment 1', date: '2024-09-15', status: 'Published' },
    { id: 2, title: 'Assessment 2', date: '2024-09-16', status: 'Draft' },
    { id: 3, title: 'Assessment 3', date: '2024-09-17', status: 'Published' },
  ];

  const handleSelectAssessment = (id: number) => {
    setSelectedAssessments((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedAssessments.length === assessments.length) {
      setSelectedAssessments([]);
    } else {
      setSelectedAssessments(assessments.map((assessment) => assessment.id));
    }
  };

  const handleBulkDelete = () => {
    // Bulk delete logic
    console.log('Deleting assessments:', selectedAssessments);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <EducatorNavbar />
      <div className="p-6">
        <header className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
          <h1>Assessment Management</h1>
        </header>

        {/* Create Assessment Options */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Create Assessment Options</h2>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <button
              onClick={() => navigate('/educator/create')}
              className="w-full md:w-auto bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600"
            >
              Create New Assessment
            </button>
            <button className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
              Bulk Upload Assessments
            </button>
            <button className="w-full md:w-auto bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600">
              Use Question Bank
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Search and Filters</h2>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <input
              type="text"
              placeholder="Search by Title"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedAssessments.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Bulk Actions</h2>
            <button
              onClick={handleBulkDelete}
              className="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              Delete Selected Assessments
            </button>
          </div>
        )}

        {/* Assessment List */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Created Assessments</h2>
          <table className="min-w-full bg-gray-800 text-left text-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={selectedAssessments.length === assessments.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="py-2 px-4 cursor-pointer">Title</th>
                <th className="py-2 px-4 cursor-pointer">Date Created</th>
                <th className="py-2 px-4 cursor-pointer">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assessments
                .filter((assessment) =>
                  assessment.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((assessment) => (
                  <tr key={assessment.id} className="hover:bg-gray-700">
                    <td className="py-2 px-4">
                      <input
                        type="checkbox"
                        checked={selectedAssessments.includes(assessment.id)}
                        onChange={() => handleSelectAssessment(assessment.id)}
                      />
                    </td>
                    <td className="py-2 px-4">{assessment.title}</td>
                    <td className="py-2 px-4">{assessment.date}</td>
                    <td className="py-2 px-4">{assessment.status}</td>
                    <td className="py-2 px-4 flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                        Delete
                      </button>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                        View Results
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssessmentManagement;
