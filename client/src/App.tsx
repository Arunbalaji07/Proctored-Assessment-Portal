import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ContactPage, HomePage } from './pages';
import StudentDashboard from './pages/Student/StudentDashboard';
import EducatorDashboard from './pages/Educator/EducatorDashboard';

import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateUser from './pages/Admin/CreateUser';
import SystemCompatibility from './pages/SystemCompatibility';
import UserManagement from './pages/Admin/UserManagment';
import CreateAssessment from './pages/Educator/CreateAssessment';
import ManualQuestionUpload from './pages/Educator/QuestionUpload';
import AssessmentManagement from './pages/Educator/Assessment';
import StudentProfilePage from './pages/Student/StudentProfile';
import AssessmentDetails from './components/AssessmentDetail';
import EducatorProfile from './pages/Educator/EducatorProfile';
import TestDetailsPage from './pages/Student/TestDetailsPage';
import Askai from './pages/Askai';
import AssessmentSetup from './pages/Student/SystemCheck';
import TestPage from './pages/Student/ViewTest';
import ReportsPage from './pages/Student/StudentReport';
import Protection from './components/Protection';
import ViewAssessmentList from './pages/Admin/ViewAssessments';
import StudentReportAdmin from './pages/Admin/StudentReportAdmin';
import EditAssessment from "./pages/Educator/EditAssessment.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/educator" element={<EducatorDashboard />} />
        <Route path="/compatibility" element={<SystemCompatibility />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-user" element={<CreateUser />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/educator/create" element={<CreateAssessment />} />
        <Route path="/educator/upload" element={<ManualQuestionUpload />} />
        <Route path="/educator/edit/assessment/:assessmentId" element={<EditAssessment />} />
        <Route path="/educator/profile" element={<EducatorProfile/>}/>
        {/* <Route path="/protection" element={<Protection/>}/> */}
        <Route 
          path="/educator/assessments"
          element={<AssessmentManagement />}
        />
        <Route path="/student/profile" element={<StudentProfilePage />} />
        {/* <Route path="/askai" element={<Askai />} /> */}
        <Route path="/student/assessment-setup/:assessmentId" element={<AssessmentSetup/>}/>
        <Route path="/student/assessment-start" element={<TestPage/>}/>
        <Route path="/reports" element={<ReportsPage/>}/>

        {/* Updated nested routes for assessments */}
        <Route path="/student/:category" element={<TestDetailsPage />}>
          <Route path="assessment">
            <Route path=":assessmentId" element={<AssessmentDetails />} />
          </Route>
        </Route>
        <Route path="/admin/assessments" element={<ViewAssessmentList/>}/>
        <Route path="/admin/student-reports/:assessmentId" element={<StudentReportAdmin/>} />
      </Routes>
    </Router>
  )
}

export default App;
