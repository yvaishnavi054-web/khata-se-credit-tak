import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { X, Mic, CheckCircle2, FileText, ArrowRight, Play, Volume2, Sparkles, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DemoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoGuideModal: React.FC<DemoGuideModalProps> = ({ isOpen, onClose }) => {
  const { language, loc, loadDemoData, speakText } = useAppContext();
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const demoSteps = [
    {
      title: {
        en: "1. Tap 'Bolo' & Speak Naturally",
        hi: "1. 'बोलो' दबाएं और स्वाभाविक रूप से बोलें",
        mr: "१. 'बोलो' दाबा आणि सहज तोंडी बोला"
      },
      subtitle: {
        en: "No rigid formats or complicated accounting knowledge needed.",
        hi: "कठिन बहीखाता या टाइपिंग की कोई आवश्यकता नहीं है।",
        mr: "कोणत्याही किचकट हिशोबाची किंवा टायपिंगची गरज नाही."
      },
      example: {
        en: '"Sold 20 tiffins today at ₹70 each. Bought vegetables for ₹600 and wheat for ₹450."',
        hi: '"आज 20 डबे विकले, 70 रुपये का एक. 600 रुपये की सब्जी और 450 रुपये का गेहूं लाया."',
        mr: '"आज 20 डबे विकले, 70 रुपये प्रत्येकी. 600 रुपयांची भाजी आणि 450 रुपयांचा गहू आणला."'
      },
      calc: {
        income: "₹1,400 (20 × ₹70)",
        expenses: "₹1,050 (₹600 + ₹450)",
        profit: "₹350"
      },
      icon: Mic,
      color: "from-rose-500 to-pink-600"
    },
    {
      title: {
        en: "2. Verify on Confirmation Card",
        hi: "2. पुष्टिकरण कार्ड पर जांचें व सुधारें",
        mr: "२. खात्री कार्डवर तपासा व सेव्ह करा"
      },
      subtitle: {
        en: "Review extracted income, costs, and profit before anything is saved.",
        hi: "कुछ भी सहेजने से पहले आय, खर्च और मुनाफे की पुष्टि करें।",
        mr: "काहीही सेव्ह करण्यापूर्वी उत्पन्न, खर्च आणि खरा नफा तपासून घ्या."
      },
      example: {
        en: "You can click 'Edit' if any quantity or price needs correction.",
        hi: "यदि कोई संख्या या भाव बदलना हो, तो तुरंत 'सुधारें' पर क्लिक करें।",
        mr: "काही बदल करायचा असल्यास लगेच 'बदला' वर क्लिक करून दुरुस्त करा."
      },
      calc: {
        income: "Income: ₹1,400",
        expenses: "Expenses: ₹1,050",
        profit: "Net Profit: ₹350"
      },
      icon: CheckCircle2,
      color: "from-amber-500 to-orange-600"
    },
    {
      title: {
        en: "3. Understand Real Profit & Margins",
        hi: "3. वास्तविक मुनाफा और मार्जिन समझें",
        mr: "३. खरा नफा आणि मार्जिन समजून घ्या"
      },
      subtitle: {
        en: "Income − Expenses = Actual Net Take-Home Profit.",
        hi: "कुल बिक्री में से सारे खर्चे घटाकर अपनी वास्तविक शुद्ध बचत जानें।",
        mr: "एकूण विक्रीतून सर्व खर्च वजा करून घरी उरणारा खरा नफा समजून घ्या."
      },
      example: {
        en: "Track item-level margins (e.g. 1 Tiffin Meal: 50% margin) to price your services correctly.",
        hi: "उत्पाद के अनुसार मार्जिन देखें ताकि अपने सामान या सेवा का सही मूल्य रख सकें।",
        mr: "प्रत्येक वस्तूचे मार्जिन तपासून आपल्या कामाचे योग्य दर ठरवा."
      },
      calc: {
        income: "Gross Sales",
        expenses: "− Total Costs",
        profit: "= Take-Home Profit"
      },
      icon: Sparkles,
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: {
        en: "4. Download 3-Month Bank-Ready Statement",
        hi: "4. 3-माह का बैंक-रेडी स्टेटमेंट डाउनलोड करें",
        mr: "४. ३ महिन्यांचे बँक-रेडी स्टेटमेंट डाऊनलोड करा"
      },
      subtitle: {
        en: "Formalize your track record for MUDRA, PMEGP, or SHG credit linkage.",
        hi: "मुद्रा योजना, पीएमईजीपी या महिला बचत गट कर्जासाठी अधिकृत विवरण पत्रक।",
        mr: "मुद्रा कर्ज, पीएमईजीपी किंवा बचत गट अर्थसहाय्यासाठी छापील विवरण."
      },
      example: {
        en: "Professional PDF containing 90-day averages, consistency score, and formal declaration.",
        hi: "९० दिनों का औसत, निरंतरता स्कोर और स्व-घोषणा पत्र सहित औपचारिक पीडीएफ।",
        mr: "९० दिवसांची सरासरी, सातत्य गुण आणि स्वयंघोषणापत्रासह व्यावसायिक पीडीएफ."
      },
      calc: {
        income: "Avg Monthly: ₹32,000",
        expenses: "Avg Costs: ₹16,500",
        profit: "Avg Profit: ₹15,500"
      },
      icon: Building2,
      color: "from-blue-600 to-indigo-700"
    }
  ];

  const current = demoSteps[activeStep];
  const StepIcon = current.icon;

  const handleLaunchDemo = () => {
    loadDemoData();
    onClose();
    navigate('/app/dashboard');
  };

  const playVoiceExample = () => {
    speakText(current.example[language] || current.example.en, language);
  };

  return (
    <div className="fixed inset-0 bg-brand-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full cursor-pointer transition"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-black uppercase tracking-wider bg-rose-50 text-accent-600 px-2.5 py-0.5 rounded-full border border-rose-100">
            Interactive Visual Guide
          </span>
          <span className="text-xs text-gray-400 font-semibold">Step {activeStep + 1} of 4</span>
        </div>

        <h2 className="text-2xl font-black text-brand-900 tracking-tight mb-1">
          {current.title[language] || current.title.en}
        </h2>
        <p className="text-xs text-gray-500 font-medium mb-6">
          {current.subtitle[language] || current.subtitle.en}
        </p>

        {/* Visual Card Preview */}
        <div className={`p-6 rounded-3xl bg-gradient-to-br ${current.color} text-white shadow-lg mb-6 relative overflow-hidden`}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <StepIcon size={26} />
            </div>
            
            <button
              onClick={playVoiceExample}
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition"
              title="Listen to this example"
            >
              <Volume2 size={15} />
              <span>Listen</span>
            </button>
          </div>

          <div className="bg-black/20 p-4 rounded-2xl backdrop-blur-xs border border-white/10 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 block mb-1">
              Sample Voice Command:
            </span>
            <p className="text-sm font-semibold italic text-white leading-relaxed">
              {current.example[language] || current.example.en}
            </p>
          </div>

          {/* Extracted Math Calculation */}
          <div className="grid grid-cols-3 gap-2 bg-white/10 p-3 rounded-2xl border border-white/10 text-center">
            <div>
              <span className="text-[10px] opacity-80 block uppercase">Income</span>
              <span className="text-xs md:text-sm font-extrabold">{current.calc.income}</span>
            </div>
            <div>
              <span className="text-[10px] opacity-80 block uppercase">Expenses</span>
              <span className="text-xs md:text-sm font-extrabold">{current.calc.expenses}</span>
            </div>
            <div>
              <span className="text-[10px] opacity-80 block uppercase">Net Profit</span>
              <span className="text-xs md:text-sm font-extrabold">{current.calc.profit}</span>
            </div>
          </div>
        </div>

        {/* Stepper Dots & Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  activeStep === idx ? 'w-8 bg-accent-500' : 'w-2.5 bg-gray-200 hover:bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {activeStep > 0 && (
              <button
                onClick={() => setActiveStep(activeStep - 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 transition cursor-pointer"
              >
                Back
              </button>
            )}

            {activeStep < 3 ? (
              <button
                onClick={() => setActiveStep(activeStep + 1)}
                className="bg-brand-900 hover:bg-brand-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>Next Step</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleLaunchDemo}
                className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md"
              >
                <span>Explore Meena Tai's Live Demo</span>
                <Play size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
