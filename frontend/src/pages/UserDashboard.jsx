import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Search, MapPin, Star, Bookmark } from 'lucide-react';

const UserDashboard = () => {
    const [providers, setProviders] = useState([]);
    const [area, setArea] = useState('');
    const [category, setCategory] = useState('');
    const [bookings, setBookings] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const categories = [
        'Electrician', 'Plumber', 'Carpenter', 'Cleaning',
        'Painter', 'AC Repair', 'Pest Control', 'Mechanic'
    ];

    useEffect(() => {
        fetchProviders();
        fetchMyBookings();
    }, []);

    const fetchProviders = async (searchArea = '') => {
        try {
            const { data } = await api.get(`/providers${searchArea ? `?area=${searchArea}` : ''}`);
            setProviders(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMyBookings = async () => {
        try {
            const { data } = await api.get('/bookings/my');
            setBookings(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        fetchProviders(area);
    };

    const handleBook = async (providerId, serviceType) => {
        try {
            await api.post('/bookings', {
                providerId,
                serviceType,
                bookingDate: new Date().toISOString(),
                price: 50 // mock baseline
            });
            alert('Booking Requested Successfully!');
            fetchMyBookings();
        } catch (err) {
            alert('Booking failed');
        }
    };

    const filteredProviders = category
        ? providers.filter(p =>
            p.profile?.services?.some(s => s.toLowerCase().includes(category.toLowerCase()))
        )
        : providers;

    return (
        <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="mb-4">
                <h2>My Dashboard</h2>
                <span className="text-light">Discover perfect local services.</span>
            </div>

            <section className="glass-card mb-4" style={{ padding: '2rem', display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div style={{ flex: '1 1 300px' }}>
                    <h3>Location Search</h3>
                    <p className="text-light text-sm mb-2">Find experts in your neighborhood</p>
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.8rem' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                            <input
                                type="text"
                                placeholder="Area (e.g., Pune)"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                style={{ paddingLeft: '2.5rem', borderRadius: '12px' }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Search size={18} /> Search
                        </button>
                    </form>
                </div>

                <div style={{ flex: '2 1 400px' }}>
                    <h3>Service Categories</h3>
                    <p className="text-light text-sm mb-2">Instantly filter results by profession</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button
                            className={`btn ${category === '' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setCategory('')}
                            style={{ padding: '0.4rem 1.2rem', borderRadius: '25px', fontSize: '0.9rem' }}
                        >
                            All Services
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`btn ${category === cat ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => setCategory(category === cat ? '' : cat)}
                                style={{ padding: '0.4rem 1.2rem', borderRadius: '25px', fontSize: '0.9rem' }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mb-4">
                <h3 className="mb-2">Verified Experts</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {filteredProviders.map(p => (
                        <div key={p._id} className="glass-card" style={{ padding: '1.8rem', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--primary), #8B5CF6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1.4rem',
                                    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)'
                                }}>
                                    {p.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{p.name}</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>
                                        <MapPin size={14} /> {p.area || 'Remote / Unknown'}
                                    </div>
                                </div>
                            </div>

                            {p.profile ? (
                                <>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                                        {p.profile.services.map((s, idx) => (
                                            <span key={idx} style={{ background: 'var(--bg-light)', color: 'var(--secondary)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', marginBottom: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                                        <div>
                                            <div className="text-light" style={{ fontSize: '0.8rem', marginBottom: '0.2rem' }}>Experience</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                                                {p.profile.experience || 'N/A'}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-light" style={{ fontSize: '0.8rem', marginBottom: '0.2rem' }}>Avg Rate</div>
                                            <div style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.1rem' }}>
                                                ${p.profile.avgCharge}<span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 'normal' }}>/hr</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem', marginTop: 'auto' }}>
                                    Awaiting profile configuration...
                                </div>
                            )}

                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                onClick={() => handleBook(p._id, category || p.profile?.services[0] || 'General Service')}
                            >
                                <Bookmark size={18} /> Book Appointment
                            </button>
                        </div>
                    ))}
                    {filteredProviders.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem' }} className="glass-card">
                            <Search size={48} color="var(--text-light)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                            <h3 style={{ color: 'var(--text-light)' }}>No providers found</h3>
                            <p className="text-light">Adjust your search parameters or category filter.</p>
                            <button className="btn btn-outline mt-2" onClick={() => { setCategory(''); setArea('') }} style={{ borderRadius: '20px' }}>Clear All Filters</button>
                        </div>
                    )}
                </div>
            </section>

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0 }}>Recent Booking History</h3>
                    <button
                        className="btn btn-outline"
                        onClick={() => setShowHistory(!showHistory)}
                        style={{ borderRadius: '20px', padding: '0.4rem 1.2rem' }}
                    >
                        {showHistory ? 'Hide History' : 'Show History'}
                    </button>
                </div>
                {showHistory && (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {bookings.map(b => (
                            <div key={b._id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'transform 0.2s' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{
                                        backgroundColor: 'var(--bg-light)',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        textAlign: 'center',
                                        minWidth: '85px',
                                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                                    }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.4rem', color: 'var(--primary)' }}>
                                            {new Date(b.bookingDate).getDate()}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 600 }}>
                                            {new Date(b.bookingDate).toLocaleString('default', { month: 'short' })}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, marginBottom: '0.4rem', fontSize: '1.1rem' }}>{b.serviceType}</h4>
                                        <div className="text-sm text-light" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            Provider: <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{b.providerId?.name || 'Unknown Provider'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 'bold', marginBottom: '0.6rem', fontSize: '1.2rem', color: 'var(--text-dark)' }}>${b.price}</div>
                                    <span style={{
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        backgroundColor: b.status === 'pending' ? '#FEF3C7' : b.status === 'accepted' ? '#D1FAE5' : b.status === 'completed' ? '#DBEAFE' : '#F1F5F9',
                                        color: b.status === 'pending' ? '#D97706' : b.status === 'accepted' ? '#059669' : b.status === 'completed' ? '#1D4ED8' : '#64748B'
                                    }}>
                                        {b.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {bookings.length === 0 && (
                            <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderRadius: '12px', color: 'var(--text-light)' }}>
                                You have no active bookings right now. Find a provider to get started!
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default UserDashboard;
