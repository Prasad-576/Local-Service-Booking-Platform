import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: '', role: 'user', area: ''
    });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/register', formData);
            localStorage.setItem('userInfo', JSON.stringify(data));
            if (data.role === 'admin') window.location.href = '/dashboard/admin';
            else if (data.role === 'provider') window.location.href = '/dashboard/provider';
            else window.location.href = '/dashboard/user';
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
                <h2 className="text-center mb-2" style={{ color: 'var(--secondary)' }}>Create an Account</h2>
                {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-1">
                        <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 500 }}>Full Name</label>
                        <input type="text" name="name" onChange={handleChange} required placeholder="John Doe" />
                    </div>
                    <div className="mb-1">
                        <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 500 }}>Email Address</label>
                        <input type="email" name="email" onChange={handleChange} required placeholder="you@example.com" />
                    </div>
                    <div className="mb-1">
                        <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 500 }}>Password</label>
                        <input type="password" name="password" onChange={handleChange} required placeholder="Create a strong password" />
                    </div>
                    <div className="mb-1">
                        <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 500 }}>Phone (Optional)</label>
                        <input type="text" name="phone" onChange={handleChange} placeholder="Your mobile number" />
                    </div>
                    <div className="mb-1" style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 500 }}>I am a</label>
                            <select name="role" onChange={handleChange} value={formData.role}>
                                <option value="user">Customer (Looking for services)</option>
                                <option value="provider">Service Provider (Offering services)</option>
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 500 }}>Area / City</label>
                            <input type="text" name="area" onChange={handleChange} placeholder="e.g., Pune" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-2" style={{ width: '100%', marginTop: '1rem' }}>Sign Up</button>
                </form>
                <p className="text-center" style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" className="text-primary" style={{ textDecoration: 'none', fontWeight: 600 }}>Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
