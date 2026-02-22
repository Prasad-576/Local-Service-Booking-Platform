import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="main-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/search" element={<UserDashboard />} />
                    <Route path="/dashboard/user" element={<UserDashboard />} />
                    <Route path="/dashboard/provider" element={<ProviderDashboard />} />
                    <Route path="/dashboard/admin" element={<AdminDashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
