import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Mic, ArrowRight, ShieldCheck, PieChart, Languages, BookOpen, Play, X, Sparkles, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DemoGuideModal } from '../components/DemoGuideModal';

export default function Landing() {
  const { loc, setUser, loadDemoData, language, setLanguage } = useAppContext();
  const navigate = useNavigate();
  const [showDemoModal, setShowDemoModal] = useState(false);

  const handleInstantDemo = () => {
    setUser({
      id: 999,
      name: 'Meena Tai',
      business_name: 'Meena Tiffin Center (Pune)',
      business_type: 'Tiffin Service',
      language: 'mr'
    });
    loadDemoData();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-surface-50 text-brand-900 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto flex-wrap gap-4">
        <div className="flex items-center gap-2 font-bold text-xl text-brand-900">
          <Mic className="text-accent-500" /> Khata se Credit Tak
        </div>
        <div className="flex gap-3 items-center">
          {/* Language Selector */}
          <div className="flex bg-white rounded-full p-1 border border-gray-200 text-xs font-bold shadow-2xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${language === 'en' ? 'bg-brand-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${language === 'hi' ? 'bg-brand-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${language === 'mr' ? 'bg-brand-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}
            >
              मराठी
            </button>
          </div>

          <button 
            onClick={handleInstantDemo}
            className="hidden sm:flex items-center gap-1.5 text-accent-600 bg-accent-50 border border-accent-200 hover:bg-accent-100 px-4 py-2 rounded-full font-bold text-sm transition shadow-sm cursor-pointer"
          >
            <Sparkles size={16} /> Try Demo Account
          </button>
          <Link to="/login" className="font-bold hover:text-accent-500 transition px-2">Login</Link>
          <Link to="/register" className="bg-brand-900 text-white px-6 py-2 rounded-full font-bold hover:bg-brand-800 transition shadow-lg text-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <span>🎙 Voice-First AI Finance for Women Micro-Entrepreneurs</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-brand-900">
            {loc.tagline.split('.')[0]}. <span className="text-accent-500">{loc.tagline.split('.')[1]}.</span>
          </h1>
          <p className="text-lg text-brand-700 mb-8 leading-relaxed max-w-xl">
            {loc.heroDesc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link to="/register" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-base transition shadow-xl flex items-center justify-center gap-2">
              <Mic size={22} /> {loc.startKhata}
            </Link>
            
            <button 
              onClick={handleInstantDemo}
              className="bg-brand-900 hover:bg-brand-800 text-white px-6 py-4 rounded-xl font-bold text-base transition shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles size={18} className="text-accent-400" /> 1-Click Demo (Meena Tai)
            </button>
          </div>

          <button 
            onClick={() => setShowDemoModal(true)}
            className="flex items-center gap-2 text-gray-600 hover:text-brand-900 font-bold text-sm transition"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-accent-500">
              <Play size={14} className="fill-accent-500 ml-0.5" />
            </div>
            <span>Watch how Voice Khata works (2 min walkthrough)</span>
          </button>
        </div>
        
        {/* Interactive Hero Mockup */}
        <div className="relative">
          <div className="absolute inset-0 bg-accent-500 rounded-full blur-3xl opacity-20 transform translate-x-10 translate-y-10"></div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white border border-gray-100 p-6 rounded-3xl shadow-2xl max-w-sm mx-auto"
          >
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl mb-6">
               <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Speak in Marathi, Hindi, or English</p>
               <p className="font-semibold text-brand-900 text-base">"आज 18 डबे 70 रुपयांना विकले आणि भाज्यांसाठी 600 रुपये खर्च झाले."</p>
            </div>
            
            <div className="flex justify-center mb-6">
              <button 
                onClick={handleInstantDemo}
                className="bg-accent-500 hover:bg-accent-600 w-20 h-20 rounded-full flex flex-col items-center justify-center text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] animate-pulse transition hover:scale-105"
                title="Click to test demo"
              >
                <Mic size={32} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="bg-green-50 p-4 rounded-xl flex justify-between items-center border border-green-200">
                <span className="font-bold text-gray-800 text-sm">18 Tiffins × ₹70</span>
                <span className="font-bold text-green-600 text-base">+₹1,260</span>
              </div>
              <div className="bg-red-50 p-4 rounded-xl flex justify-between items-center border border-red-200">
                <span className="font-bold text-gray-800 text-sm">Vegetables</span>
                <span className="font-bold text-red-500 text-base">-₹600</span>
              </div>
              <div className="bg-brand-50 p-3 rounded-xl flex justify-between items-center border border-brand-100 text-xs">
                <span className="font-bold text-brand-900">Net Profit</span>
                <span className="font-bold text-accent-600">+₹660 (52% margin)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">From Livelihood to Business</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Transform scattered records and unclear profits into structured financial visibility, unlocking formal credit opportunities.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCard icon={<Languages />} title="Regional Languages" desc="Speak naturally in Hindi or Marathi instead of typing complex accounting terms." />
            <FeatureCard icon={<PieChart />} title="Profit Insights" desc="Automatically calculate actual sales, expenses, and true item margins." />
            <FeatureCard icon={<ShieldCheck />} title="Credit-Readiness" desc="Build a transparent 3-month financial summary to prove business track record." />
            <FeatureCard icon={<BookOpen />} title="Scheme Match" desc="Find relevant government schemes (PMEGP, MUDRA) based on your real records." />
          </div>
        </div>
      </section>
      
      {/* Interactive Demo Guide Modal */}
      <DemoGuideModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />

      {/* Disclaimer & Footer */}
      <footer className="bg-brand-900 text-brand-700 py-12 text-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-brand-800 p-6 rounded-2xl border border-brand-700 mb-8 text-gray-300">
            <p className="font-bold text-white mb-2">Important Disclaimer</p>
            <p>{loc.disclaimer}</p>
          </div>
          <div className="flex justify-between items-center border-t border-brand-800 pt-8">
            <div className="font-bold text-white flex items-center gap-2"><Mic size={16} /> Khata se Credit Tak</div>
            <div>© 2026 RootAccess · SHE SOLVES 3.0</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition">
    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center text-accent-500 mb-4">
      {icon}
    </div>
    <h3 className="font-bold text-lg mb-2 text-brand-900">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
  </div>
);
