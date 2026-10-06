import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Mic, Lock, Mail, Globe, Sparkles } from 'lucide-react';
import { api } from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { setUser, loadDemoData, loadUserTransactions, setLanguage, loc, language } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await api.login({ email, password });
      localStorage.setItem('token', res.access_token);
      localStorage.removeItem('khata_is_demo');
      setUser(res.user);
      if (res.user.language) {
        setLanguage(res.user.language);
      }
      // Load user transactions immediately
      await loadUserTransactions(res.user.id, res.user.email);
      navigate('/app');
    } catch (err: any) {
      setError(err.message || "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => {
    loadDemoData();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-brand-900 relative">
      {/* Top Language Toggle */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <select 
          className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold outline-none cursor-pointer shadow-2xs"
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
        >
          <option value="mr">मराठी (Marathi)</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 font-black text-2xl text-brand-900">
          <div className="w-10 h-10 rounded-2xl bg-accent-500 text-white flex items-center justify-center shadow-md">
            <Mic size={22} />
          </div>
          <span>Khata se Credit Tak</span>
        </Link>
        <h2 className="mt-6 text-3xl font-extrabold text-brand-900">{loc.login}</h2>
        <p className="mt-2 text-sm text-gray-500">
          New here? <Link to="/register" className="font-bold text-accent-600 hover:text-accent-500">{loc.register}</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl sm:rounded-3xl sm:px-10 border border-gray-100">
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-semibold border border-red-200">{error}</div>}
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="block w-full pl-10 text-sm border-gray-200 rounded-xl p-3 border bg-surface-50 outline-none focus:bg-white focus:border-brand-500 font-medium"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Password</label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="block w-full pl-10 text-sm border-gray-200 rounded-xl p-3 border bg-surface-50 outline-none focus:bg-white focus:border-brand-500 font-medium"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-md text-sm font-extrabold text-white bg-brand-900 hover:bg-brand-800 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Logging in...' : loc.login}
              </button>
            </div>
          </form>

          {/* 1-Click Demo Shortcut */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button
              onClick={handleDemo}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-accent-200 rounded-xl text-xs font-extrabold text-accent-700 bg-accent-50/70 hover:bg-accent-100 transition shadow-2xs cursor-pointer"
            >
              <Sparkles size={15} />
              <span>{loc.oneClickDemo}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
