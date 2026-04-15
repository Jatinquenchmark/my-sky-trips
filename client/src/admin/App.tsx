import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Packages from './pages/Packages';
import PackageForm from './pages/PackageForm';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <AdminLayout title="Overview">
                  <Dashboard />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/packages" 
            element={
              <ProtectedRoute>
                <AdminLayout title="Travel Packages">
                  <Packages />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-package" 
            element={
              <ProtectedRoute>
                <AdminLayout title="Add Package">
                  <PackageForm />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

