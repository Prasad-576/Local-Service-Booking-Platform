import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Lock, Camera, Save } from 'lucide-react';

export default function SettingsView() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@gmail.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('Mumbai, Maharashtra');

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your profile and preferences</p>
      </div>

      {/* Profile Photo */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Profile Photo</h3>
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              JD
            </div>
            <button className="absolute inset-0 w-full h-full rounded-2xl bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">John Doe</p>
            <p className="text-xs text-gray-400 mb-2">john@gmail.com</p>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              Change Photo
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1.5 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-500" />
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1.5 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1.5 flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-500" />
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1.5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              Default Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-gray-500" />
          Security
        </h3>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
          Change Password →
        </button>
      </div>

      {/* Save Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white font-bold text-sm rounded-xl shadow-[0_4px_16px_rgba(37,99,235,0.4)] transition-all"
      >
        <Save className="w-4 h-4" />
        Save Changes
      </motion.button>
    </div>
  );
}
