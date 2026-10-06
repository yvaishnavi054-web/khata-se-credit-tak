import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  FileText, CheckCircle, ExternalLink, Download, CheckSquare, 
  Square, Building2, HelpCircle, AlertCircle, ShieldCheck, 
  ArrowRight, Sparkles, Copy, Check, Globe
} from 'lucide-react';
import { schemes, standardDocumentsList, SchemeInfo } from '../lib/businessData';

export default function Schemes() {
  const { loc, user, businessContext, language } = useAppContext();
  const [activeTab, setActiveTab] = useState<'schemes' | 'docs' | 'handoff'>('schemes');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  
  // Interactive Document Checklist State
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('khata_checked_docs');
      return saved ? JSON.parse(saved) : { aadhaar: true, pan: true, passbook: true };
    } catch {
      return { aadhaar: true, pan: true, passbook: true };
    }
  });

  const toggleDoc = (id: string) => {
    const updated = { ...checkedDocs, [id]: !checkedDocs[id] };
    setCheckedDocs(updated);
    localStorage.setItem('khata_checked_docs', JSON.stringify(updated));
  };

  const totalDocsCount = standardDocumentsList.length;
  const readyDocsCount = Object.values(checkedDocs).filter(Boolean).length;

  // Localized string helper
  const getLoc = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[language] || val['en'] || '';
  };

  const getLocList = (val: any): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return val[language] || val['en'] || [];
  };

  // Open portal in new window
  const openPortal = (url: string) => {
    try {
      const win = window.open(url, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = url;
      }
    } catch {
      window.location.href = url;
    }
  };

  const copyPortalUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // UI labels in selected language
  const labels = {
    financialAssistance: {
      en: "Financial Assistance",
      hi: "वित्तीय सहायता (ऋण राशि)",
      mr: "आर्थिक साहाय्य (कर्ज मर्यादा)"
    }[language] || "Financial Assistance",

    subsidyAndTerms: {
      en: "Subsidy & Key Terms",
      hi: "सरकारी सब्सिडी एवं मुख्य शर्तें",
      mr: "सरकारी अनुदान व मुख्य अटी"
    }[language] || "Subsidy & Key Terms",

    purpose: {
      en: "🎯 Purpose:",
      hi: "🎯 मुख्य उद्देश्य:",
      mr: "🎯 मुख्य उद्देश:"
    }[language] || "🎯 Purpose:",

    intendedFor: {
      en: "👩 Intended For:",
      hi: "👩 लक्षित लाभार्थी:",
      mr: "👩 कोणासाठी उपयुक्त:"
    }[language] || "👩 Intended For:",

    verifiedPortal: {
      en: "Verified Government Portal · Official Source",
      hi: "सत्यापित आधिकारिक सरकारी पोर्टल · सरकारी स्रोत",
      mr: "सत्यापित अधिकृत सरकारी पोर्टल · शासकीय स्रोत"
    }[language] || "Verified Government Portal · Official Source",

    copyLink: {
      en: "Copy Portal Link",
      hi: "पोर्टल लिंक कॉपी करें",
      mr: "पोर्टल लिंक कॉपी करा"
    }[language] || "Copy Portal Link",

    copied: {
      en: "Copied!",
      hi: "कॉपी हो गया!",
      mr: "कॉपी झाले!"
    }[language] || "Copied!",

    docsReady: {
      en: "Documents Ready",
      hi: "दस्तावेज़ तैयार",
      mr: "कागदपत्रे तयार"
    }[language] || "Documents Ready",

    mandatory: {
      en: "Mandatory",
      hi: "अनिवार्य",
      mr: "आवश्यक"
    }[language] || "Mandatory",

    ready: {
      en: "Ready ✓",
      hi: "तैयार ✓",
      mr: "तयार ✓"
    }[language] || "Ready ✓",

    pending: {
      en: "Pending",
      hi: "लंबित",
      mr: "बाकी"
    }[language] || "Pending",

    needStatementTitle: {
      en: "Need your Bank-Ready Financial Statement?",
      hi: "क्या बैंक हेतु 3-माह का वित्तीय विवरण चाहिए?",
      mr: "बँकेसाठी तुमचे ३-महिन्यांचे आर्थिक स्टेटमेंट हवे आहे का?"
    }[language] || "Need your Bank-Ready Financial Statement?",

    needStatementDesc: {
      en: "Generate your verified 3-month PDF summary from the Credit Readiness tab.",
      hi: "क्रेडिट रेडीनेस टैब से अपना 3-माह का सत्यापित PDF विवरण बनाएं।",
      mr: "क्रेडिट रेडीनेस टॅबवरून तुमचा सत्यापित ३-महिन्यांचा PDF अहवाल तयार करा."
    }[language] || "Generate your verified 3-month PDF summary from the Credit Readiness tab.",

    goToStatement: {
      en: "Go to Readiness Statement →",
      hi: "बैंक स्टेटमेंट पर जाएं →",
      mr: "बँक स्टेटमेंटकडे जा →"
    }[language] || "Go to Readiness Statement →",

    targetMudra: {
      en: "Target: PM MUDRA Shishu Loan",
      hi: "लक्ष्य: पीएम मुद्रा शिशु ऋण (₹50,000 तक)",
      mr: "लक्ष्य: पीएम मुद्रा शिशु कर्ज (₹५०,००० पर्यंत)"
    }[language] || "Target: PM MUDRA Shishu Loan",

    targetLakhpati: {
      en: "Target: Lakhpati Didi / SHG Credit",
      hi: "लक्ष्य: लखपति दीदी / स्वयं सहायता समूह ऋण",
      mr: "लक्ष्य: लखपती दीदी / महिला बचत गट कर्ज"
    }[language] || "Target: Lakhpati Didi / SHG Credit",

    targetUdyam: {
      en: "Target: Free Udyam MSME Certificate",
      hi: "लक्ष्य: निःशुल्क उद्यम एमएसएमई प्रमाणपत्र",
      mr: "लक्ष्य: मोफत उद्यम एमएसएमई नोंदणी प्रमाणपत्र"
    }[language] || "Target: Free Udyam MSME Certificate"
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-extrabold text-brand-900 tracking-tight">{loc.schemesTitle}</h1>
        <p className="text-gray-500 text-sm mt-1">{loc.schemesSubtitle}</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-2xl shadow-xs border border-gray-200 p-1 overflow-x-auto">
        <TabButton active={activeTab === 'schemes'} onClick={() => setActiveTab('schemes')}>
          🏛️ {loc.tabPotentialSchemes}
        </TabButton>
        <TabButton active={activeTab === 'docs'} onClick={() => setActiveTab('docs')}>
          📋 {loc.tabDocumentChecklist} ({readyDocsCount}/{totalDocsCount})
        </TabButton>
        <TabButton active={activeTab === 'handoff'} onClick={() => setActiveTab('handoff')}>
          🤝 {loc.tabHandoffNextSteps}
        </TabButton>
      </div>

      {/* TAB 1: REAL GOVERNMENT SCHEMES */}
      {activeTab === 'schemes' && (
        <div className="space-y-6">
          {/* Transparency Disclaimer Notice */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-amber-900 text-xs">
            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-0.5">{loc.schemeDisclaimer}</p>
              <p>{loc.disclaimer}</p>
            </div>
          </div>

          {/* Scheme Cards */}
          <div className="space-y-6">
            {schemes.map((scheme: SchemeInfo) => {
              const schemeName = getLoc(scheme.name);
              const schemeMinistry = getLoc(scheme.ministry);
              const schemeBadge = getLoc(scheme.badge);
              const schemeDate = getLoc(scheme.verifiedDate);
              const schemeLoan = getLoc(scheme.loanAmount);
              const schemeSubsidy = getLoc(scheme.subsidy);
              const schemePurpose = getLoc(scheme.purpose);
              const schemeIntended = getLoc(scheme.intendedFor);
              const eligibilityList = getLocList(scheme.eligibility);
              const documentsList = getLocList(scheme.documents);
              const stepsList = getLocList(scheme.applicationProcess);

              return (
                <div 
                  key={scheme.id} 
                  className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 relative overflow-hidden transition hover:shadow-md"
                >
                  {/* Header Badge */}
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                    <span className="text-[11px] font-extrabold bg-accent-50 text-accent-700 border border-accent-200 px-3 py-1 rounded-full uppercase tracking-wider">
                      {schemeBadge}
                    </span>
                    <span className="text-[11px] text-gray-400 font-semibold">
                      {loc.schemeVerifiedDate}: <strong>{schemeDate}</strong>
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-brand-900 mb-1">
                    {schemeName}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 mb-4">{schemeMinistry}</p>

                  {/* Key Benefits Highlight Banner */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 bg-surface-50 p-4 rounded-2xl border border-gray-200/80">
                    <div>
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
                        {labels.financialAssistance}
                      </span>
                      <span className="text-lg font-black text-green-700">{schemeLoan}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
                        {labels.subsidyAndTerms}
                      </span>
                      <span className="text-sm font-bold text-brand-900">{schemeSubsidy}</span>
                    </div>
                  </div>

                  {/* Purpose & Intended For */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-xs text-gray-700">
                    <div className="bg-gray-50/70 p-3.5 rounded-xl border border-gray-100">
                      <strong className="block text-brand-900 mb-1">{labels.purpose}</strong>
                      <span>{schemePurpose}</span>
                    </div>
                    <div className="bg-gray-50/70 p-3.5 rounded-xl border border-gray-100">
                      <strong className="block text-brand-900 mb-1">{labels.intendedFor}</strong>
                      <span>{schemeIntended}</span>
                    </div>
                  </div>

                  {/* Eligibility & Documents */}
                  <div className="border-t border-gray-100 pt-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs mb-6">
                    <div>
                      <h4 className="font-extrabold text-brand-900 mb-2 text-xs uppercase tracking-wider">
                        ✓ {loc.eligibleCriteria}:
                      </h4>
                      <ul className="space-y-1.5 text-gray-600">
                        {eligibilityList.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-500 shrink-0 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-brand-900 mb-2 text-xs uppercase tracking-wider">
                        📄 {loc.documentsRequired}:
                      </h4>
                      <ul className="space-y-1.5 text-gray-600">
                        {documentsList.slice(0, 4).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-accent-500 shrink-0 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Application Steps */}
                  <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl mb-6 text-xs text-blue-950">
                    <strong className="block font-bold mb-2">🚀 {loc.applicationProcess}:</strong>
                    <div className="space-y-1.5 text-blue-900">
                      {stepsList.map((step, idx) => (
                        <p key={idx} className="leading-relaxed">{step}</p>
                      ))}
                    </div>
                  </div>

                  {/* Action Button: View Official Portal (Rock-Solid Multi-Trigger) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Direct Clickable Button that guarantees opening */}
                      <a
                        href={scheme.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          openPortal(scheme.officialUrl);
                        }}
                        className="inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-extrabold px-6 py-3 rounded-xl text-xs transition shadow-md hover:scale-102 cursor-pointer"
                      >
                        <Globe size={15} className="text-accent-400" />
                        <span>{loc.viewOfficialWebsite || "अधिकृत पोर्टल उघडा"}</span>
                        <ExternalLink size={14} />
                      </a>

                      {/* 1-Click Copy Link Button */}
                      <button
                        onClick={() => copyPortalUrl(scheme.officialUrl)}
                        className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3.5 py-3 rounded-xl text-xs font-bold transition cursor-pointer"
                        title={labels.copyLink}
                      >
                        {copiedUrl === scheme.officialUrl ? (
                          <>
                            <Check size={14} className="text-green-600" />
                            <span className="text-green-700 font-extrabold">{labels.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>{labels.copyLink}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                      <span>{labels.verifiedPortal}</span>
                      <span className="text-gray-300 font-mono text-[10px]">({scheme.officialUrl.replace('https://', '').replace(/\/$/, '')})</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE DOCUMENT CHECKLIST */}
      {activeTab === 'docs' && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 mb-6 border-b border-gray-100 gap-4">
            <div>
              <h3 className="font-extrabold text-xl text-brand-900">{loc.checklistTitle}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{loc.checklistSubtitle}</p>
            </div>
            <div className="bg-green-50 text-green-800 font-extrabold px-4 py-2 rounded-xl text-xs border border-green-200">
              {readyDocsCount} / {totalDocsCount} {labels.docsReady} ({Math.round((readyDocsCount / totalDocsCount) * 100)}%)
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {standardDocumentsList.map(doc => {
              const isChecked = !!checkedDocs[doc.id];
              const docLabel = getLoc(doc.label);

              return (
                <div
                  key={doc.id}
                  onClick={() => toggleDoc(doc.id)}
                  className={`p-4 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                    isChecked 
                      ? 'bg-green-50/40 border-green-200 text-gray-900' 
                      : 'bg-gray-50/50 border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button className="text-xl">
                      {isChecked ? (
                        <CheckSquare className="text-green-600" size={22} />
                      ) : (
                        <Square className="text-gray-300" size={22} />
                      )}
                    </button>
                    <div>
                      <p className={`text-sm font-semibold ${isChecked ? 'text-brand-900' : 'text-gray-700'}`}>
                        {docLabel}
                      </p>
                      {doc.mandatory && (
                        <span className="text-[10px] text-accent-600 font-bold uppercase">{labels.mandatory}</span>
                      )}
                    </div>
                  </div>

                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                    isChecked ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isChecked ? labels.ready : labels.pending}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="bg-surface-50 p-5 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-600">
              <strong className="text-brand-900 block mb-0.5">{labels.needStatementTitle}</strong>
              <span>{labels.needStatementDesc}</span>
            </div>
            <a
              href="/app/readiness"
              className="bg-brand-900 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs hover:bg-brand-800 transition shadow-sm whitespace-nowrap cursor-pointer"
            >
              {labels.goToStatement}
            </a>
          </div>
        </div>
      )}

      {/* TAB 3: WHERE TO APPLY & HANDOFF */}
      {activeTab === 'handoff' && (
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
            <h3 className="font-extrabold text-xl text-brand-900 mb-1">{loc.handoffTitle}</h3>
            <p className="text-xs text-gray-500 mb-6">{loc.handoffSubtitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Option 1: Nationalized / Gramin Banks */}
              <div className="p-6 rounded-2xl bg-surface-50 border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl mb-4">
                    🏦
                  </div>
                  <h4 className="font-extrabold text-base text-brand-900 mb-2">
                    {loc.handoffBankTitle}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {loc.handoffBankDesc}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200 text-xs font-bold text-blue-700">
                  {labels.targetMudra}
                </div>
              </div>

              {/* Option 2: SHG / NRLM Village Organization */}
              <div className="p-6 rounded-2xl bg-surface-50 border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-2xl mb-4">
                    🤝
                  </div>
                  <h4 className="font-extrabold text-base text-brand-900 mb-2">
                    {loc.handoffShgTitle}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {loc.handoffShgDesc}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200 text-xs font-bold text-rose-700">
                  {labels.targetLakhpati}
                </div>
              </div>

              {/* Option 3: Common Service Centres (CSC) */}
              <div className="p-6 rounded-2xl bg-surface-50 border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-2xl mb-4">
                    🏛️
                  </div>
                  <h4 className="font-extrabold text-base text-brand-900 mb-2">
                    {loc.handoffCscTitle}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {loc.handoffCscDesc}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200 text-xs font-bold text-green-700">
                  {labels.targetUdyam}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const TabButton = ({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-3 px-4 text-xs md:text-sm font-extrabold rounded-xl transition whitespace-nowrap cursor-pointer ${
      active ? 'bg-brand-900 text-white shadow-sm' : 'text-gray-500 hover:text-brand-900'
    }`}
  >
    {children}
  </button>
);
