// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ApplicantFormPage from './pages/ApplicantForm';
import ApplicantListPage from './pages/ApplicantList';
import ApplicantDetailPage from './pages/ApplicantDetail';
import LoginPage from './pages/Login'; // <-- Impor halaman login
import ProtectedRoute from './components/ProtectedRoute'; // <-- Impor ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<ApplicantFormPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rute Admin yang Dilindungi */}
        <Route path="/admin/applicants" element={
          <ProtectedRoute>
            <ApplicantListPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/applicants/:id" element={
          <ProtectedRoute>
            <ApplicantDetailPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;