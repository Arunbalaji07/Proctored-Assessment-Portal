import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ContactPage, HomePage } from './pages';
import StudentDashboard from './pages/Student/StudentDashboard';
import EducatorDashboard from './pages/Educator/EducatorDashboard';
import Protection from './pages/Protection';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateUser from './pages/Admin/CreateUser';
import SystemCompatibility from './pages/SystemCompatibility';
import UserManagement from './pages/Admin/UserManagment';
import CreateAssessment from './pages/Educator/CreateAssessment';
import ManualQuestionUpload from './pages/Educator/QuestionUpload';
import AssessmentManagement from './pages/Educator/Assessment';
import StudentProfilePage from './pages/Student/StudentProfile';
import AssessmentDetails from './components/AssessmentDetail';
import AssessmentList from './components/AssessmentList';
import TestDetailsPage from './pages/Student/TestDetailsPage';
import Askai from './pages/Askai';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/educator" element={<EducatorDashboard />} />
        <Route path="/protection" element={<Protection />} />
        <Route path="/compatibility" element={<SystemCompatibility />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-user" element={<CreateUser />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/educator/create" element={<CreateAssessment />} />
        <Route path="/educator/upload" element={<ManualQuestionUpload />} />
        <Route
          path="/educator/assessments"
          element={<AssessmentManagement />}
        />
        <Route path="/student/profile" element={<StudentProfilePage />} />
        <Route path="/askai" element={<Askai />} />

        {/* Updated nested routes for assessments */}
        <Route path="/student/:category" element={<TestDetailsPage />}>
          <Route path="assessment">
            <Route path=":assessmentId" element={<AssessmentDetails />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
