import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Users, Plus, Search, MessageSquare, CheckCircle, 
  Clock, IndianRupee, Phone, Calendar, ArrowUpRight, 
  CheckCircle2, X, AlertCircle, Share2, Filter, Trash2
} from 'lucide-react';

export interface UdhaarEntry {
  id: string;
  customerName: string;
  phone: string;
  totalUdhaar: number;
  amountRepaid: number;
  notes: string;
  date: string;
  history: Array<{
    type: 'credit' | 'payment';
    amount: number;
    date: string;
    note?: string;
  }>;
}

const SINGLE_SAMPLE_UDHAAR: UdhaarEntry = {
  id: 'sample_udhaar_1',
  customerName: 'अनिता पाटील (Anita Patil - नमुना / Sample)',
  phone: '9822012345',
  totalUdhaar: 500,
  amountRepaid: 200,
  notes: 'नमुना उधारी नोंद (Sample Credit Example)',
  date: '2026-10-01',
  history: [
    { type: 'credit', amount: 500, date: '2026-10-01', note: 'उधारी दिली (Credit Given)' },
    { type: 'payment', amount: 200, date: '2026-10-03', note: 'अंशतः जमा (Partial Repaid)' }
  ]
};

export default function UdhaarKhata() {
  const { loc, user, businessContext, language } = useAppContext();

  const storageKey = `khata_udhaar_${user?.email || user?.id || 'default'}`;

  const [entries, setEntries] = useState<UdhaarEntry[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const userOnly = parsed.filter((x: UdhaarEntry) => x.id !== 'u1' && x.id !== 'u2' && x.id !== 'u3');
          return userOnly.length > 0 ? userOnly : [SINGLE_SAMPLE_UDHAAR];
        }
      }
    } catch {}
    return [SINGLE_SAMPLE_UDHAAR];
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const userOnly = parsed.filter((x: UdhaarEntry) => x.id !== 'u1' && x.id !== 'u2' && x.id !== 'u3');
          if (userOnly.length > 0) {
            setEntries(userOnly);
          } else {
            setEntries([SINGLE_SAMPLE_UDHAAR]);
          }
          return;
        }
      }
      setEntries([SINGLE_SAMPLE_UDHAAR]);
    } catch {
      setEntries([SINGLE_SAMPLE_UDHAAR]);
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(entries));
  }, [entries, storageKey]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'pending' | 'cleared'>('pending');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<UdhaarEntry | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Form states for Add
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);

  // Form states for Payment
  const [payAmount, setPayAmount] = useState('');
  const [payNote, setPayNote] = useState('');

  // Calculations
  const totalPending = entries.reduce((acc, curr) => {
    const due = Math.max(0, curr.totalUdhaar - curr.amountRepaid);
    return acc + due;
  }, 0);

  const pendingCustomersCount = entries.filter(e => (e.totalUdhaar - e.amountRepaid) > 0).length;

  const totalRecovered = entries.reduce((acc, curr) => acc + curr.amountRepaid, 0);

  // Filtered List
  const filteredEntries = entries.filter(e => {
    const pending = e.totalUdhaar - e.amountRepaid;
    const matchesFilter = 
      filterType === 'all' ? true :
      filterType === 'pending' ? pending > 0 :
      pending <= 0;

    const matchesSearch = 
      e.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery) ||
      e.notes.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Handle Add New Udhaar
  const handleAddUdhaar = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(newAmount);
    if (!newName.trim() || !amt || amt <= 0) return;

    const newEntry: UdhaarEntry = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      customerName: newName.trim(),
      phone: newPhone.replace(/\D/g, '') || '',
      totalUdhaar: amt,
      amountRepaid: 0,
      notes: newNotes.trim() || 'General Credit',
      date: newDate,
      history: [
        { type: 'credit', amount: amt, date: newDate, note: newNotes.trim() }
      ]
    };

    setEntries([newEntry, ...entries]);
    setShowAddModal(false);
    setNewName('');
    setNewPhone('');
    setNewAmount('');
    setNewNotes('');
  };

  // Handle Record Payment
  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEntry) return;
    const amt = parseFloat(payAmount);
    if (!amt || amt <= 0) return;

    const updated = entries.map(item => {
      if (item.id === selectedEntry.id) {
        const newRepaid = Math.min(item.totalUdhaar, item.amountRepaid + amt);
        return {
          ...item,
          amountRepaid: newRepaid,
          history: [
            ...item.history,
            { type: 'payment' as const, amount: amt, date: new Date().toISOString().split('T')[0], note: payNote.trim() || 'Payment Received' }
          ]
        };
      }
      return item;
    });

    setEntries(updated);
    setShowPaymentModal(false);
    setSelectedEntry(null);
    setPayAmount('');
    setPayNote('');
  };

  // Delete Customer Record
  const handleDeleteEntry = (id: string) => {
    if (window.confirm("Are you sure you want to remove this customer record?")) {
      setEntries(entries.filter(e => e.id !== id));
    }
  };

  // Send WhatsApp Reminder
  const sendWhatsAppReminder = (item: UdhaarEntry) => {
    const pending = Math.max(0, item.totalUdhaar - item.amountRepaid);
    if (pending <= 0) return;

    const cleanPhone = item.phone ? (item.phone.length === 10 ? `91${item.phone}` : item.phone) : '';
    const bizName = user?.business_name || (businessContext?.name as any)?.[language] || "our business";

    let msg = "";
    if (language === 'mr') {
      msg = `नमस्कार ${item.customerName} ताई/भाऊ, आपल्या ${bizName} कडील ₹${pending} ची उधारी बाकी आहे. कृपया लवकरात लवकर द्यावी. धन्यवाद!`;
    } else if (language === 'hi') {
      msg = `नमस्ते ${item.customerName} जी, आपके ${bizName} का ₹${pending} का उधार बाकी है। कृपया शीघ्र भुगतान करने का कष्ट करें। धन्यवाद!`;
    } else {
      msg = `Hello ${item.customerName}, this is a gentle reminder that ₹${pending} is pending for your purchase at ${bizName}. Please clear the due at your convenience. Thank you!`;
    }

    const url = cleanPhone 
      ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;

    window.open(url, '_blank');
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <span>🤝 Customer Credit Tracking</span>
          </div>
          <h1 className="text-3xl font-extrabold text-brand-900 tracking-tight">
            {loc.udhaarTitle}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {loc.udhaarSubtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-3 rounded-2xl font-extrabold text-sm flex items-center gap-2 shadow-lg transition hover:scale-102 cursor-pointer self-start md:self-auto"
        >
          <Plus size={18} />
          <span>{loc.addNewUdhaar}</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
            {loc.totalPendingUdhaar}
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-rose-600">
              ₹{totalPending.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full">
              Pending Dues
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
            {loc.totalCustomersOwing}
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-brand-900">
              {pendingCustomersCount}
            </span>
            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
              Customers
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
            {loc.recoveredThisMonth}
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-green-600">
              ₹{totalRecovered.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
              Recovered
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer name, phone, item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setFilterType('pending')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              filterType === 'pending' ? 'bg-white text-rose-600 shadow-xs' : 'text-gray-500'
            }`}
          >
            Pending ({entries.filter(e => (e.totalUdhaar - e.amountRepaid) > 0).length})
          </button>
          <button
            onClick={() => setFilterType('cleared')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              filterType === 'cleared' ? 'bg-white text-green-700 shadow-xs' : 'text-gray-500'
            }`}
          >
            Cleared ({entries.filter(e => (e.totalUdhaar - e.amountRepaid) <= 0).length})
          </button>
          <button
            onClick={() => setFilterType('all')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              filterType === 'all' ? 'bg-white text-brand-900 shadow-xs' : 'text-gray-500'
            }`}
          >
            All ({entries.length})
          </button>
        </div>
      </div>

      {/* Customer Udhaar Cards List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-gray-100">
            <Users size={36} className="mx-auto text-gray-300 mb-3" />
            <h3 className="font-bold text-base text-brand-900 mb-1">No Customer Records Found</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
              {searchQuery ? "No customer matches your search query." : "You have no customers with pending dues in this filter."}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-accent-600 font-bold text-xs hover:underline cursor-pointer"
            >
              + {loc.addNewUdhaar}
            </button>
          </div>
        ) : (
          filteredEntries.map(item => {
            const pending = Math.max(0, item.totalUdhaar - item.amountRepaid);
            const isCleared = pending === 0;

            return (
              <div
                key={item.id}
                className="bg-white p-5 md:p-6 rounded-3xl border border-gray-200/90 shadow-xs hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-brand-900">
                      {item.customerName}
                    </h3>
                    {item.id === 'sample_udhaar_1' && (
                      <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200">
                        {language === 'mr' ? 'उदा. नमुना' : language === 'hi' ? 'उदा. सैंपल' : 'Sample Example'}
                      </span>
                    )}
                    {isCleared ? (
                      <span className="text-[10px] font-extrabold bg-green-100 text-green-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 size={11} /> FULLY CLEARED
                      </span>
                    ) : (
                      <span className="text-[10px] font-extrabold bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md border border-rose-200">
                        ₹{pending.toLocaleString('en-IN')} DUE
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 font-medium flex items-center gap-3">
                    {item.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={12} className="text-gray-400" /> {item.phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-gray-400" /> {item.date}
                    </span>
                  </p>

                  <p className="text-xs text-gray-600 italic bg-surface-50 px-2.5 py-1 rounded-lg border border-gray-150 inline-block">
                    "{item.notes}"
                  </p>
                </div>

                {/* Amounts & Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-t md:border-t-0 pt-3 md:pt-0">
                  <div className="text-left md:text-right mr-3">
                    <span className="text-[11px] font-bold text-gray-400 block uppercase">
                      Total Credit: ₹{item.totalUdhaar} · Repaid: ₹{item.amountRepaid}
                    </span>
                    <span className={`text-xl font-black ${isCleared ? 'text-green-600' : 'text-rose-600'}`}>
                      {isCleared ? "₹0 Due" : `₹${pending.toLocaleString('en-IN')} Pending`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isCleared && (
                      <>
                        <button
                          onClick={() => sendWhatsAppReminder(item)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                          title="Send reminder on WhatsApp"
                        >
                          <MessageSquare size={14} />
                          <span>WhatsApp</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedEntry(item);
                            setPayAmount(pending.toString());
                            setShowPaymentModal(true);
                          }}
                          className="bg-brand-900 hover:bg-brand-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <IndianRupee size={14} />
                          <span>जमा (Pay)</span>
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleDeleteEntry(item.id)}
                      className="text-gray-400 hover:text-rose-600 p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                      title="Delete Customer Entry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ADD NEW UDHAAR MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-brand-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="font-extrabold text-xl text-brand-900 mb-1">
              {loc.addNewUdhaar}
            </h3>
            <p className="text-xs text-gray-400 mb-5">
              Record goods or services given on credit to a customer
            </p>

            <form onSubmit={handleAddUdhaar} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunita Sharma / Anita Tai"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm font-semibold outline-none focus:bg-white focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Mobile / WhatsApp Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 9822012345 (for 1-click WhatsApp reminder)"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm font-semibold outline-none focus:bg-white focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Credit Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 600"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm font-bold outline-none focus:bg-white focus:border-brand-500 text-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm font-semibold outline-none focus:bg-white focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Items / Note</label>
                <input
                  type="text"
                  placeholder="e.g. 8 Lunch Tiffins / Blouse Stitching"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm font-medium outline-none focus:bg-white focus:border-brand-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold transition text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-extrabold transition shadow-md text-sm cursor-pointer"
                >
                  ✓ Save Credit Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECORD REPAYMENT / PAYMENT MODAL */}
      {showPaymentModal && selectedEntry && (
        <div className="fixed inset-0 bg-brand-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setSelectedEntry(null);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="font-extrabold text-xl text-brand-900 mb-1">
              {loc.recordPayment}
            </h3>
            <p className="text-xs text-gray-400 mb-5">
              Customer: <strong>{selectedEntry.customerName}</strong> · Due: <strong>₹{Math.max(0, selectedEntry.totalUdhaar - selectedEntry.amountRepaid)}</strong>
            </p>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Payment Received (₹) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  max={Math.max(0, selectedEntry.totalUdhaar - selectedEntry.amountRepaid)}
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-lg font-black text-green-700 outline-none focus:bg-white focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Payment Method / Note</label>
                <input
                  type="text"
                  placeholder="e.g. Cash / GPay / PhonePe"
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm font-medium outline-none focus:bg-white focus:border-brand-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedEntry(null);
                  }}
                  className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold transition text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-extrabold transition shadow-md text-sm cursor-pointer"
                >
                  ✓ Record Payment (जमा)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
