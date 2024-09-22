import React, { useState } from 'react';
import StudentNavbar from '../../components/StudentNavbar'; // Reuse the navbar component
import { useNavigate } from 'react-router-dom';

const StudentProfile: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '',
    gender: ''
  });

  const token = localStorage.getItem('student');
  if (!token) {
    navigate('/');
    return;
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    // API call to save the updated user data
    setIsEditing(false);
    // Add any necessary notifications
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <StudentNavbar /> {/* Student Navbar */}

      <div className="p-6">
        <div className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
          PROFILE - {userData.name.toUpperCase()}
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
            {/* Name */}
            <div>
              <label className="block text-yellow-400">Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                disabled
                className="w-full px-4 py-2 border rounded-lg bg-gray-600 text-gray-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-yellow-400">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                disabled
                className="w-full px-4 py-2 border rounded-lg bg-gray-600 text-gray-200"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-yellow-400">Mobile</label>
              <input
                type="tel"
                name="mobile"
                value={userData.mobile}
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
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
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
