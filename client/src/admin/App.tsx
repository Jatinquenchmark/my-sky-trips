import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Packages from './pages/Packages';
import PackageForm from './pages/PackageForm';
import ActivityManagement from './pages/ActivityManagement';
import Login from './pages/Login';
import Orders from './pages/Orders';
import BookingsByDate from './pages/BookingsByDate';
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
          <Route 
            path="/activities" 
            element={
              <ProtectedRoute>
                <AdminLayout title="Water Adventure Activities">
                  <ActivityManagement />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <AdminLayout title="All Orders">
                  <Orders />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bookings-by-date" 
            element={
              <ProtectedRoute>
                <AdminLayout title="Bookings by Date">
                  <BookingsByDate />
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

