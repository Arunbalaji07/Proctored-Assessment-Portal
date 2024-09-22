import React, { useEffect, useState } from 'react';
import StudentNavbar from '../../components/StudentNavbar'; // Reuse the navbar component
import { useNavigate } from 'react-router-dom';
import checkAuth from "../../actions/TokenValidation.ts";
import { studentApi } from "../../axios.config.ts";


interface StudentData {
  fullName: string;
  email: string;
  phoneNo?: string;
  gender: string;
}

const StudentProfile: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<StudentData>({
    fullName: '',
    email: '',
    phoneNo: '',
    gender: "", // Set default to 'Select your gender'
  });

  const id = localStorage.getItem('id');

  const isAuthenticated = checkAuth('student');
  if (!isAuthenticated) {
    navigate('/login');
    return;
  }

  const getUser = async () => {
    try {
      const res = await studentApi.get(`/api/student/${id}`);
      const student = res.data.data;
      setUserData({
        fullName: student.fullName,
        email: student.email,
        phoneNo: student.phoneNo || '',
        gender: student.gender, // Ensure gender is set or defaults to 'Select your gender'
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        fullName: userData.fullName,
        email: userData.email,
        phoneNo: userData.phoneNo,
        gender: userData.gender,
      };

      const res = await studentApi.put(`/api/student/${id}`, updatedData);

      if (res.status === 200) {
        // Update was successful, stop editing
        setIsEditing(false);
        alert("Profile updated successfully");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating profile. Please try again.");
    }
  };

  return (
      <div className="min-h-screen bg-gray-800 text-white">
        <StudentNavbar /> {/* Student Navbar */}

        <div className="p-6">
          <div className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
            PROFILE - {userData.fullName.toUpperCase()}
          </div>

          <div className="max-w-4xl mx-auto bg-gray-700 rounded-lg p-6">
            {/* Profile Image */}
            <div className="flex justify-center items-center mb-6">
              <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-yellow-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-yellow-400">Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-lg text-black focus:outline-none ${
                        !isEditing ? 'bg-gray-100' : ''
                    }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-yellow-400">Email</label>
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-lg text-black focus:outline-none ${
                        !isEditing ? 'bg-gray-100' : ''
                    }`}
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-yellow-400">Mobile</label>
                <input
                    type="tel"
                    name="phoneNo"
                    value={userData.phoneNo}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-lg text-black focus:outline-none ${
                        !isEditing ? 'bg-gray-100' : ''
                    }`}
                    placeholder="Enter Mobile Number"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-yellow-400">Gender</label>
                <select
                    name="gender"
                    value={userData.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-lg text-black focus:outline-none ${
                        !isEditing ? 'bg-gray-100' : ''
                    }`}
                >
                  <option value="NULL" disabled>
                    Select your gender
                  </option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHERS">Other</option>
                </select>
              </div>
            </div>

            {/* Edit/Save Buttons */}
            <div className="mt-6 flex justify-end">
              {isEditing ? (
                  <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                  >
                    Save
                  </button>
              ) : (
                  <button
                      onClick={handleEditToggle}
                      className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default StudentProfile;
