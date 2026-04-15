import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import DonorDashboard from './pages/Dashboards/DonorDashboard';
import ReceiverDashboard from './pages/Dashboards/ReceiverDashboard';
import AdminDashboard from './pages/Dashboards/AdminDashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/donor" element={<DonorDashboard />} />
            <Route path="/receiver" element={<ReceiverDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
