import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, Clock } from 'lucide-react';

const Home = () => {
    return (
        <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
            <section className="text-center mb-4">
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--secondary)' }}>
                    Find the Best <span className="text-primary">Local Services</span> Instantly
                </h1>
                <p className="text-light mb-2" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Connect with trusted professionals in your area for home repairs, cleaning, and more.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/search" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                        <Search size={20} style={{ marginRight: '0.5rem' }} /> Explore Services
                    </Link>
                </div>
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <Shield size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                    <h3 className="mb-1">Verified Providers</h3>
                    <p className="text-light">Every service provider is thoroughly vetted for your peace of mind.</p>
                </div>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <Clock size={48} color="var(--accent-green)" style={{ margin: '0 auto 1rem' }} />
                    <h3 className="mb-1">Instant Booking</h3>
                    <p className="text-light">Book appointments easily and securely directly from the platform.</p>
                </div>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <Search size={48} color="var(--accent-orange)" style={{ margin: '0 auto 1rem' }} />
                    <h3 className="mb-1">Local Search</h3>
                    <p className="text-light">Find experts specifically tailored to your neighborhood or area.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
