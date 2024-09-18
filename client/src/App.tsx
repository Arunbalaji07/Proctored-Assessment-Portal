import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {ContactPage, HomePage } from './pages';
import StudentDashboard from './pages/Student/StudentDashboard';
import EducatorDashboard from './pages/Educator/EducatorDashboard';
import Protection from './pages/Protection';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateUser from './pages/Admin/CreateUser';
import SystemCompatibility from './pages/SystemCompatibility';
import UserManagement from './pages/Admin/UserManagment';

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
          <Route path="/compatibility" element={<SystemCompatibility/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/admin/create-user" element={<CreateUser/>}/>
          <Route path='/admin/users' element={<UserManagement/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
