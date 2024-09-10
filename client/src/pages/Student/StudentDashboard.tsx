import React, { useEffect, useState } from 'react';
import StudentNavbar from '../../components/StudentNavbar';
import { FaAndroid } from 'react-icons/fa';

const StudentDashboard: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [assignments, setAssignments] = useState<any[]>([]);

  const mockUserData = { name: 'John Doe' };
  const mockAssignmentsData = [
    {
      category: 'Assessment Category 1',
      totalAssessments: 10,
      completed: 9,
      startDate: '10.10.10',
      endDate: '10.10.10'
    },
    {
      category: 'Assessment Category 2',
      totalAssessments: 10,
      completed: 1,
      startDate: '10.10.10',
      endDate: '10.10.10'
    },
    {
      category: 'Assessment Category 3',
      totalAssessments: 10,
      completed: 1,
      startDate: '10.10.10',
      endDate: '10.10.10'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setUserName(mockUserData.name);
      setAssignments(mockAssignmentsData);
    }, 1000);
  }, []);

  const handleProceed = (category: string) => {
    alert(`Proceeding with ${category}`);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <StudentNavbar />

      <div className="p-6">
        <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
          WELCOME {userName.toUpperCase()}!
        </div>

        <div className="mt-8">
          <h2 className="text-2xl lg:text-3xl font-semibold text-left mb-6">
            LIST OF ASSESSMENTS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assignments.map((assignment, index) => {
              const progress = (assignment.completed / assignment.totalAssessments) * 100;

              return (
                <div key={index} className="bg-gray-700 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <FaAndroid className="text-4xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">
                    {assignment.category}
                  </h3>
                  
                  <div className="border-b border-gray-600 mb-4"></div>
                  <div className="relative pt-1 mb-5">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-xs font-medium text-yellow-400">
                        Progress
                      </div>
                      <div className="text-xs font-medium text-yellow-400">
                        {Math.round(progress)}%
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="relative w-full bg-black rounded-full h-2.5">
                        <div
                          className="absolute top-0 left-0 h-2.5 bg-yellow-400 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-4">
                    <div className="flex justify-between mb-2">
                      <p className="text-base">{assignment.totalAssessments}<br />Assessments</p>
                      <p className="text-base">{assignment.completed}<br />Completed</p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <p className="text-base">{assignment.startDate}<br />Start Date</p>
                      <p className="text-base">{assignment.endDate}<br />End Date</p>
                    </div>
                    <button
                      onClick={() => handleProceed(assignment.category)}
                      className="w-full py-2 bg-white text-black rounded hover:bg-yellow-400"
                    >
                      View Assessments
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
