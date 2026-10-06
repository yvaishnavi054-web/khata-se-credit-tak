import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext, Language } from '../context/AppContext';
import { Mic, Building2, User, Mail, Lock, MapPin, Globe } from 'lucide-react';
import { api } from '../lib/api';

export default function Register() {
  const { setUser, setLanguage, loadUserTransactions, language, loc } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '', 
    business_name: '',
    business_type: 'Tiffin Service', 
    language: language || 'mr',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCustomType, setIsCustomType] = useState(false);
  const [customBusinessType, setCustomBusinessType] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const finalBusinessType = isCustomType 
        ? (customBusinessType.trim() || 'Micro-Enterprise') 
        : formData.business_type;
      
      const payload = {
        ...formData,
        business_type: finalBusinessType
      };

      const res = await api.register(payload);
      localStorage.setItem('token', res.access_token);
      localStorage.removeItem('khata_is_demo');
      localStorage.removeItem('khata_biz_type'); // clear any old trade override
      setUser(res.user);
      if (res.user.language) {
        setLanguage(res.user.language as Language);
      }
      await loadUserTransactions(res.user.id, res.user.email);
      navigate('/app');
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-brand-900 relative">
      {/* Top Language Toggle */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <select 
          className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold outline-none cursor-pointer shadow-2xs"
          value={language}
          onChange={(e) => {
            const lang = e.target.value as Language;
            setLanguage(lang);
            setFormData(prev => ({ ...prev, language: lang }));
          }}
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
        <h2 className="mt-4 text-3xl font-extrabold text-brand-900">{loc.startKhata}</h2>
        <p className="mt-1 text-sm text-gray-500">
          “Build your business record, one voice entry at a time.”
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 shadow-xl sm:rounded-3xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-semibold border border-red-200">
                {error}
              </div>
            )}
            
            {/* Section 1: Personal Details */}
            <div>
              <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider mb-3">
                1. Personal Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Meena Patil"
                    className="w-full border-gray-200 rounded-xl p-3 border bg-surface-50 outline-none focus:bg-white focus:border-brand-500 text-sm font-medium" 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="meena@example.com"
                    className="w-full border-gray-200 rounded-xl p-3 border bg-surface-50 outline-none focus:bg-white focus:border-brand-500 text-sm font-medium" 
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-3.5">
                <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full border-gray-200 rounded-xl p-3 border bg-surface-50 outline-none focus:bg-white focus:border-brand-500 text-sm font-medium" 
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {/* Section 2: Business Information */}
            <div className="pt-2 border-t border-gray-100">
              <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider mb-3">
                2. Business Profile
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Business Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Meena Tiffin Center"
                    className="w-full border-gray-200 rounded-xl p-3 border bg-surface-50 outline-none focus:bg-white focus:border-brand-500 text-sm font-medium" 
                    value={formData.business_name}
                    onChange={e => setFormData({ ...formData, business_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Location / City</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Pune / Kolhapur"
                    className="w-full border-gray-200 rounded-xl p-3 border bg-surface-50 outline-none focus:bg-white focus:border-brand-500 text-sm font-medium" 
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {language === 'mr' ? 'व्यवसाय प्रकार' : language === 'hi' ? 'व्यवसाय श्रेणी' : 'Business Type'}
                  </label>
                  <select
                    className="w-full border-gray-200 rounded-xl p-3 border bg-surface-50 outline-none focus:bg-white focus:border-brand-500 text-sm font-bold cursor-pointer" 
                    value={isCustomType ? 'Other' : formData.business_type}
                    onChange={e => {
                      const val = e.target.value;
                      if (val === 'Other') {
                        setIsCustomType(true);
                        setFormData({ ...formData, business_type: 'Other' });
                      } else {
                        setIsCustomType(false);
                        setCustomBusinessType('');
                        setFormData({ ...formData, business_type: val });
                      }
                    }}
                  >
                    <option value="Tiffin Service">🍱 {language === 'mr' ? 'डबेवाला / खाद्य सेवा' : language === 'hi' ? 'टिफिन / भोजन सेवा' : 'Tiffin / Food Service'}</option>
                    <option value="Tailoring">✂️ {language === 'mr' ? 'शिलाई व बुटीक' : language === 'hi' ? 'सिलाई एवं बुटीक' : 'Tailoring & Boutique'}</option>
                    <option value="Home Bakery">🧁 {language === 'mr' ? 'होम बेकरी' : language === 'hi' ? 'होम बेकरी' : 'Home Bakery'}</option>
                    <option value="Beauty / Parlour">💇 {language === 'mr' ? 'ब्यूटी पार्लर' : language === 'hi' ? 'ब्यूटी पार्लर' : 'Beauty / Parlour'}</option>
                    <option value="Handicrafts">🎨 {language === 'mr' ? 'हस्तकला व गृहउद्योग' : language === 'hi' ? 'हस्तकला एवं कला' : 'Handicrafts & Art'}</option>
                    <option value="Small Shop">🛍️ {language === 'mr' ? 'छोटे दुकान / किराणा' : language === 'hi' ? 'छोटी दुकान / जनरल स्टोर' : 'Small Shop / Retail'}</option>
                    <option value="Other">✏️ {language === 'mr' ? 'इतर (स्वतःचा व्यवसाय प्रकार लिहा...)' : language === 'hi' ? 'अन्य (अपना व्यवसाय प्रकार लिखें...)' : 'Other (Type your own business...)'}</option>
                  </select>

                  {isCustomType && (
                    <div className="mt-2.5">
                      <label className="block text-[11px] font-bold text-accent-600 mb-1">
                        {language === 'mr' ? 'तुमचा व्यवसाय प्रकार लिहा:' : language === 'hi' ? 'अपना व्यवसाय प्रकार यहाँ लिखें:' : 'Type Your Custom Business Type:'}
                      </label>
                      <input
                        required
                        type="text"
                        autoFocus
                        placeholder={language === 'mr' ? 'उदा. डेअरी, पोल्ट्री, फोटोग्राफी, नर्सरी...' : language === 'hi' ? 'उदा. डेयरी, पोल्ट्री, फोटोग्राफी...' : 'e.g. Dairy Farm, Poultry, Photography, Nursery...'}
                        className="w-full border-accent-300 rounded-xl p-3 border-2 bg-accent-50/20 outline-none focus:bg-white focus:border-accent-500 text-sm font-bold text-brand-900"
                        value={customBusinessType}
                        onChange={e => setCustomBusinessType(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Preferred Language</label>
                  <select
                    className="w-full border-gray-200 rounded-xl p-3 border bg-surface-50 outline-none focus:bg-white focus:border-brand-500 text-sm font-bold cursor-pointer" 
                    value={formData.language}
                    onChange={e => {
                      const l = e.target.value as Language;
                      setFormData({ ...formData, language: l });
                      setLanguage(l);
                    }}
                  >
                    <option value="mr">मराठी (Marathi)</option>
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 rounded-xl shadow-lg text-base font-extrabold text-white bg-accent-500 hover:bg-accent-600 transition disabled:opacity-50 mt-4 cursor-pointer"
              >
                {loading ? 'Creating Your Khata...' : '✓ Create My Khata'}
              </button>
            </div>
            
            <p className="text-center text-xs text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-brand-900 underline">
                {loc.login}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
