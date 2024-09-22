import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Assessment {
  id: number;
  name: string;
  duration: string;
  status: 'Upcoming' | 'Completed';
}

const AssessmentList: React.FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // Mock Data
  const assessments: Assessment[] = [
    { id: 1, name: 'Assessment 1', duration: '2hr', status: 'Upcoming' },
    { id: 2, name: 'Assessment 2', duration: '2hr', status: 'Completed' },
    { id: 3, name: 'Assessment 3', duration: '2hr', status: 'Upcoming' },
    { id: 4, name: 'Assessment 4', duration: '2hr', status: 'Completed' },
    { id: 5, name: 'Assessment 5', duration: '2hr', status: 'Upcoming' },
    { id: 6, name: 'Assessment 6', duration: '2hr', status: 'Completed' }
  ];

  const handleViewDetails = (assessmentId: number) => {
    navigate(`/student/${category}/assessment/${assessmentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Category Title */}
      <h1 className="text-4xl font-extrabold text-yellow-300 p-8 border-b border-gray-700">
        {category} Assessments
      </h1>

      {/* Scrollable Assessment List */}
      <div className="p-8 max-h-[400px] overflow-y-auto space-y-4">
        {assessments.map((assessment) => (
          <div
            key={assessment.id}
            className="bg-gray-800 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-700"
            onClick={() => handleViewDetails(assessment.id)}
          >
            <div className="flex flex-col space-y-1">
              {/* Assessment Name */}
              <h2 className="text-lg font-bold text-yellow-300 cursor-pointer hover:underline">
                {assessment.name}
              </h2>

              {/* Duration */}
              <span className="text-sm text-gray-400">{assessment.duration}</span>

              {/* Status */}
              <span
                className={`text-sm font-semibold ${
                  assessment.status === 'Upcoming' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {assessment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentList;
