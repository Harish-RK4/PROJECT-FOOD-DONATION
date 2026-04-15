import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import DonorDashboard from './pages/Dashboards/DonorDashboard';
import ReceiverDashboard from './pages/Dashboards/ReceiverDashboard';
import AdminDashboard from './pages/Dashboards/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import InteractiveCursor from './components/InteractiveCursor';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <InteractiveCursor />
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/donor" element={
              <ProtectedRoute allowedRoles={['donor']}>
                <DonorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/receiver" element={
              <ProtectedRoute allowedRoles={['receiver']}>
                <ReceiverDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
