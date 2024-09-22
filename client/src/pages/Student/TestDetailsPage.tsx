import React from 'react';
import { Outlet } from 'react-router-dom';
import AssessmentList from '@/components/AssessmentList';
import StudentNavbar from '@/components/StudentNavbar';

const TestDetailsPage: React.FC = () => {
  return (
    <><div className=' bg-gray-900'>
          <StudentNavbar />
      </div>
      <div className="min-h-screen bg-gray-900 text-white p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Assessment List */}
                  <div className="col-span-1 g:col-span-2 bg-gray-800 p-4 rounded-lg shadow-lg">
                      <AssessmentList />
                  </div>

                  {/* Assessment Details */}
                  <div className="col-span-1 lg:col-span-3 bg-gray-800 p-6 rounded-lg shadow-lg">
                      <Outlet />
                  </div>
              </div>
          </div></>
  );
};

export default TestDetailsPage;
