import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, useAppContext, Language } from './context/AppContext';
import { Home, Mic, BookOpen, PieChart, ShieldCheck, FileText, Globe, LogOut, Sparkles, Building2, Users } from 'lucide-react';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import VoiceKhata from './pages/VoiceKhata';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import Readiness from './pages/Readiness';
import Schemes from './pages/Schemes';
import UdhaarKhata from './pages/UdhaarKhata';
import Login from './pages/Login';
import Register from './pages/Register';

const LanguageSelector: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { language, setLanguage } = useAppContext();
  
  const langs: { code: Language; label: string }[] = [
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'en', label: 'EN' }
  ];

  return (
    <div className={`flex items-center rounded-xl bg-gray-100 p-1 border border-gray-200/80 shadow-inner ${compact ? 'text-xs' : 'text-sm'}`}>
      <Globe size={compact ? 13 : 15} className="text-gray-400 mx-1.5 shrink-0" />
      {langs.map(l => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code)}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
            language === l.code 
              ? 'bg-brand-900 text-white shadow-sm scale-100' 
              : 'text-gray-600 hover:text-brand-900 hover:bg-gray-200/50'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
};

const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loc, language, setLanguage, user, logout, isDemoMode } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const navItems = [
    { path: '/app', icon: <Home size={20} />, label: loc.navDashboard },
    { path: '/app/voice', icon: <Mic size={20} />, label: loc.navKhata },
    { path: '/app/ledger', icon: <BookOpen size={20} />, label: loc.navTransactions },
    { path: '/app/udhaar', icon: <Users size={20} />, label: loc.navUdhaar },
    { path: '/app/insights', icon: <PieChart size={20} />, label: loc.navInsights },
    { path: '/app/readiness', icon: <ShieldCheck size={20} />, label: loc.navReadiness },
    { path: '/app/schemes', icon: <FileText size={20} />, label: loc.navSchemes },
  ];

  return (
    <div className="flex h-screen bg-surface-50 overflow-hidden font-sans text-brand-900">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col h-full shadow-lg z-20 shrink-0">
        <div className="p-5 flex flex-col gap-3 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2.5 text-brand-900 font-extrabold text-xl tracking-tight">
            <div className="w-9 h-9 rounded-xl bg-accent-500 text-white flex items-center justify-center shadow-md">
              <Mic size={20} />
            </div>
            <span>Khata <span className="text-accent-500 text-sm font-normal">se Credit Tak</span></span>
          </Link>
          
          {/* Global Language Selector in Sidebar */}
          <LanguageSelector />
        </div>

        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`w-full flex items-center p-3 rounded-xl transition-all font-semibold ${
                location.pathname === item.path 
                ? 'bg-accent-50 text-accent-600 font-bold border border-accent-200 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-brand-900'
              }`}
            >
              <span className={`mr-3 ${location.pathname === item.path ? 'text-accent-600' : 'text-gray-400'}`}>
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/70 flex justify-between items-center">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-1.5">
              <Building2 size={13} className="text-gray-400 shrink-0" />
              <p className="font-bold text-sm text-brand-900 truncate">
                {user.business_name || user.name}
              </p>
            </div>
            <p className="text-xs text-accent-600 font-semibold truncate">
              {user.business_type || 'Micro-Enterprise'}
            </p>
            {isDemoMode && (
              <span className="inline-block mt-0.5 text-[10px] font-extrabold bg-accent-100 text-accent-700 px-1.5 py-0.2 rounded">
                DEMO
              </span>
            )}
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }} 
            className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition shrink-0" 
            title={loc.logout}
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Header (Desktop & Mobile) */}
        <header className="bg-white border-b border-gray-100 px-4 md:px-8 py-3.5 shadow-xs flex justify-between items-center z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="md:hidden flex items-center gap-2 font-bold text-brand-900">
              <div className="w-7 h-7 rounded-lg bg-accent-500 text-white flex items-center justify-center">
                <Mic size={16} />
              </div>
              <span className="text-base">Khata</span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <span className="font-bold text-brand-900">{user.business_name || user.name}</span>
              <span>•</span>
              <span className="text-accent-600 font-semibold">{user.business_type}</span>
              {isDemoMode && (
                <span className="flex items-center gap-1 bg-rose-50 text-rose-600 text-xs px-2.5 py-0.5 rounded-full font-bold border border-rose-200">
                  <Sparkles size={12} /> {loc.demoModeBadge}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <LanguageSelector compact />

            {/* Logout on mobile header */}
            <button 
              onClick={() => { logout(); navigate('/'); }} 
              className="md:hidden text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-gray-100"
              title={loc.logout}
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto relative pb-24 md:pb-8 scroll-smooth bg-surface-50">
          <div className="max-w-5xl mx-auto h-full">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 pb-safe shadow-lg z-30">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-xl transition ${
                location.pathname === item.path ? 'text-accent-600 font-bold bg-accent-50/50' : 'text-gray-400'
              }`}
            >
              {React.cloneElement(item.icon, { size: 20, className: location.pathname === item.path ? 'stroke-2 text-accent-600' : 'stroke-[1.5]' })}
              <span className="text-[10px] mt-1 truncate max-w-[55px]">{item.label.split(' ')[0]}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<AppShell><Dashboard /></AppShell>} />
          <Route path="/app/dashboard" element={<AppShell><Dashboard /></AppShell>} />
          <Route path="/app/voice" element={<AppShell><VoiceKhata /></AppShell>} />
          <Route path="/app/ledger" element={<AppShell><Transactions /></AppShell>} />
          <Route path="/app/transactions" element={<AppShell><Transactions /></AppShell>} />
          <Route path="/app/udhaar" element={<AppShell><UdhaarKhata /></AppShell>} />
          <Route path="/app/insights" element={<AppShell><Insights /></AppShell>} />
          <Route path="/app/readiness" element={<AppShell><Readiness /></AppShell>} />
          <Route path="/app/statement" element={<AppShell><Readiness /></AppShell>} />
          <Route path="/app/schemes" element={<AppShell><Schemes /></AppShell>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
