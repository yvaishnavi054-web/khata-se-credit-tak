import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Mic, BookOpen, TrendingUp, Calendar, FileText, 
  Award, CheckSquare, Users, ChevronRight, CheckCircle2, 
  X, ArrowRight, Sparkles, HelpCircle, ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export interface JourneyStep {
  id: number;
  icon: any;
  title: { en: string; hi: string; mr: string };
  desc: { en: string; hi: string; mr: string };
  details: { en: string; hi: string; mr: string };
  actionLabel: { en: string; hi: string; mr: string };
  route: string;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    icon: Mic,
    title: {
      en: "1. Start Recording (Voice)",
      hi: "1. आवाज से शुरुआत करें",
      mr: "१. बोलून नोंद सुरू करा"
    },
    desc: {
      en: "Tap 'Bolo' to record daily sales & expenses naturally.",
      hi: "रोज की बिक्री और खर्च बिना टाइप किए बोलकर दर्ज करें।",
      mr: "कागदावर लिहिण्याऐवजी रोजचा हिशोब तोंडी बोला."
    },
    details: {
      en: "Speak what you sold and what you spent today in Marathi, Hindi, or English. The system calculates your daily sales, expenses, and net profit without any typing.",
      hi: "आज आपने क्या बेचा और क्या खर्च किया, यह मराठी, हिंदी या अंग्रेजी में बोलें। प्रणाली बिना टाइपिंग के आपकी कुल बिक्री, खर्च और शुद्ध मुनाफे की गणना करती है।",
      mr: "आज काय विकले आणि काय खर्च झाला ते मराठी, हिंदी किंवा इंग्रजीत बोला. टाईप न करता प्रणाली तुमच्या दैनंदिन विक्री, खर्च व निव्वळ नफ्याची अचूक गणना करते."
    },
    actionLabel: {
      en: "Open Voice Khata →",
      hi: "आवाज खाता खोलें →",
      mr: "आवाज खाता उघडा →"
    },
    route: "/app/voice"
  },
  {
    id: 2,
    icon: BookOpen,
    title: {
      en: "2. Build Digital Ledger",
      hi: "2. डिजिटल बहीखाता निर्माण",
      mr: "२. डिजिटल बहीखाता तयार करा"
    },
    desc: {
      en: "Organize fragmented receipts into structured digital entries.",
      hi: "कच्चे पर्चियों को सुरक्षित डिजिटल बहीखाते में बदलें।",
      mr: "सुट्या पावत्या आणि हिशोबाची सुटसुटीत डिजिटल नोंद ठेवा."
    },
    details: {
      en: "Your spoken entries are automatically categorized into meals, groceries, materials, and utilities. You can view, filter, edit, or delete any record at any time.",
      hi: "आपके बोले गए लेनदेन अपने आप श्रेणीबद्ध हो जाते हैं। आप किसी भी समय अपने सभी पुराने लेनदेनों को देख, सुधार या हटा सकते हैं।",
      mr: "तुमच्या बोललेल्या नोंदी आपोआप माल, किराणा, साहित्य आणि खर्चात वर्गीकृत होतात. तुम्ही कोणत्याही वेळी जुन्या नोंदी पाहू, बदलू किंवा हटवू शकता."
    },
    actionLabel: {
      en: "View Ledger Records →",
      hi: "बहीखाता देखें →",
      mr: "रोजकीर्द बहीखाता पहा →"
    },
    route: "/app/ledger"
  },
  {
    id: 3,
    icon: TrendingUp,
    title: {
      en: "3. Understand Net Profit",
      hi: "3. शुद्ध मुनाफा समझें",
      mr: "३. खरा निव्वळ नफा समजून घ्या"
    },
    desc: {
      en: "Income − Expenses = Actual Take-Home Net Profit.",
      hi: "आय में से खर्च घटाकर अपना वास्तविक शुद्ध मुनाफा जानें।",
      mr: "एकूण कमाईतून खर्च वजा करून खरा नफा जाणून घ्या."
    },
    details: {
      en: "Never confuse total turnover with cash in pocket. Learn your exact profit margin percentage and see which expense category takes most of your revenue.",
      hi: "कुल बिक्री को अपना मुनाफा न समझें। आय में से खर्च घटाकर अपनी सही मुनाफा दर (% मार्जिन) जानें ताकि बैंक में सही जानकारी दे सकें।",
      mr: "एकूण गल्ल्याला नफा समजू नका. कमाईतून खर्च वजा करून तुमचा प्रत्यक्ष नफा टक्का (% मार्जिन) समजून घ्या, जेणेकरून बँकेला योग्य माहिती देता येईल."
    },
    actionLabel: {
      en: "Check Profit & Margins →",
      hi: "मुनाफा व मार्जिन देखें →",
      mr: "नफा व मार्जिन पहा →"
    },
    route: "/app/insights"
  },
  {
    id: 4,
    icon: Calendar,
    title: {
      en: "4. Maintain Consistency",
      hi: "4. नियमित रिकॉर्ड्स रखें",
      mr: "४. सातत्यपूर्ण नोंदी ठेवा"
    },
    desc: {
      en: "Aim for 20+ active days monthly to demonstrate consistency.",
      hi: "व्यवसाय निरंतरता साबित करने हेतु महीने में 20+ दिन दर्ज करें।",
      mr: "सातत्य दाखवण्यासाठी महिन्यातून २०+ दिवस हिशोब ठेवा."
    },
    details: {
      en: "Banks look for business continuity and discipline. Maintaining daily records across 20+ days each month proves your enterprise is active and healthy.",
      hi: "बैंक व्यवसायी की निरंतरता और वित्तीय अनुशासन देखते हैं। महीने में 20+ दिन नियमित हिसाब रखने से साबित होता है कि आपका व्यवसाय लगातार चल रहा है।",
      mr: "बँका व्यवसायाचे सातत्य आणि आर्थिक शिस्त तपासतात. दरमहा २०+ दिवस नियमित हिशोब ठेवल्यास तुमचा व्यवसाय अखंडपणे चालू असल्याचे सिद्ध होते."
    },
    actionLabel: {
      en: "Check Daily Streak →",
      hi: "दैनिक रिकॉर्ड देखें →",
      mr: "दैनिक सातत्य तपासा →"
    },
    route: "/app/dashboard"
  },
  {
    id: 5,
    icon: FileText,
    title: {
      en: "5. Bank-Ready Statement",
      hi: "5. बैंक-रेडी स्टेटमेंट",
      mr: "५. बँक-रेडी आर्थिक स्टेटमेंट"
    },
    desc: {
      en: "Compile a 3-month formal operating cash flow statement.",
      hi: "बैंक या संस्था के लिए 3 माह का व्यवस्थित वित्तीय विवरण बनाएं।",
      mr: "बँकेसाठी ३ महिन्यांचे अधिकृत आर्थिक विवरण तयार करा."
    },
    details: {
      en: "Download a verified, organized 3-month business performance statement as a PDF. Ready to hand over to branch managers, loan officers, or SHG cluster coordinators.",
      hi: "अपने 3 महीने के कारोबार का औपचारिक वित्तीय स्टेटमेंट पीडीएफ में डाउनलोड करें। बैंक मैनेजर, लोन अधिकारी या स्वयं सहायता समूह को देने हेतु तैयार।",
      mr: "तुमच्या ३ महिन्यांच्या व्यवसायाचे अधिकृत आर्थिक स्टेटमेंट PDF स्वरूपात डाउनलोड करा. बँक मॅनेजर, कर्ज अधिकारी किंवा बचत गटाकडे सादर करण्यासाठी परिपूर्ण."
    },
    actionLabel: {
      en: "Download Bank Statement →",
      hi: "बैंक स्टेटमेंट डाउनलोड करें →",
      mr: "बँक स्टेटमेंट PDF उघडा →"
    },
    route: "/app/readiness"
  },
  {
    id: 6,
    icon: Award,
    title: {
      en: "6. Find Matched Scheme",
      hi: "6. उपयुक्त योजना खोजें",
      mr: "६. योग्य सरकारी योजना निवडा"
    },
    desc: {
      en: "Discover MUDRA, PMEGP, or Lakhpati Didi SHG options.",
      hi: "मुद्रा शिशु, पीएमईजीपी या लखपति दीदी योजना चुनें।",
      mr: "मुद्रा शिशु, पीएमईजीपी किंवा उमेद लखपती दीदी योजना निवडा."
    },
    details: {
      en: "Explore real verified schemes: PM MUDRA Shishu (up to ₹50,000 without collateral), PMEGP (35% capital subsidy for women), Lakhpati Didi (7% subsidized interest), and Stand-Up India.",
      hi: "वास्तविक सत्यापित योजनाएं देखें: पीएम मुद्रा शिशु (₹50,000 तक बिना गारंटी), पीएमईजीपी (35% महिला सब्सिडी), लखपति दीदी और स्टैंड-अप इंडिया।",
      mr: "सत्यापित सरकारी योजनांची माहिती घ्या: पीएम मुद्रा शिशु (₹५०,००० पर्यंत विनातारण कर्ज), पीएमईजीपी (३५% थेट अनुदान), लखपती दीदी आणि स्टँड-अप इंडिया."
    },
    actionLabel: {
      en: "Explore Govt Schemes →",
      hi: "सरकारी योजनाएं देखें →",
      mr: "सरकारी योजना एक्सप्लोर करा →"
    },
    route: "/app/schemes"
  },
  {
    id: 7,
    icon: CheckSquare,
    title: {
      en: "7. Prepare Documents",
      hi: "7. दस्तावेज़ तैयारी",
      mr: "७. आवश्यक कागदपत्रे तयार करा"
    },
    desc: {
      en: "Verify Aadhaar, PAN, Bank Passbook & Udyam Sakhi.",
      hi: "आधार, पैन, पासबुक और उद्यम आधार चेकलिस्ट पूर्ण करें।",
      mr: "आधार, पॅन, बँक पासबुक व उद्यम नोंदणी तपासा."
    },
    details: {
      en: "Use the interactive checklist to mark ready documents: Aadhaar linked with mobile, PAN, Bank Passbook, Workplace photo, and Free Udyam MSME Certificate.",
      hi: "इंटरैक्टिव चेकलिस्ट का उपयोग कर अपने तैयार दस्तावेज़ों पर टिक करें: मोबाइल लिंक आधार, पैन, बैंक पासबुक, कार्यस्थल फोटो और निःशुल्क उद्यम आधार प्रमाणपत्र।",
      mr: "कागदपत्र चेकलिस्ट वापरून तयार कागदपत्रांवर टिक करा: मोबाईल लिंक आधार, पॅन, बँक पासबुक, कामाच्या जागेचा फोटो आणि मोफत उद्यम नोंदणी प्रमाणपत्र."
    },
    actionLabel: {
      en: "Open Document Checklist →",
      hi: "दस्तावेज़ चेकलिस्ट खोलें →",
      mr: "कागदपत्रे चेकलिस्ट उघडा →"
    },
    route: "/app/schemes"
  },
  {
    id: 8,
    icon: Users,
    title: {
      en: "8. Bank & Scheme Handoff",
      hi: "8. बैंक एवं सहायता केंद्र संपर्क",
      mr: "८. बँक व अधिकृत केंद्राशी संपर्क"
    },
    desc: {
      en: "Present your signed PDF statement to branch manager or CLF.",
      hi: "हस्ताक्षरित पीडीएफ विवरण बैंक अधिकारी या समूह सखी को दिखाएं।",
      mr: "बँक व्यवस्थापक किंवा बचत गट प्रमुखाला छापील स्टेटमेंट दाखवा."
    },
    details: {
      en: "Walk into your nearest public sector bank (SBI, Bank of Maharashtra), Gramin Bank, or CSC E-Seva Kendra with your Khata se Credit Tak Bank-Ready Statement for confident loan processing.",
      hi: "अपने नज़दीकी राष्ट्रीयकृत बैंक (SBI, बैंक ऑफ महाराष्ट्र), ग्रामीण बैंक या सीएससी सेवा केंद्र पर अपने 3-माह के स्टेटमेंट के साथ जाएं और आत्मविश्वास से आवेदन करें।",
      mr: "नजीकच्या राष्ट्रीयीकृत बँकेत (SBI, बँक ऑफ महाराष्ट्र), ग्रामीण बँकेत किंवा आपले सरकार सेवा केंद्रात ३-महिन्यांच्या स्टेटमेंटसह जा आणि आत्मविश्वासाने अर्ज करा."
    },
    actionLabel: {
      en: "View Handoff Access Points →",
      hi: "बैंक संपर्क केंद्र देखें →",
      mr: "अधिकृत संपर्क केंद्र पहा →"
    },
    route: "/app/schemes"
  }
];

export const CreditJourneyStepper: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, financialSummary, isDemoMode } = useAppContext();
  const navigate = useNavigate();
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);

  const { transactionCount, activeDaysCount } = financialSummary;

  // Determine current active step index (0-indexed)
  let currentStepIdx = 0;
  if (isDemoMode) {
    currentStepIdx = 4; // Credit-ready statement ready
  } else if (transactionCount === 0) {
    currentStepIdx = 0; // Step 1
  } else if (transactionCount < 8) {
    currentStepIdx = 1; // Step 2
  } else if (transactionCount < 18) {
    currentStepIdx = 2; // Step 3
  } else if (activeDaysCount < 15) {
    currentStepIdx = 3; // Step 4
  } else {
    currentStepIdx = 4; // Step 5
  }

  const sectionHeading = {
    en: "Credit-Readiness Journey (Click any step to view details)",
    hi: "क्रेडिट-तैयारी प्रगति यात्रा (विवरण देखने हेतु किसी भी चरण पर क्लिक करें)",
    mr: "क्रेडिट-तयारी प्रगती प्रवास (तपशील पाहण्यासाठी कोणत्याही टप्प्यावर क्लिक करा)"
  }[language] || "Credit-Readiness Journey";

  const sectionSub = {
    en: "8-step roadmap from first spoken sale to formal bank loan & scheme approval.",
    hi: "पहली बोलकर की गई बिक्री से बैंक ऋण एवं सरकारी योजना स्वीकृति तक 8-चरणीय मार्ग।",
    mr: "पहिल्या तोंडी विक्रीपासून बँक कर्ज आणि सरकारी योजना मंजुरीपर्यंतचा ८ टप्प्यांचा मार्ग."
  }[language] || "From first spoken sale to formal bank & scheme handoff.";

  const statusLabels = {
    done: { en: "COMPLETED ✓", hi: "पूर्ण हुआ ✓", mr: "पूर्ण झाले ✓" }[language] || "DONE",
    now: { en: "CURRENT STEP", hi: "चालू चरण", mr: "चालू टप्पा" }[language] || "NOW",
    upcoming: { en: "UPCOMING", hi: "अगला चरण", mr: "पुढील टप्पा" }[language] || "UPCOMING",
    clickHint: { en: "Click to open details", hi: "विवरण खोलने के लिए क्लिक करें", mr: "तपशील पाहण्यासाठी क्लिक करा" }[language] || "Click to open"
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-xl text-brand-900 tracking-tight">
              {sectionHeading}
            </h3>
            <span className="text-[11px] font-extrabold bg-accent-50 text-accent-600 px-2.5 py-0.5 rounded-full border border-accent-100">
              Step {currentStepIdx + 1} of 8
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 font-medium">
            {sectionSub}
          </p>
        </div>

        <button
          onClick={() => navigate('/app/readiness')}
          className="self-start sm:self-auto text-xs font-bold text-accent-600 hover:text-accent-700 flex items-center gap-1 cursor-pointer bg-accent-50 px-3 py-1.5 rounded-xl border border-accent-200 transition"
        >
          <span>{language === 'mr' ? 'बँक स्टेटमेंट पहा' : language === 'hi' ? 'बैंक स्टेटमेंट देखें' : 'View Bank Statement'}</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Grid of 8 Steps (All Clickable with Instant Modal) */}
      <div className={`grid ${compact ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'} gap-3.5`}>
        {JOURNEY_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx < currentStepIdx;
          const isCurrent = idx === currentStepIdx;

          return (
            <div
              key={step.id}
              onClick={() => setSelectedStep(step)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between hover:shadow-md hover:scale-101 ${
                isCurrent
                  ? 'bg-gradient-to-br from-rose-50 to-pink-50/70 border-accent-400 shadow-sm ring-2 ring-accent-400/20'
                  : isCompleted
                  ? 'bg-surface-50 border-gray-200 hover:bg-gray-100/70'
                  : 'bg-white border-gray-150 opacity-80 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isCurrent
                        ? 'bg-accent-500 text-white shadow-xs'
                        : isCompleted
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                  </div>

                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isCurrent
                        ? 'bg-accent-500 text-white'
                        : isCompleted
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isCompleted ? statusLabels.done : isCurrent ? statusLabels.now : `STEP ${step.id}`}
                  </span>
                </div>

                <h4 className={`font-bold text-xs mb-1 ${isCurrent ? 'text-accent-950 font-extrabold' : 'text-brand-900'}`}>
                  {step.title[language] || step.title.en}
                </h4>

                <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
                  {step.desc[language] || step.desc.en}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-accent-600">
                <span>{statusLabels.clickHint}</span>
                <ChevronRight size={12} className="text-accent-500" />
              </div>
            </div>
          );
        })}
      </div>

      {/* STEP DETAILS MODAL (Opens on click for ANY step) */}
      <AnimatePresence>
        {selectedStep && (
          <div className="fixed inset-0 bg-brand-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-gray-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedStep(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Step Header */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-accent-500 text-white flex items-center justify-center shadow-md">
                  {React.createElement(selectedStep.icon, { size: 24 })}
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-accent-600 bg-accent-50 px-2.5 py-0.5 rounded-md border border-accent-100">
                    Step {selectedStep.id} of 8
                  </span>
                  <h3 className="text-lg font-black text-brand-900 mt-1">
                    {selectedStep.title[language] || selectedStep.title.en}
                  </h3>
                </div>
              </div>

              {/* In-depth Details */}
              <div className="bg-surface-50 p-4 rounded-2xl border border-gray-200 mb-6 space-y-3 text-xs leading-relaxed text-gray-700">
                <p className="font-semibold text-brand-900 text-sm">
                  {selectedStep.desc[language] || selectedStep.desc.en}
                </p>
                <p className="text-gray-600">
                  {selectedStep.details[language] || selectedStep.details.en}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => setSelectedStep(null)}
                  className="py-3 px-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold transition cursor-pointer order-2 sm:order-1"
                >
                  {language === 'mr' ? 'बंद करा' : language === 'hi' ? 'बंद करें' : 'Close'}
                </button>

                <button
                  onClick={() => {
                    const targetRoute = selectedStep.route;
                    setSelectedStep(null);
                    navigate(targetRoute);
                  }}
                  className="flex-1 py-3 px-5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-xs font-extrabold transition shadow-md flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2"
                >
                  <span>{selectedStep.actionLabel[language] || selectedStep.actionLabel.en}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
