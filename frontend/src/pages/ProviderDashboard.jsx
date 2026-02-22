import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ProviderDashboard = () => {
    const [profile, setProfile] = useState({ services: '', experience: '', avgCharge: '', description: '' });
    const [bookings, setBookings] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProfile();
        fetchBookings();
    }, []);

    const fetchProfile = async () => {
        // There isn't a direct "get my profile" route, but provider can fetch /providers conceptually,
        // or we'll just implement an update directly. We'll default to empty until saved for simplicity here unless we add a GET profile API.
    };

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/providers/my-bookings');
            setBookings(data);
        } catch (err) {
            console.error('Error fetching bookings', err);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const servicesArray = typeof profile.services === 'string' ? profile.services.split(',').map(s => s.trim()) : profile.services;

            // We'll try to create, if fails, update.
            try {
                await api.post('/providers/profile', { ...profile, services: servicesArray });
            } catch (err) {
                await api.put('/providers/update', { ...profile, services: servicesArray });
            }
            alert('Profile saved successfully!');
            setIsEditing(false);
        } catch (err) {
            alert('Failed to save profile');
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await api.patch(`/bookings/${id}/status`, { status });
            fetchBookings();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    return (
        <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
            <h2 className="mb-4">Provider Dashboard</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
                <section className="glass-card" style={{ padding: '1.5rem', height: 'max-content' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="mb-2">
                        <h3>My Profile</h3>
                        <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? 'Cancel' : 'Edit'}
                        </button>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleProfileUpdate}>
                            <div className="mb-1">
                                <label style={{ fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Services (comma separated)</label>
                                <input type="text" value={profile.services} onChange={(e) => setProfile({ ...profile, services: e.target.value })} required />
                            </div>
                            <div className="mb-1">
                                <label style={{ fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Experience</label>
                                <input type="text" value={profile.experience} onChange={(e) => setProfile({ ...profile, experience: e.target.value })} required />
                            </div>
                            <div className="mb-1">
                                <label style={{ fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Avg Charge ($/hr)</label>
                                <input type="number" value={profile.avgCharge} onChange={(e) => setProfile({ ...profile, avgCharge: e.target.value })} required />
                            </div>
                            <div className="mb-2">
                                <label style={{ fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Description</label>
                                <textarea rows="3" value={profile.description} onChange={(e) => setProfile({ ...profile, description: e.target.value })} required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save Profile</button>
                        </form>
                    ) : (
                        <div>
                            <p className="text-light text-sm mb-2">Update your profile to show up in search results and attract more customers.</p>
                            <p>Ready to receive bookings.</p>
                        </div>
                    )}
                </section>

                <section>
                    <h3 className="mb-2">Incoming Bookings</h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {bookings.map(b => (
                            <div key={b._id} className="glass" style={{ padding: '1.5rem', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div>
                                        <h4 style={{ marginBottom: '0.3rem' }}>{b.serviceType}</h4>
                                        <span className="text-light text-sm">Customer: {b.userId?.name} ({b.userId?.phone || 'No phone'})</span>
                                    </div>
                                    <div>
                                        <span style={{
                                            padding: '0.3rem 0.6rem',
                                            borderRadius: '4px',
                                            fontSize: '0.8rem',
                                            backgroundColor: b.status === 'pending' ? 'orange' : b.status === 'accepted' ? 'var(--accent-green)' : 'gray',
                                            color: 'white',
                                            fontWeight: 'bold'
                                        }}>
                                            {b.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                {b.status === 'pending' && (
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button className="btn btn-primary" onClick={() => handleUpdateStatus(b._id, 'accepted')}>Accept</button>
                                        <button className="btn btn-outline" onClick={() => handleUpdateStatus(b._id, 'cancelled')}>Reject</button>
                                    </div>
                                )}
                                {b.status === 'accepted' && (
                                    <button className="btn btn-primary" onClick={() => handleUpdateStatus(b._id, 'completed')}>Mark Completed</button>
                                )}
                            </div>
                        ))}
                        {bookings.length === 0 && <p className="text-light">No booking requests right now.</p>}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProviderDashboard;
