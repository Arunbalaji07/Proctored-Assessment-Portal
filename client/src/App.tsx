import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {AboutPage, ContactPage, HomePage} from "./pages"
import StudentDashboard from './pages/Student/StudentDashboard';
import EducatorDashboard from './pages/Educator/EducatorDashboard';


const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/student" element={<StudentDashboard />}/>
                    <Route path="/educator" element={<EducatorDashboard />}/>
                </Routes>
            </Router>
        </>
    );
};

export default App;