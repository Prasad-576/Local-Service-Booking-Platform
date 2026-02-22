import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('userInfo');
        if (user) {
            setUserInfo(JSON.parse(user));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        window.location.href = '/login';
    };

    const getDashboardLink = () => {
        if (!userInfo) return '/';
        if (userInfo.role === 'admin') return '/dashboard/admin';
        if (userInfo.role === 'provider') return '/dashboard/provider';
        return '/dashboard/user';
    };

    return (
        <nav className="glass" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', letterSpacing: '-0.5px' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>LocalServe.</Link>
            </div>

            <div>
                {userInfo ? (
                    <div style={{ position: 'relative' }}>
                        <div
                            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', backgroundColor: 'var(--bg-white)', padding: '0.4rem 1rem 0.4rem 0.4rem', borderRadius: '30px', border: '1px solid #E2E8F0', transition: 'var(--transition)' }}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <div style={{
                                width: '35px',
                                height: '35px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold'
                            }}>
                                {userInfo.name?.charAt(0).toUpperCase()}
                            </div>
                            <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{userInfo.name.split(' ')[0]}</span>
                            <ChevronDown size={16} color="var(--text-light)" />
                        </div>

                        {dropdownOpen && (
                            <div className="glass-card animate-fade-in" style={{
                                position: 'absolute',
                                top: '120%',
                                right: 0,
                                width: '180px',
                                padding: '0.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.2rem',
                                zIndex: 200
                            }}>
                                <Link
                                    to={getDashboardLink()}
                                    className="dropdown-item"
                                    onClick={() => setDropdownOpen(false)}
                                    style={{ padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dark)', textDecoration: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.2s' }}
                                >
                                    <LayoutDashboard size={16} /> Dashboards
                                </Link>
                                <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '0.3rem 0' }}></div>
                                <div
                                    onClick={handleLogout}
                                    className="dropdown-item"
                                    style={{ padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#DC2626', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.2s' }}
                                >
                                    <LogOut size={16} /> Log Out
                                </div>
                            </div>
                        )}
                        <style>{`
              .dropdown-item:hover {
                background-color: var(--bg-light);
              }
            `}</style>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link to="/login" className="btn btn-outline" style={{ border: 'none' }}>Log In</Link>
                        <Link to="/register" className="btn btn-primary" style={{ borderRadius: '20px' }}>Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
