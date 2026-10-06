import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ShieldCheck, Download, CheckCircle, AlertCircle, TrendingUp, Share2, Printer, FileText, Building2, Calendar, Award, CheckCircle2, Volume2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { CreditJourneyStepper } from '../components/CreditJourneyStepper';

export default function Readiness() {
  const { loc, user, businessContext, transactions, financialSummary, language, speakText } = useAppContext();
  const [copiedToast, setCopiedToast] = useState(false);

  const {
    totalIncome,
    totalExpenses,
    netProfit,
    profitMarginPercent,
    activeDaysCount,
    transactionCount,
    monthlyBreakdown,
    recordConsistencyDays
  } = financialSummary;

  // 3-Month averages
  const monthCount = Math.max(1, monthlyBreakdown.length || 3);
  const avgMonthlyIncome = Math.round(totalIncome / monthCount);
  const avgMonthlyExpenses = Math.round(totalExpenses / monthCount);
  const avgMonthlyProfit = Math.round(netProfit / monthCount);

  // Consistency score calculation (0 to 100)
  const consistencyScore = Math.min(95, Math.max(40, Math.round((activeDaysCount / 40) * 80) + 15));

  // Generate downloadable PDF using jsPDF
  const generatePdf = () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Header Banner
      doc.setFillColor(15, 23, 42); // slate-900 / brand-900
      doc.rect(0, 0, 210, 36, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text("Khata se Credit Tak", 14, 16);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(244, 63, 94); // accent-500
      doc.text("BANK-READY BUSINESS FINANCIAL STATEMENT", 14, 23);

      doc.setFontSize(8);
      doc.setTextColor(203, 213, 225);
      doc.text("Structured Operational Track Record for Women Micro-Entrepreneurs", 14, 29);

      const generatedDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      doc.text(`Generated: ${generatedDate}`, 155, 29);

      // Section 1: Business Profile Box
      doc.setDrawColor(226, 232, 240);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, 42, 182, 32, 3, 3, 'FD');

      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text("1. Business & Entrepreneur Profile", 18, 50);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text(`Proprietor: ${user?.name || "Meena Tai"}`, 18, 57);
      doc.text(`Business Name: ${user?.business_name || "Home Enterprise"}`, 18, 63);
      doc.text(`Activity Type: ${user?.business_type || "Micro-Enterprise"}`, 18, 69);

      doc.text(`Reporting Period: Past 90 Days`, 110, 57);
      doc.text(`Total Recorded Entries: ${transactionCount} transactions`, 110, 63);
      doc.text(`Active Days Documented: ${activeDaysCount} business days`, 110, 69);

      // Section 2: 3-Month Financial Summary
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("2. 3-Month Financial Performance Summary", 14, 82);

      // 3 Stat Boxes
      // Box 1: Total Income
      doc.setFillColor(240, 253, 244); // green-50
      doc.setDrawColor(187, 247, 208);
      doc.roundedRect(14, 86, 56, 24, 2, 2, 'FD');
      doc.setFontSize(8);
      doc.setTextColor(22, 101, 52);
      doc.text("TOTAL RECORDED INCOME", 18, 93);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`INR ${totalIncome.toLocaleString('en-IN')}`, 18, 103);

      // Box 2: Total Expenses
      doc.setFillColor(255, 241, 242); // rose-50
      doc.setDrawColor(254, 205, 211);
      doc.roundedRect(77, 86, 56, 24, 2, 2, 'FD');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(159, 18, 57);
      doc.text("TOTAL RECORDED EXPENSES", 81, 93);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`INR ${totalExpenses.toLocaleString('en-IN')}`, 81, 103);

      // Box 3: Net Profit
      doc.setFillColor(241, 245, 249); // slate-100
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(140, 86, 56, 24, 2, 2, 'FD');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(`NET OPERATIONAL PROFIT (${profitMarginPercent}%)`, 144, 93);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`INR ${netProfit.toLocaleString('en-IN')}`, 144, 103);

      // Section 3: Monthly Breakdown Table
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("3. Monthly Operations Breakdown", 14, 120);

      // Table Header
      doc.setFillColor(226, 232, 240);
      doc.rect(14, 124, 182, 8, 'F');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      doc.text("MONTH", 20, 129);
      doc.text("GROSS INCOME (INR)", 70, 129);
      doc.text("RECORDED EXPENSES (INR)", 115, 129);
      doc.text("NET PROFIT (INR)", 160, 129);

      let tableY = 138;
      const displayMonths = monthlyBreakdown.length > 0 ? monthlyBreakdown : [
        { month: "Month 1", income: avgMonthlyIncome, expenses: avgMonthlyExpenses, profit: avgMonthlyProfit },
        { month: "Month 2", income: avgMonthlyIncome, expenses: avgMonthlyExpenses, profit: avgMonthlyProfit },
        { month: "Month 3", income: avgMonthlyIncome, expenses: avgMonthlyExpenses, profit: avgMonthlyProfit }
      ];

      displayMonths.forEach((m, idx) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.text(m.month, 20, tableY);
        doc.text(m.income.toLocaleString('en-IN'), 70, tableY);
        doc.text(m.expenses.toLocaleString('en-IN'), 115, tableY);
        doc.setFont('helvetica', 'bold');
        doc.text(m.profit.toLocaleString('en-IN'), 160, tableY);

        doc.setDrawColor(241, 245, 249);
        doc.line(14, tableY + 3, 196, tableY + 3);
        tableY += 9;
      });

      // Section 4: Averages & Reliability
      doc.setFillColor(254, 243, 199); // amber-100
      doc.setDrawColor(251, 191, 36);
      doc.roundedRect(14, tableY + 4, 182, 28, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(120, 53, 15);
      doc.text("4. Monthly Averages & Consistency Assessment", 18, tableY + 11);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text(`* Average Monthly Income: INR ${avgMonthlyIncome.toLocaleString('en-IN')}`, 18, tableY + 18);
      doc.text(`* Average Monthly Expenses: INR ${avgMonthlyExpenses.toLocaleString('en-IN')}`, 18, tableY + 24);
      doc.text(`* Average Monthly Net Profit: INR ${avgMonthlyProfit.toLocaleString('en-IN')} (Margin: ${profitMarginPercent}%)`, 105, tableY + 18);
      doc.text(`* Record Consistency: ${activeDaysCount} active business days recorded`, 105, tableY + 24);

      // Section 5: Legal Declaration & Transparency Notice
      const declY = tableY + 40;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text("5. Entrepreneur Declaration & Verification", 14, declY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text(
        "I hereby declare that the financial figures, income records, and expense entries presented in this statement reflect",
        14,
        declY + 5
      );
      doc.text(
        "my genuine operational business activity maintained via daily voice bookkeeping on the Khata se Credit Tak platform.",
        14,
        declY + 9
      );

      // Signature placeholders
      doc.line(14, declY + 28, 80, declY + 28);
      doc.text("Entrepreneur Signature / Thumbprint", 14, declY + 32);

      doc.line(130, declY + 28, 196, declY + 28);
      doc.text("Bank / SHG / Facilitator Stamp", 130, declY + 32);

      // Disclaimer Footer (Mandatory Requirement)
      doc.setFillColor(241, 245, 249);
      doc.rect(0, 276, 210, 21, 'F');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(
        "IMPORTANT NOTICE: This document is an organized operational record summary created to assist micro-entrepreneurs in presenting",
        14,
        282
      );
      doc.text(
        "structured accounts. It is NOT a credit score, does NOT guarantee loan approval or credit sanctions. Loan sanctioning decisions",
        14,
        286
      );
      doc.text(
        "remain at the sole discretion of the lending financial institutions under official government scheme norms (e.g., PM MUDRA, PMEGP).",
        14,
        290
      );

      doc.save(`Khata_Statement_${user?.name?.replace(/\s+/g, '_') || 'Entrepreneur'}.pdf`);
    } catch (e) {
      console.error("PDF generation failed:", e);
      window.print();
    }
  };

  // Copy statement text to clipboard
  const copySummaryText = () => {
    const text = `
========================================
KHATA SE CREDIT TAK - BANK-READY STATEMENT
========================================
Entrepreneur: ${user?.name || "Meena Tai"}
Business: ${user?.business_name || "Tiffin Service"} (${user?.business_type || "Food"})
Reporting Period: Past 90 Days

FINANCIAL METRICS:
- Total Recorded Income: ₹${totalIncome.toLocaleString('en-IN')}
- Total Recorded Expenses: ₹${totalExpenses.toLocaleString('en-IN')}
- Net Profit: ₹${netProfit.toLocaleString('en-IN')} (${profitMarginPercent}% margin)

MONTHLY AVERAGES:
- Avg. Monthly Income: ₹${avgMonthlyIncome.toLocaleString('en-IN')}
- Avg. Monthly Expenses: ₹${avgMonthlyExpenses.toLocaleString('en-IN')}
- Avg. Monthly Profit: ₹${avgMonthlyProfit.toLocaleString('en-IN')}
- Active Recorded Days: ${activeDaysCount} days
- Total Entries: ${transactionCount} records

DISCLAIMER: This is an organized business record summary to facilitate bank and scheme handoff. It is NOT a credit score and does not guarantee loan approval.
========================================
`;
    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  const speakStatementSummary = () => {
    let text = "";
    if (language === 'mr') {
      text = `३ महिन्यांचा अधिकृत आर्थिक सारांश: सरासरी मासिक उत्पन्न ₹${avgMonthlyIncome}, सरासरी मासिक खर्च ₹${avgMonthlyExpenses}, आणि सरासरी नफा ₹${avgMonthlyProfit}. एकूण नोंदी ${transactionCount}.`;
    } else if (language === 'hi') {
      text = `3 माह का वित्तीय सारांश: औसत मासिक आय ₹${avgMonthlyIncome}, औसत मासिक खर्च ₹${avgMonthlyExpenses}, और औसत शुद्ध लाभ ₹${avgMonthlyProfit} है। कुल ${transactionCount} प्रविष्टियां।`;
    } else {
      text = `3-month financial summary: average monthly income is ₹${avgMonthlyIncome}, average expenses are ₹${avgMonthlyExpenses}, and average net profit is ₹${avgMonthlyProfit}. Total ${transactionCount} transactions documented.`;
    }
    speakText(text, language);
  };

  const shareOnWhatsapp = () => {
    const text = `*Khata se Credit Tak - 3-Month Bank-Ready Statement*\n` +
      `Proprietor: ${user?.name || "Entrepreneur"}\n` +
      `Business: ${user?.business_name || "Enterprise"} (${user?.business_type || "Micro-Enterprise"})\n` +
      `Total Recorded Income: ₹${totalIncome.toLocaleString('en-IN')}\n` +
      `Total Recorded Expenses: ₹${totalExpenses.toLocaleString('en-IN')}\n` +
      `Net Operational Profit: ₹${netProfit.toLocaleString('en-IN')} (${profitMarginPercent}% margin)\n` +
      `Avg Monthly Income: ₹${avgMonthlyIncome.toLocaleString('en-IN')}\n` +
      `Avg Monthly Net Profit: ₹${avgMonthlyProfit.toLocaleString('en-IN')}\n` +
      `Active Documented Days: ${activeDaysCount} days\n\n` +
      `*Important Notice:* This is an organized operational financial statement for approaching banks, MUDRA/PMEGP schemes, or SHG support. It is NOT a credit score.`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-900 tracking-tight">{loc.readinessTitle}</h1>
          <p className="text-gray-500 text-sm mt-1">{loc.readinessSubtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={speakStatementSummary}
            className="bg-rose-50 hover:bg-rose-100 border border-rose-200 text-accent-700 px-3 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            title="Listen to Statement Summary"
          >
            <Volume2 size={15} />
            <span>{language === 'mr' ? 'ऐका' : language === 'hi' ? 'सुनें' : 'Listen'}</span>
          </button>
          <button
            onClick={shareOnWhatsapp}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
          >
            <Share2 size={15} /> WhatsApp
          </button>
          <button
            onClick={copySummaryText}
            className="bg-white hover:bg-gray-50 border border-gray-200 text-brand-900 px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
          >
            <Share2 size={15} /> {loc.shareSummaryBtn}
          </button>
          <button 
            onClick={generatePdf}
            className="bg-brand-900 hover:bg-brand-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-md cursor-pointer"
          >
            <Download size={16} /> {loc.downloadPdfBtn}
          </button>
        </div>
      </div>

      {copiedToast && (
        <div className="bg-green-100 border border-green-300 text-green-900 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle size={16} className="text-green-600" />
          <span>{loc.statementCopiedNotice}</span>
        </div>
      )}

      {/* RECORD STRENGTH & 3-MONTH AVERAGES OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Record Strength Badge */}
        <div className="bg-gradient-to-br from-brand-900 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-accent-400 uppercase tracking-wider">
                {loc.readinessScoreLabel}
              </span>
              <Award size={22} className="text-accent-400" />
            </div>

            <div className="flex items-baseline gap-1 my-2">
              <span className="text-5xl font-black">{consistencyScore}</span>
              <span className="text-xl text-gray-400 font-bold">/100</span>
            </div>

            <p className="text-xs text-gray-300 font-medium leading-relaxed mt-2">
              {loc.readinessExplanation}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
            <span className="text-gray-400">{loc.activeDaysCount}:</span>
            <span className="font-bold text-white">{activeDaysCount} days</span>
          </div>
        </div>

        {/* 3-Month Averages Breakdown */}
        <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-extrabold text-base text-brand-900">
                {loc.threeMonthAverage} ({loc.reportingPeriodLabel})
              </h3>
              <span className="text-xs font-bold text-accent-600 bg-accent-50 px-2.5 py-1 rounded-lg">
                {profitMarginPercent}% Net Margin
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50/60 border border-green-200/80 rounded-2xl p-4">
                <span className="text-xs font-bold text-green-800 uppercase block mb-1">
                  {loc.avgMonthlyIncome}
                </span>
                <span className="text-2xl font-black text-green-700">
                  ₹{avgMonthlyIncome.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-4">
                <span className="text-xs font-bold text-rose-800 uppercase block mb-1">
                  {loc.avgMonthlyExpense}
                </span>
                <span className="text-2xl font-black text-rose-600">
                  ₹{avgMonthlyExpenses.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="bg-brand-50/60 border border-brand-200/80 rounded-2xl p-4">
                <span className="text-xs font-bold text-brand-900 uppercase block mb-1">
                  {loc.avgMonthlyProfit}
                </span>
                <span className="text-2xl font-black text-brand-900">
                  ₹{avgMonthlyProfit.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
            <span>Calculated from {transactionCount} confirmed transactions across {activeDaysCount} business days.</span>
          </div>
        </div>
      </div>

      {/* CREDIT-READINESS PROGRESS ROADMAP */}
      <CreditJourneyStepper />

      {/* BANK-READY STATEMENT PREVIEW CARD */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 mb-6 border-b border-gray-100 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-brand-900 text-white rounded-2xl flex items-center justify-center font-black text-xl">
              <Building2 size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-brand-900">{loc.bankStatementTitle}</h3>
                <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  VERIFIED FORMAT
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{loc.bankStatementSubtitle}</p>
            </div>
          </div>

          <button
            onClick={generatePdf}
            className="flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-sm cursor-pointer"
          >
            <Download size={15} /> {loc.downloadPdfBtn}
          </button>
        </div>

        {/* Statement Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-surface-50 border border-gray-200 mb-6 text-xs">
          <div>
            <span className="text-gray-400 font-semibold block">{loc.proprietorLabel}:</span>
            <span className="font-bold text-brand-900 text-sm mt-0.5 block">{user?.name || "Meena Tai"}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block">{loc.businessNameLabel}:</span>
            <span className="font-bold text-brand-900 text-sm mt-0.5 block">{user?.business_name || "Tiffin Business"}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block">{loc.businessTypeLabel}:</span>
            <span className="font-bold text-brand-900 text-sm mt-0.5 block">{user?.business_type || "Food / Tiffin"}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block">{loc.reportingPeriodLabel}:</span>
            <span className="font-bold text-brand-900 text-sm mt-0.5 block">Past 90 Days</span>
          </div>
        </div>

        {/* Monthly Operations Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 uppercase font-bold tracking-wider">
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Gross Income</th>
                <th className="py-3 px-4">Recorded Expenses</th>
                <th className="py-3 px-4 text-right">Net Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold">
              {(monthlyBreakdown.length > 0 ? monthlyBreakdown : [
                { month: "August 2026", income: avgMonthlyIncome, expenses: avgMonthlyExpenses, profit: avgMonthlyProfit },
                { month: "September 2026", income: avgMonthlyIncome, expenses: avgMonthlyExpenses, profit: avgMonthlyProfit },
                { month: "October 2026", income: avgMonthlyIncome, expenses: avgMonthlyExpenses, profit: avgMonthlyProfit }
              ]).map((m, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-brand-900">{m.month}</td>
                  <td className="py-3 px-4 text-green-700">₹{m.income.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-rose-600">-₹{m.expenses.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-right font-bold text-brand-900">₹{m.profit.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 font-extrabold text-sm text-brand-900 bg-gray-50/50">
                <td className="py-3 px-4">Total 90-Day Summary</td>
                <td className="py-3 px-4 text-green-700">₹{totalIncome.toLocaleString('en-IN')}</td>
                <td className="py-3 px-4 text-rose-600">-₹{totalExpenses.toLocaleString('en-IN')}</td>
                <td className="py-3 px-4 text-right text-brand-900">₹{netProfit.toLocaleString('en-IN')}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Declaration Statement */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-gray-600 leading-relaxed italic">
          "{loc.statementDeclaration}" — <strong>{user?.name || "Entrepreneur"}</strong>
        </div>
      </div>

      {/* MANDATORY TRANSPARENT DISCLAIMER BANNER */}
      <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex items-start text-amber-900 text-xs leading-relaxed font-medium">
        <AlertCircle size={20} className="mr-3 shrink-0 text-amber-600 mt-0.5" />
        <div>
          <p className="font-bold mb-1">Important Transparency & Regulatory Disclaimer:</p>
          <p>{loc.notCreditScoreNotice} {loc.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
