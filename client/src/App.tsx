import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {ContactPage, HomePage } from './pages';
import StudentDashboard from './pages/Student/StudentDashboard';
import EducatorDashboard from './pages/Educator/EducatorDashboard';
import Protection from './pages/Protection';// Import the Protection component
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateEducator from './pages/Admin/CreateEducator';
import SystemCompatibility from './pages/SystemCompatibility';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/educator" element={<EducatorDashboard />} />
          <Route path="/protection" element={<Protection />} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/admin/create-edu" element={<CreateEducator/>}/>
          <Route path="/compatibility" element={<SystemCompatibility/>} />
          {/* Add route for Protection */}
        </Routes>
      </Router>
    </>
  )
}

export default App
