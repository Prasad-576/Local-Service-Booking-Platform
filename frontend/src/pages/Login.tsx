import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import loginImage from '../assets/images/login2.png';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      setError('');
      
      const res = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Google Login failed');
      }

      // Store token via Context
      login(data.user, data.token);

      // Redirect to Home Page
      navigate('/');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token via Context
      login(data.user, data.token);

      // Redirect to Home Page
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-gray-900 bg-white selection:bg-blue-500 selection:text-white">
      {/* Left Image Section */}
      <div className="hidden md:block md:w-1/2 lg:w-[60%] h-screen">
        <img
          src={loginImage}
          alt="LocalServe Platform Illustration"
          className="w-full h-full object-cover object-[80%]"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 lg:w-[40%] flex items-center justify-center md:justify-end px-8 md:pr-12 lg:pr-24 py-12 bg-white h-screen overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          {/* Logo / Branding */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-blue-600 mb-6">
              Local<span className="font-bold text-blue-600">Serve</span>
            </h1>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Login to your account
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Address */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Options Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer transition-colors"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer select-none">
                  Remember me
                </label>
              </div>

              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-600 hover:to-blue-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                  Create New Account
                </Link>
              </p>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium tracking-wide">OR</span>
              </div>
            </div>
          </div>

          {/* Social Logins */}
          <div className="mt-8 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Authentication Failed')}
              theme="outline"
              size="large"
              width="384px"
              shape="rectangular"
              text="continue_with"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
