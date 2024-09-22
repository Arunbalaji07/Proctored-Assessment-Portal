// Imports and setup
import React, { useEffect, useState } from 'react';
import StudentNavbar from '../../components/StudentNavbar';
import { FaAndroid } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import checkAuth from "../../actions/TokenValidation.ts";
import {studentApi} from "../../axios.config.ts";

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('')
  const [categories, setCategories] = useState<any[]>([]);

  const id = localStorage.getItem('id')

  const isAuthenticated = checkAuth('student')
  if(!isAuthenticated) {
    navigate('/login');
    return;
  }

  const getUser = async () => {
    try {
      const res = await studentApi.get(`/api/student/${id}`)
      setFullName(res.data.data.fullName)
    } catch (err) {
      console.log(err)
    }
  }

  const getCategories = async () => {
    try {
      const res = await studentApi.get('/api/category')
      console.log(res)
      setCategories(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUser()
    getCategories()
  }, []);



  const handleProceed = (category: string) => {
    navigate(`/student/${category}/assessment`); // Ensure this matches the route defined above
};

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <StudentNavbar />
      <div className="p-6">
        <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
          WELCOME {fullName.toUpperCase()}!
        </div>
        <div className="mt-8">
          <h2 className="text-2xl lg:text-3xl font-semibold text-left mb-6">
            LIST OF CATEGORIES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const progress = (category.completed / category.totalAssessments) * 100;
              return (
                <div key={index} className="bg-gray-700 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <FaAndroid className="text-4xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">
                    {category.title.toUpperCase()}
                  </h3>
                  <div className="relative pt-1 mb-5">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-xs font-medium text-yellow-400">Progress</div>
                      <div className="text-xs font-medium text-yellow-400">{Math.round(progress)}%</div>
                    </div>
                    <div className="relative w-full bg-black rounded-full h-2.5">
                      <div
                        className="absolute top-0 left-0 h-2.5 bg-yellow-400 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-4">
                    <div className="flex justify-between mb-2">
                      <p className="text-base">{category.totalAssessments}<br />Assessments</p>
                      <p className="text-base">{category.completed}<br />Completed</p>
                    </div>

                    <button
                      onClick={() => handleProceed(category.title)}
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
