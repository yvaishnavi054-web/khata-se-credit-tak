export interface BusinessProfileConfig {
  id: string;
  name: { en: string; hi: string; mr: string };
  icon: string;
  categories: {
    sales: string[];
    expenses: string[];
  };
  sampleVoicePrompt: { en: string; hi: string; mr: string };
  defaultMarginRate: number;
}

export const businessData: Record<string, any> = {
  Tiffin: {
    id: 'Tiffin',
    name: { en: "Tiffin / Food Service", hi: "टिफिन / भोजन सेवा", mr: "डबेवाला / खाद्य सेवा" },
    icon: "🍱",
    categories: {
      sales: ["Tiffin Sales", "Catering Order", "Special Festival Meal", "Delivery Fee", "Daily Tiffins"],
      expenses: ["Vegetables & Groceries", "Gas Cylinder Refill", "Flour & Rice", "Cooking Oil & Spices", "Packaging Boxes", "Helper Wages", "Transport"]
    },
    examples: {
      en: 'Say: "Sold 20 tiffins today at ₹70 each. Bought vegetables for ₹600 and wheat for ₹450."',
      hi: 'बोलें: "आज 20 डबे विकले, 70 रुपये का एक. 600 रुपये की सब्जी और 450 रुपये का गेहूं लाया."',
      mr: 'बोला: "आज 20 डबे विकले, 70 रुपये प्रत्येकी. 600 रुपयांची भाजी आणि 450 रुपयांचा गहू आणला."'
    },
    demoTranscript: {
      en: "Sold 20 tiffins at 70 rupees each. Spent 600 on vegetables and 450 on wheat.",
      hi: "आज 20 डबे विकले, 70 रुपये का एक. 600 रुपये की सब्जी और 450 रुपये का गेहूं लाया.",
      mr: "आज 20 डबे विकले, 70 रुपये प्रत्येकी. 600 रुपयांची भाजी आणि 450 रुपयांचा गहू आणला."
    },
    demoExtraction: {
      income: 1400,
      expensesTotal: 1050,
      profit: 350,
      sales: [{ item: "20 × Tiffins (₹70 each)", quantity: 20, price: 70, total: 1400 }],
      expenses: [
        { item: "Vegetables", amount: 600, category: "Grocery" },
        { item: "Wheat / Grain", amount: 450, category: "Grocery" }
      ]
    },
    expenseCategories: ['Vegetables & Groceries', 'Flour/Rice', 'Gas Cylinder', 'Packaging Boxes', 'Cooking Oil', 'Helper/Delivery', 'Other'],
    marginData: {
      product: { en: "1 Tiffin Meal", hi: "1 टिफिन", mr: "1 डबा" },
      sellingPrice: 70,
      estimatedCost: 35,
      marginText: { en: "50% Margin (₹35 profit)", hi: "50% मार्जिन (₹35 बचत)", mr: "50% नफा (₹35 बचत)" }
    }
  },

  Tailoring: {
    id: 'Tailoring',
    name: { en: "Tailoring & Boutique", hi: "सिलाई एवं बुटीक", mr: "शिलाई व बुटीक" },
    icon: "✂️",
    categories: {
      sales: ["Blouse Stitching", "Dress / Kurti", "Suit Stitching", "Alterations & Fitting", "Designer Saree Fall"],
      expenses: ["Fabric & Cloth", "Thread & Needles", "Zips, Buttons & Hooks", "Lace & Borders", "Sewing Machine Oil/Repair", "Electricity"]
    },
    examples: {
      en: 'Say: "Stitched 3 designer blouses for ₹500 each. Bought fabric for ₹400 and thread for ₹100."',
      hi: 'बोलें: "3 ब्लाउज़ सिले ₹500 प्रति ब्लाउज़। ₹400 का कपड़ा और ₹100 का धागा लिया।"',
      mr: 'बोला: "प्रत्येकी ५०० रुपयांना ३ ब्लाउज शिवले. ४०० रुपयांचे कापड आणि १०० रुपयांचा धागा आणला."'
    },
    demoTranscript: {
      en: "Stitched 3 designer blouses for 500 rupees each. Spent 400 on fabric and 100 on thread.",
      hi: "3 ब्लाउज़ सिले 500 रुपये प्रति ब्लाउज़। 400 रुपये कपड़े पर और 100 रुपये धागे पर खर्च हुए।",
      mr: "प्रत्येकी 500 रुपयांना 3 ब्लाउज शिवले. 400 रुपयांचे कापड आणि 100 रुपयांचा धागा आणला."
    },
    demoExtraction: {
      income: 1500,
      expensesTotal: 500,
      profit: 1000,
      sales: [{ item: "3 × Designer Blouses (₹500 each)", quantity: 3, price: 500, total: 1500 }],
      expenses: [
        { item: "Fabric & Lining", amount: 400, category: "Raw Material" },
        { item: "Threads & Hooks", amount: 100, category: "Supplies" }
      ]
    },
    expenseCategories: ['Fabric & Cloth', 'Thread & Needles', 'Buttons/Zips/Lace', 'Machine Repair', 'Electricity', 'Other'],
    marginData: {
      product: { en: "1 Blouse Stitching", hi: "1 ब्लाउज़ सिलाई", mr: "1 ब्लाउज शिलाई" },
      sellingPrice: 500,
      estimatedCost: 150,
      marginText: { en: "70% Margin (₹350 profit)", hi: "70% मार्जिन (₹350 बचत)", mr: "70% नफा (₹350 बचत)" }
    }
  },

  Bakery: {
    id: 'Bakery',
    name: { en: "Home Bakery", hi: "होम बेकरी", mr: "होम बेकरी" },
    icon: "🧁",
    categories: {
      sales: ["Birthday Cakes", "Pastries & Cupcakes", "Cookies & Biscuits", "Custom Desserts", "Party Bulk Orders"],
      expenses: ["Flour / Maida", "Butter & Dairy Cream", "Sugar & Cocoa Powder", "Cake Boxes & Ribbons", "Oven Electricity / Gas", "Food Essence"]
    },
    examples: {
      en: 'Say: "Sold 2 chocolate cakes for ₹800 each. Bought baking ingredients for ₹600 and boxes for ₹150."',
      hi: 'बोलें: "2 केक बेचे ₹800 प्रति केक। ₹600 का मैदा व क्रीम और ₹150 के डिब्बे खरीदे।"',
      mr: 'बोला: "दोन केक ८०० रुपयांना एक याप्रमाणे विकले. ६०० रुपयांची क्रीम आणि १५० रुपयांचे बॉक्स आणले."'
    },
    demoTranscript: {
      en: "Sold 2 cakes for 800 rupees each. Spent 600 on baking ingredients and 150 on boxes.",
      hi: "2 केक बेचे 800 रुपये में। 600 रुपये बेकिंग सामान पर और 150 रुपये डिब्बों पर खर्च किए।",
      mr: "2 केक 800 रुपयांना एक असे विकले. 600 रुपये बेकिंग साहित्यावर आणि 150 रुपये बॉक्सवर खर्च केले."
    },
    demoExtraction: {
      income: 1600,
      expensesTotal: 750,
      profit: 850,
      sales: [{ item: "2 × Chocolate Cakes (₹800 each)", quantity: 2, price: 800, total: 1600 }],
      expenses: [
        { item: "Cream, Butter, Flour", amount: 600, category: "Ingredients" },
        { item: "Cake Boxes & Ribbons", amount: 150, category: "Packaging" }
      ]
    },
    expenseCategories: ['Flour / Maida', 'Butter & Cream', 'Sugar & Cocoa', 'Cake Boxes & Packaging', 'Oven Power/Gas', 'Other'],
    marginData: {
      product: { en: "1 kg Custom Cake", hi: "1 किलो केक", mr: "१ किलो केक" },
      sellingPrice: 800,
      estimatedCost: 320,
      marginText: { en: "60% Margin (₹480 profit)", hi: "60% मार्जिन (₹480 बचत)", mr: "60% नफा (₹480 बचत)" }
    }
  },

  Parlour: {
    id: 'Parlour',
    name: { en: "Beauty Parlour & Salon", hi: "ब्यूटी पार्लर", mr: "ब्यूटी पार्लर" },
    icon: "💇",
    categories: {
      sales: ["Bridal Makeup", "Facial & Cleanup", "Haircut & Styling", "Waxing & Threading", "Mehendi Service"],
      expenses: ["Cosmetics & Makeup Kits", "Facial Creams & Lotions", "Wax & Strips", "Cotton & Disposables", "Parlour Rent / Power"]
    },
    examples: {
      en: 'Say: "Earned ₹1800 from bridal makeup and ₹400 from facial. Bought cosmetic creams for ₹600."',
      hi: 'बोलें: "मेकअप से ₹1800 और फेशियल से ₹400 मिले। कॉस्मेटिक्स क्रीम पर ₹600 खर्च किए।"',
      mr: 'बोला: "मेकअपमधून १८०० रुपये आणि फेशियलमधून ४०० रुपये मिळाले. क्रीमसाठी ६०० रुपये खर्च केले."'
    },
    demoTranscript: {
      en: "Earned 2200 from parlour services. Spent 600 on cosmetic supplies.",
      hi: "पार्लर सेवाओं से 2200 रुपये मिले। 600 रुपये कॉस्मेटिक्स सामान पर खर्च किए।",
      mr: "पार्लर सेवेतून 2200 रुपये मिळाले. 600 रुपये कॉस्मेटिक्सवर खर्च केले."
    },
    demoExtraction: {
      income: 2200,
      expensesTotal: 600,
      profit: 1600,
      sales: [{ item: "Makeup & Facial Services", quantity: 1, price: 2200, total: 2200 }],
      expenses: [
        { item: "Cosmetic Creams & Kits", amount: 600, category: "Cosmetics" }
      ]
    },
    expenseCategories: ['Cosmetic Kits', 'Creams & Lotions', 'Wax & Disposables', 'Electricity', 'Helper Wages', 'Other'],
    marginData: {
      product: { en: "Bridal Makeup Package", hi: "ब्राइडल पैकेज", mr: "ब्राइडल पॅकेज" },
      sellingPrice: 2000,
      estimatedCost: 400,
      marginText: { en: "80% Margin (₹1600 profit)", hi: "80% मार्जिन (₹1600 बचत)", mr: "80% नफा (₹1600 बचत)" }
    }
  },

  Handicrafts: {
    id: 'Handicrafts',
    name: { en: "Handicrafts & Art", hi: "हस्तशिल्प एवं कला", mr: "हस्तकला व गृहउद्योग" },
    icon: "🎨",
    categories: {
      sales: ["Handmade Jewellery", "Cloth Bags & Pouches", "Festival Decor Items", "Paintings & Clay Art", "Exhibition Sales"],
      expenses: ["Raw Beads & Wires", "Eco-friendly Fabric", "Paints & Brushes", "Packing Paper & Bags", "Stall / Transport Fee"]
    },
    examples: {
      en: 'Say: "Sold 10 handmade bags for ₹250 each. Bought cloth material for ₹800 and thread for ₹150."',
      hi: 'बोलें: "10 हस्तनिर्मित बैग ₹250 प्रति बैग बेचे। ₹800 का कपड़ा और ₹150 के धागे खरीदे।"',
      mr: 'बोला: "१० हॅन्डमेड पिशव्या प्रत्येकी २५० रुपयांना विकल्या. ८०० रुपयांचे कापड आणि १५० रुपयांचे धागे आणले."'
    },
    demoTranscript: {
      en: "Sold 10 handmade bags for 250 each. Spent 800 on fabric and 150 on accessories.",
      hi: "10 बैग 250 रुपये में बेचे। 800 रुपये कपड़े पर और 150 रुपये सामान पर खर्च किए।",
      mr: "10 पिशव्या 250 रुपयांना एक असे विकले. 800 रुपये कापडावर आणि 150 रुपये सामानावर खर्च केले."
    },
    demoExtraction: {
      income: 2500,
      expensesTotal: 950,
      profit: 1550,
      sales: [{ item: "10 × Handmade Bags (₹250 each)", quantity: 10, price: 250, total: 2500 }],
      expenses: [
        { item: "Fabric & Cloth Material", amount: 800, category: "Raw Material" },
        { item: "Zips, Threads, Ribbons", amount: 150, category: "Supplies" }
      ]
    },
    expenseCategories: ['Raw Beads & Materials', 'Fabric Material', 'Paints & Craft Tools', 'Packaging Material', 'Courier/Transport', 'Other'],
    marginData: {
      product: { en: "Handcrafted Eco Bag", hi: "हस्तनिर्मित बैग", mr: "हस्तकला पिशवी" },
      sellingPrice: 250,
      estimatedCost: 95,
      marginText: { en: "62% Margin (₹155 profit)", hi: "62% मार्जिन (₹155 बचत)", mr: "62% नफा (₹155 बचत)" }
    }
  }
};

// Real, verified government schemes for women micro-entrepreneurs
export interface LocalizedText {
  en: string;
  hi: string;
  mr: string;
}

export interface LocalizedList {
  en: string[];
  hi: string[];
  mr: string[];
}

export interface SchemeInfo {
  id: string;
  name: LocalizedText;
  ministry: LocalizedText;
  category: LocalizedText;
  loanAmount: LocalizedText;
  subsidy: LocalizedText;
  purpose: LocalizedText;
  intendedFor: LocalizedText;
  eligibility: LocalizedList;
  benefits: LocalizedList;
  documents: LocalizedList;
  applicationProcess: LocalizedList;
  officialUrl: string;
  verifiedDate: LocalizedText;
  badge: LocalizedText;
}

export const schemes: SchemeInfo[] = [
  {
    id: "mudra-shishu",
    name: {
      en: "Pradhan Mantri MUDRA Yojana (PMMY) - Shishu Loan",
      hi: "प्रधानमंत्री मुद्रा योजना (PMMY) - शिशु ऋण",
      mr: "प्रधानमंत्री मुद्रा योजना (PMMY) - शिशु कर्ज"
    },
    ministry: {
      en: "Ministry of Finance, Government of India",
      hi: "वित्त मंत्रालय, भारत सरकार",
      mr: "वित्त मंत्रालय, भारत सरकार"
    },
    category: {
      en: "Micro-Business Credit without Collateral",
      hi: "बिना गारंटी सूक्ष्म व्यापार ऋण",
      mr: "तारणमुक्त सूक्ष्म व्यवसाय कर्ज (विना गॅरंटी)"
    },
    loanAmount: {
      en: "Up to ₹50,000",
      hi: "₹50,000 तक",
      mr: "₹५०,००० पर्यंत"
    },
    subsidy: {
      en: "Zero processing fee · No collateral required",
      hi: "शून्य प्रोसेसिंग फीस · किसी भी गारंटी या बंधक की आवश्यकता नहीं",
      mr: "शून्य प्रक्रिया शुल्क · कोणतेही तारण किंवा हमी आवश्यक नाही"
    },
    purpose: {
      en: "Working capital and equipment purchase for small home-based businesses, food vendors, tailors, and micro-entrepreneurs.",
      hi: "छोटे घरेलू व्यवसाय, खान-पान विक्रेता, सिलाई एवं सूक्ष्म उद्यमियों हेतु कार्यशील पूंजी और उपकरण खरीद।",
      mr: "लहान घरगुती व्यवसाय, खाद्यपदार्थ विक्रेते, शिलाई काम व सूक्ष्म उद्योजकांसाठी खेळते भांडवल आणि साहित्य खरेदी."
    },
    intendedFor: {
      en: "Women micro-entrepreneurs and home-based service providers starting or formalizing operations.",
      hi: "महिला सूक्ष्म उद्यमी जो नया काम शुरू कर रही हैं या कारोबार व्यवस्थित कर रही हैं।",
      mr: "नवीन सुरुवात करणाऱ्या किंवा व्यवसायाचा विस्तार करणाऱ्या महिला सूक्ष्म उद्योजिका."
    },
    eligibility: {
      en: [
        "Any Indian citizen running a non-farm revenue-generating micro-business.",
        "No minimum educational qualification required.",
        "Clear credit track record with no prior bank defaults."
      ],
      hi: [
        "कोई भी भारतीय नागरिक जो गैर-कृषि आय अर्जक सूक्ष्म व्यवसाय चला रही हैं।",
        "किसी न्यूनतम शैक्षणिक योग्यता की आवश्यकता नहीं है।",
        "बैंकों में कोई पुराना डिफॉल्ट नहीं होना चाहिए।"
      ],
      mr: [
        "उत्पन्न मिळवून देणारा बिगरशेती सूक्ष्म व्यवसाय चालवणारी कोणतीही भारतीय नागरिक महिला.",
        "किमान शैक्षणिक पात्रतेची कोणतीही अट नाही.",
        "कोणत्याही बँकेत थकीत कर्जाची पार्श्वभूमी नसलेली व्यक्ती."
      ]
    },
    benefits: {
      en: [
        "Collateral-free loan up to ₹50,000.",
        "Low interest rate (typically 8.5% to 11% p.a.).",
        "Flexible repayment period of 3 to 5 years.",
        "MUDRA RuPay Debit Card for easy working capital withdrawal."
      ],
      hi: [
        "₹50,000 तक का बिना किसी गारंटी के बैंक ऋण।",
        "कम ब्याज दर (सालाना 8.5% से 11%)।",
        "3 से 5 साल की सुविधाजनक पुनर्भुगतान अवधि।",
        "कार्यशील पूंजी निकालने हेतु मुद्रा रुपे डेबिट कार्ड।"
      ],
      mr: [
        "₹५०,००० पर्यंतचे विनातारण हमीमुक्त बँक कर्ज.",
        "कमी व्याजदर (साधारणपणे वार्षिक ८.५% ते ११%).",
        "३ ते ५ वर्षांची सुलभ परतफेडीची मुदत.",
        "खेळते भांडवल काढण्यासाठी मुद्रा रुपे डेबिट कार्ड."
      ]
    },
    documents: {
      en: [
        "Aadhaar Card & PAN Card",
        "Proof of Business (Khata se Credit Tak 3-Month Bank-Ready Statement, photos of workplace)",
        "Bank Account Passbook / 6-Month Account Statement",
        "Two passport-size photographs",
        "Quotation of machinery/items to be purchased (if applicable)"
      ],
      hi: [
        "आधार कार्ड एवं पैन कार्ड",
        "व्यवसाय का प्रमाण (खाता से क्रेडिट तक 3-माह का बैंक-रेडी स्टेटमेंट व कार्यस्थल की फोटो)",
        "बैंक खाता पासबुक / 6 माह का बैंक खाता विवरण",
        "2 पासपोर्ट साइज फोटो",
        "खरीदे जाने वाले सामान/मशीनरी का कोटेशन (यदि लागू हो)"
      ],
      mr: [
        "आधार कार्ड आणि पॅन कार्ड",
        "व्यवसाय पुरावा (खाता से क्रेडिट तक ३-महिन्यांचे बँक-रेडी स्टेटमेंट व कामाच्या जागेचा फोटो)",
        "बँक पासबुक / ६ महिन्यांचे बँक स्टेटमेंट",
        "२ पासपोर्ट आकाराचे फोटो",
        "खरेदी करायच्या मशिनरी/साहित्याचे कोटेशन (लागू असल्यास)"
      ]
    },
    applicationProcess: {
      en: [
        "1. Generate your 3-Month Bank-Ready Statement from Khata se Credit Tak.",
        "2. Visit your nearest Public Sector Bank (SBI, Bank of Maharashtra, Bank of Baroda) or Regional Rural Bank (Gramin Bank).",
        "3. Ask for the MUDRA Shishu Loan Application Form (1-page simplified form).",
        "4. Submit the form along with Aadhaar, passbook, and your Bank-Ready Statement.",
        "5. Alternatively, apply online via the official JanSamarth / UdyamiMitra portal."
      ],
      hi: [
        "1. खाता से क्रेडिट तक से अपना 3-माह का बैंक-रेडी स्टेटमेंट डाउनलोड करें।",
        "2. नज़दीकी राष्ट्रीयकृत बैंक (SBI, बैंक ऑफ महाराष्ट्र, बैंक ऑफ बड़ौदा) या ग्रामीण बैंक में जाएं।",
        "3. मुद्रा शिशु लोन फॉर्म (सरल 1-पृष्ठ फॉर्म) मांगें।",
        "4. आधार कार्ड, पासबुक और अपने बैंक-रेडी स्टेटमेंट के साथ फॉर्म जमा करें।",
        "5. आप जनसमर्थ / उद्यमी मित्र पोर्टल (www.mudra.org.in) पर भी ऑनलाइन आवेदन कर सकती हैं।"
      ],
      mr: [
        "१. खाता से क्रेडिट तक वरून तुमचे ३-महिन्यांचे बँक-रेडी स्टेटमेंट डाउनलोड करा.",
        "२. जवळच्या राष्ट्रीयीकृत बँकेत (SBI, बँक ऑफ महाराष्ट्र, बँक ऑफ बडोदा) किंवा ग्रामीण बँकेत जा.",
        "३. मुद्रा शिशु कर्ज अर्ज फॉर्म (१ पानी सोपा फॉर्म) घ्या.",
        "४. आधार, पासबुक आणि तुमच्या बँक-रेडी स्टेटमेंटसह फॉर्म जमा करा.",
        "५. तसेच अधिकृत पोर्टलवर (www.mudra.org.in) ऑनलाइन अर्जही करता येतो."
      ]
    },
    officialUrl: "https://www.mudra.org.in/",
    verifiedDate: {
      en: "October 2026",
      hi: "अक्टूबर 2026",
      mr: "ऑक्टोबर २०२६"
    },
    badge: {
      en: "Most Accessible for Beginners",
      hi: "शुरुआती कारोबार हेतु सबसे सुलभ",
      mr: "सुरुवात करणाऱ्यांसाठी सर्वात सोपे कर्ज"
    }
  },

  {
    id: "pmegp",
    name: {
      en: "Prime Minister's Employment Generation Programme (PMEGP)",
      hi: "प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)",
      mr: "पंतप्रधान रोजगार निर्मिती कार्यक्रम (PMEGP)"
    },
    ministry: {
      en: "Ministry of MSME & KVIC",
      hi: "सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय एवं केवीआईसी",
      mr: "सूक्ष्म, लघु व मध्यम उद्योग मंत्रालय व KVIC"
    },
    category: {
      en: "Credit-Linked Capital Subsidy Scheme",
      hi: "क्रेडिट लिंक्ड पूंजीगत सब्सिडी योजना",
      mr: "कर्ज-संलग्न भांडवली अनुदान योजना"
    },
    loanAmount: {
      en: "Up to ₹20 Lakh (Service) / ₹50 Lakh (Manufacturing)",
      hi: "सेवा क्षेत्र हेतु ₹20 लाख तक / विनिर्माण उद्योग हेतु ₹50 लाख तक",
      mr: "सेवा उद्योगासाठी ₹२० लाखांपर्यंत / उत्पादन उद्योगासाठी ₹५० लाखांपर्यंत"
    },
    subsidy: {
      en: "Up to 35% Capital Subsidy for Women & Special Categories",
      hi: "महिलाओं एवं विशेष वर्गों हेतु 35% तक सरकारी सब्सिडी",
      mr: "महिला व विशेष घटकांसाठी ३५% पर्यंत थेट सरकारी अनुदान (सब्सिडी)"
    },
    purpose: {
      en: "Setting up or expanding small manufacturing, catering, bakery, tailoring or craft units.",
      hi: "कैटरिंग, बेकरी, सिलाई बुटीक या छोटे विनिर्माण कार्यशाला की स्थापना एवं विस्तार।",
      mr: "कॅटरिंग, बेकरी, बुटीक, हस्तकला किंवा लहान प्रक्रिया युनिट स्थापन करण्यासाठी."
    },
    intendedFor: {
      en: "Women micro-entrepreneurs ready to transition from a home setup to a formalized commercial unit.",
      hi: "घरेलू काम से आगे बढ़कर व्यावसायिक स्तर पर इकाई स्थापित करने वाली महिला उद्यमी।",
      mr: "घरगुती व्यवसायातून व्यावसायिक दुकानात किंवा कार्यशाळेत रूपांतर करू इच्छिणाऱ्या महिला."
    },
    eligibility: {
      en: [
        "Individuals aged 18 years and above.",
        "For service projects above ₹5 Lakh, minimum 8th class pass required.",
        "Women beneficiaries receive special 35% rural / 25% urban government subsidy.",
        "Only new project setups eligible."
      ],
      hi: [
        "आवेदक की आयु न्यूनतम 18 वर्ष होनी चाहिए।",
        "सेवा क्षेत्र में ₹5 लाख से अधिक परियोजना हेतु न्यूनतम 8वीं कक्षा उत्तीर्ण।",
        "महिला लाभार्थियों को ग्रामीण क्षेत्र में 35% एवं शहरी क्षेत्र में 25% सब्सिडी।",
        "केवल नई व्यावसायिक परियोजनाओं हेतु मान्य।"
      ],
      mr: [
        "वय १८ वर्षे पूर्ण असणारी व्यक्ती.",
        "सेवा प्रकल्पासाठी ₹५ लाखांपेक्षा जास्त कर्जाकरिता किमान ८ वी उत्तीर्ण असणे आवश्यक.",
        "महिलांना ग्रामीण भागात ३५% आणि शहरी भागात २५% थेट सरकारी अनुदान.",
        "केवळ नवीन व्यवसाय स्थापन करण्यासाठी पात्र."
      ]
    },
    benefits: {
      en: [
        "35% margin money subsidy deposited into bank escrow (non-repayable if unit runs successfully).",
        "Own contribution is only 5% of total project cost for women entrepreneurs.",
        "Balance 60% to 70% provided as term loan and working capital by nationalized banks."
      ],
      hi: [
        "35% सरकारी सब्सिडी बैंक खाते में जमा (इकाई सफल रहने पर वापस नहीं करनी होती)।",
        "महिला उद्यमियों को कुल लागत का केवल 5% अपना हिस्सा लगाना होता है।",
        "शेष 60% से 70% राशि राष्ट्रीयकृत बैंकों द्वारा ऋण के रूप में दी जाती है।"
      ],
      mr: [
        "३५% सरकारी अनुदान बँक खात्यात थेट जमा (व्यवसाय सुरू राहिल्यास परतफेडीची गरज नाही).",
        "महिला उद्योजिकांसाठी स्वतःचे भांडवल केवळ ५% आवश्यक.",
        "उर्वरित ६०% ते ७०% रक्कम राष्ट्रीयीकृत बँकांकडून मुदत कर्ज म्हणून मंजूर."
      ]
    },
    documents: {
      en: [
        "Aadhaar Card, PAN Card & Caste/Special Category Certificate",
        "Project Report / Business Summary (3-Month Khata Track Record)",
        "Educational certificate (for projects above ₹5 Lakh)",
        "Rent agreement or ownership proof of premises",
        "Quotations for machinery and raw materials"
      ],
      hi: [
        "आधार कार्ड, पैन कार्ड एवं जाति/विशेष वर्ग प्रमाण पत्र",
        "परियोजना सारांश रिपोर्ट (3-माह का खाता रिकॉर्ड)",
        "शैक्षणिक योग्यता प्रमाण पत्र (₹5 लाख से अधिक प्रोजेक्ट हेतु)",
        "दुकान/कार्यस्थल का किराया नामा या मालिकाना दस्तावेज",
        "मशीनरी व कच्चे माल का कोटेशन"
      ],
      mr: [
        "आधार कार्ड, पॅन कार्ड आणि प्रवर्ग प्रमाणपत्र",
        "प्रकल्प अहवाल / व्यवसाय सारांश (३-महिन्यांचे खाता रेकॉर्ड)",
        "शैक्षणिक प्रमाणपत्र (₹५ लाखांवरील प्रकल्पासाठी)",
        "जागेचा भाडेकरार किंवा मालकी हक्काचा पुरावा",
        "मशिनरी आणि कच्च्या मालाचे अधिकृत कोटेशन"
      ]
    },
    applicationProcess: {
      en: [
        "1. Prepare your Project Cost Summary and business record proof.",
        "2. Visit the official KVIC PMEGP e-Portal (kviconline.gov.in).",
        "3. Register as a female individual applicant and fill out the online application.",
        "4. Upload Aadhaar, photos, and project estimate.",
        "5. Application is forwarded to your selected bank branch and District Industries Centre (DIC) for sanction."
      ],
      hi: [
        "1. अपना प्रोजेक्ट खर्च सारांश और 3-माह का वित्तीय रिकॉर्ड तैयार करें।",
        "2. आधिकारिक केवीआईसी पीएमईजीपी ई-पोर्टल (kviconline.gov.in) पर जाएं।",
        "3. महिला व्यक्तिगत आवेदक के रूप में ऑनलाइन आवेदन भरें।",
        "4. आधार, फोटो और प्रोजेक्ट कोटेशन अपलोड करें।",
        "5. आवेदन आपकी चुनी हुई बैंक शाखा और जिला उद्योग केंद्र (DIC) को सत्यापन हेतु भेजा जाता है।"
      ],
      mr: [
        "१. तुमचा प्रकल्प खर्च सारांश आणि ३-महिन्यांचे आर्थिक रेकॉर्ड तयार करा.",
        "२. अधिकृत केव्हीआयसी पीएमईजीपी ई-पोर्टल (kviconline.gov.in) वर जा.",
        "३. महिला वैयक्तिक अर्जदार म्हणून ऑनलाईन नोंदणी करा.",
        "४. आधार, फोटो आणि मशिनरी कोटेशन अपलोड करा.",
        "५. अर्ज तुमच्या निवडलेल्या बँक शाखेकडे आणि जिल्हा उद्योग केंद्राकडे (DIC) मंजुरीसाठी जातो."
      ]
    },
    officialUrl: "https://www.kviconline.gov.in/pmegpportal/pmegphome/index.jsp",
    verifiedDate: {
      en: "October 2026",
      hi: "अक्टूबर 2026",
      mr: "ऑक्टोबर २०२६"
    },
    badge: {
      en: "Highest Government Subsidy (35%)",
      hi: "सर्वाधिक सरकारी सब्सिडी (35%)",
      mr: "सर्वात मोठे सरकारी अनुदान (३५%)"
    }
  },

  {
    id: "lakhpati-didi",
    name: {
      en: "Lakhpati Didi Initiative / DAY-NRLM SHG Credit Linkage",
      hi: "लखपति दीदी पहल / डीएवाई-एनआरएलएम एसएचजी ऋण लिंकेज",
      mr: "लखपती दीदी उपक्रम / उमेद बचत गट बँक कर्ज"
    },
    ministry: {
      en: "Ministry of Rural Development, Government of India",
      hi: "ग्रामीण विकास मंत्रालय, भारत सरकार",
      mr: "ग्रामीण विकास मंत्रालय, भारत सरकार"
    },
    category: {
      en: "Community & Self Help Group Financial Empowerment",
      hi: "स्वयं सहायता समूह (SHG) वित्तीय सशक्तिकरण",
      mr: "महिला स्वयं सहाय्यता गट (SHG) आर्थिक सक्षमीकरण"
    },
    loanAmount: {
      en: "₹1 Lakh to ₹5 Lakh subsidized revolving credit",
      hi: "₹1 लाख से ₹5 लाख रियायती आवर्ती ऋण",
      mr: "₹१ लाख ते ₹५ लाख फिरते कर्ज भांडवल"
    },
    subsidy: {
      en: "Subsidized interest rate (down to 7% p.a. through subvention)",
      hi: "ब्याज अनुदान के साथ रियायती ब्याज दर (7% प्रति वर्ष)",
      mr: "व्याज सवलतीसह अत्यंत कमी व्याजदर (७% वार्षिक)"
    },
    purpose: {
      en: "Empowering rural and semi-urban women SHG members to earn sustainable annual household income exceeding ₹1,00,000.",
      hi: "ग्रामीण एवं कस्बाई महिला उद्यमियों की वार्षिक आय ₹1,00,000 से अधिक करने हेतु वित्तीय सहायता।",
      mr: "ग्रामीण व निमशहरी महिलांचे वार्षिक घरगुती उत्पन्न ₹१,००,००० पेक्षा जास्त करण्यासाठी आर्थिक पाठबळ."
    },
    intendedFor: {
      en: "Women entrepreneurs who are members of registered Self Help Groups (SHGs) or willing to join local village federations.",
      hi: "महिला स्वयं सहायता समूह की सक्रिय सदस्य या ग्राम संगठन से जुड़ी महिलाएं।",
      mr: "महिला बचत गटाच्या (SHG) सक्रिय सदस्य किंवा स्थानिक ग्रामसंघाशी जोडलेल्या महिला."
    },
    eligibility: {
      en: [
        "Women residing in rural or peri-urban areas.",
        "Active membership in a Deendayal Antyodaya Yojana - NRLM affiliated SHG.",
        "Regular savings and internal lending track record within the group."
      ],
      hi: [
        "ग्रामीण या अर्ध-शहरी क्षेत्र में निवास करने वाली महिलाएं।",
        "दीनदयाल अंत्योदय योजना - एनआरएलएम संबद्ध स्वयं सहायता समूह की सक्रिय सदस्यता।",
        "समूह में नियमित बचत और आंतरिक लेनदेन का संतोषजनक रिकॉर्ड।"
      ],
      mr: [
        "ग्रामीण किंवा निमशहरी भागात राहणाऱ्या महिला.",
        "दीनदयाळ अंत्योदय योजना - उमेद / NRLM संलग्न महिला बचत गटाची सक्रिय सदस्यता.",
        "बचत गटामध्ये नियमित मासिक बचत व अंतर्गत व्यवहारांची चांगली नोंद."
      ]
    },
    benefits: {
      en: [
        "Collateral-free credit through SHG-Bank Linkage program.",
        "Interest subvention reducing net borrowing cost.",
        "Access to community investment fund (CIF) and training in business management.",
        "Mentorship and market linkage through local haats and Saras fairs."
      ],
      hi: [
        "एसएचजी-बैंक लिंकेज द्वारा बिना किसी बंधक के आसान ऋण।",
        "ब्याज अनुदान से ब्याज दर घटकर मात्र 7% सालाना।",
        "सामुदायिक निवेश कोष (सीआईएफ) और व्यवसाय प्रबंधन प्रशिक्षण।",
        "सरस मेलों और स्थानीय हाट में उत्पादों की बिक्री हेतु बाज़ार सहयोग।"
      ],
      mr: [
        "बचत गट-बँक लिंकेजद्वारे विनातारण सुलभ कर्ज.",
        "व्याज सवलतीमुळे अत्यंत कमी व्याजदराचा फायदा (वार्षिक ७%).",
        "सामुदायिक गुंतवणूक निधी (CIF) आणि व्यवसाय व्यवस्थापन प्रशिक्षण.",
        "स्थानिक आठवडे बाजार व सरस प्रदर्शनांमध्ये उत्पादनांच्या विक्रीची संधी."
      ]
    },
    documents: {
      en: [
        "Aadhaar Card of applicant",
        "SHG Passbook and resolution signed by group members",
        "Personal bank account details",
        "Business Activity Plan (Khata se Credit Tak summary)"
      ],
      hi: [
        "आवेदक का आधार कार्ड",
        "एसएचजी पासबुक और समूह सदस्यों द्वारा हस्ताक्षरित ऋण प्रस्ताव पत्र",
        "व्यक्तिगत बैंक खाता विवरण",
        "व्यावसायिक कार्य योजना (खाता से क्रेडिट तक सारांश)"
      ],
      mr: [
        "अर्जदार महिलेचे आधार कार्ड",
        "बचत गट पासबुक आणि सदस्यांनी स्वाक्षरी केलेला मासिक ठराव",
        "वैयक्तिक बँक खात्याचा तपशील",
        "व्यवसाय कृती आराखडा (खाता से क्रेडिट तक सारांश)"
      ]
    },
    applicationProcess: {
      en: [
        "1. Present your business activity and 3-month khata records during your monthly SHG meeting.",
        "2. Pass a resolution for business loan support.",
        "3. Cluster Level Federation (CLF) submits loan application to the partner bank branch.",
        "4. Bank disburses loan to SHG account for onward lending to you."
      ],
      hi: [
        "1. अपनी मासिक समूह बैठक में अपना 3-माह का खाता विवरण प्रस्तुत करें।",
        "2. ऋण सहायता हेतु समूह में सर्वसम्मति से प्रस्ताव पारित करें।",
        "3. क्लस्टर लेवल फेडरेशन (CLF) द्वारा बैंक शाखा में ऋण आवेदन प्रस्तुत किया जाता है।",
        "4. बैंक द्वारा समूह खाते में ऋण राशि स्वीकृत की जाती है, जो आपको वितरित होती है।"
      ],
      mr: [
        "१. तुमच्या मासिक बचत गट बैठकीत ३-महिन्यांचे खाता रेकॉर्ड दाखवा.",
        "२. व्यवसाय कर्जासाठी गटात ठराव मंजूर करा.",
        "३. ग्रामसंघ / प्रभाग संघ (CLF) बँकेकडे कर्ज प्रस्ताव सादर करतो.",
        "४. बँक बचत गटाच्या खात्यावर रक्कम जमा करते, जी तुम्हाला व्यवसायासाठी दिली जाते."
      ]
    },
    officialUrl: "https://aajeevika.gov.in/",
    verifiedDate: {
      en: "October 2026",
      hi: "अक्टूबर 2026",
      mr: "ऑक्टोबर २०२६"
    },
    badge: {
      en: "Best for Community & SHG Women",
      hi: "बचत समूह महिलाओं हेतु सर्वोत्तम",
      mr: "बचत गट महिलांसाठी सर्वोत्तम"
    }
  },

  {
    id: "udyam-sakhi",
    name: {
      en: "Udyam Sakhi Portal & Udyam Aadhar Registration",
      hi: "उद्यम सखी पोर्टल एवं उद्यम आधार पंजीकरण",
      mr: "उद्यम सखी पोर्टल व उद्यम आधार नोंदणी"
    },
    ministry: {
      en: "Ministry of Micro, Small and Medium Enterprises (MSME)",
      hi: "सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय (MSME)",
      mr: "सूक्ष्म, लघु व मध्यम उद्योग मंत्रालय (MSME)"
    },
    category: {
      en: "Formal Business Identity & Entrepreneurship Support",
      hi: "औपचारिक व्यापार पहचान एवं एमएसएमई प्रमाणपत्र",
      mr: "अधिकृत व्यवसाय ओळख व सरकारी प्रमाणपत्र"
    },
    loanAmount: {
      en: "Enables Priority Sector Lending & Scheme Access",
      hi: "प्राथमिकता प्राप्त क्षेत्र ऋण एवं योजना पात्रता",
      mr: "बँक कर्ज व सरकारी योजनांसाठी प्राधान्य पात्रता"
    },
    subsidy: {
      en: "Free Lifetime Registration · Priority Government Tendering",
      hi: "आजीवन निःशुल्क आधिकारिक पंजीकरण · बैंक योजनाओं में प्राथमिकता",
      mr: "आयुष्यभरासाठी मोफत अधिकृत सरकारी नोंदणी"
    },
    purpose: {
      en: "Providing women entrepreneurs with an official Government of India MSME Certificate, opening bank accounts, and accessing financial schemes.",
      hi: "महिला उद्यमियों को भारत सरकार का आधिकारिक उद्यम पंजीकरण प्रमाण पत्र, बैंक खाता एवं योजनाओं की सुविधा देना।",
      mr: "महिला व्यावसायिकांना भारत सरकारचे अधिकृत MSME प्रमाणपत्र देणे, बँक खाते उघडणे आणि योजनांचा लाभ मिळवून देणे."
    },
    intendedFor: {
      en: "Every woman running a micro-enterprise, home kitchen, parlour, or tailoring unit.",
      hi: "टिफिन, सिलाई, पार्लर या अन्य कोई भी काम करने वाली प्रत्येक महिला उद्यमी।",
      mr: "टिफिन, सिलाई, ब्युटी पार्लर किंवा हस्तकला चालवणारी प्रत्येक महिला उद्योजिका."
    },
    eligibility: {
      en: [
        "Any woman micro-entrepreneur with an Aadhaar number and functional mobile number.",
        "No turnover or investment minimum threshold."
      ],
      hi: [
        "कोई भी महिला उद्यमी जिसके पास आधार और सक्रिय मोबाइल नंबर हो।",
        "कारोबार या निवेश की किसी न्यूनतम सीमा की आवश्यकता नहीं है।"
      ],
      mr: [
        "आधार कार्ड आणि चालू मोबाईल नंबर असलेली कोणतीही महिला सूक्ष्म व्यावसायिक.",
        "किमान उलाढाल किंवा भांडवलाची कोणतीही अट नाही."
      ]
    },
    benefits: {
      en: [
        "Official Government MSME Certificate (Udyam Registration Number).",
        "Qualifies your business for Priority Sector Lending (PSL) at all banks.",
        "Exemption from earnest money deposit in public procurement.",
        "Access to business mentorship, technology centers, and exhibition stalls."
      ],
      hi: [
        "भारत सरकार का आधिकारिक एमएसएमई उद्यम प्रमाण पत्र।",
        "सभी बैंकों में प्राथमिकता प्राप्त क्षेत्र (PSL) ऋण हेतु पात्रता।",
        "सरकारी टेंडर और प्रदर्शनियों में प्राथमिकता।",
        "व्यवसाय परामर्श, मार्गदर्शन और तकनीक केंद्रों तक सीधी पहुंच।"
      ],
      mr: [
        "भारत सरकारचे अधिकृत एमएसएमई उद्यम नोंदणी प्रमाणपत्र.",
        "सर्व बँकांमध्ये प्राधान्य क्षेत्रांतर्गत (PSL) कमी व्याजदराच्या कर्जासाठी पात्रता.",
        "सरकारी निविदा आणि प्रदर्शनांमध्ये विशेष सवलत.",
        "व्यवसाय मार्गदर्शन आणि तंत्रज्ञान केंद्रांची मोफत मदत."
      ]
    },
    documents: {
      en: [
        "Aadhaar Card (must be linked to active mobile for OTP)",
        "PAN Card (optional for micro-units without GST requirement)",
        "Bank Account Number & IFSC code",
        "Basic business details (Activity type and address)"
      ],
      hi: [
        "आधार कार्ड (ओटीपी हेतु मोबाइल से लिंक होना अनिवार्य)",
        "पैन कार्ड (माइक्रो इकाइयों के लिए वैकल्पिक)",
        "बैंक खाता संख्या एवं आईएफएससी कोड",
        "व्यवसाय का सामान्य विवरण (काम का प्रकार और पता)"
      ],
      mr: [
        "आधार कार्ड (OTP पडताळणीसाठी मोबाईल लिंक असणे आवश्यक)",
        "पॅन कार्ड (जीएसटी लागू नसलेल्या सूक्ष्म व्यवसायांसाठी ऐच्छिक)",
        "बँक खाते क्रमांक आणि IFSC कोड",
        "व्यवसायाचा मूलभूत पत्ता आणि कामाचे स्वरूप"
      ]
    },
    applicationProcess: {
      en: [
        "1. Visit the zero-fee official portal at udyamregistration.gov.in.",
        "2. Enter Aadhaar number and authenticate with OTP.",
        "3. Enter your business name, activity (e.g., Food / Tailoring), and bank account details.",
        "4. Download and print your official Udyam Registration Certificate immediately."
      ],
      hi: [
        "1. निःशुल्क आधिकारिक पोर्टल udyamregistration.gov.in पर जाएं।",
        "2. अपना आधार नंबर दर्ज करें और मोबाइल ओटीपी से सत्यापित करें।",
        "3. अपने व्यापार का नाम, गतिविधि (जैसे भोजन / सिलाई) और बैंक विवरण दर्ज करें।",
        "4. तुरंत अपना आधिकारिक उद्यम पंजीकरण प्रमाण पत्र डाउनलोड और प्रिंट करें।"
      ],
      mr: [
        "१. अधिकृत मोफत पोर्टल udyamregistration.gov.in वर जा.",
        "२. आधार क्रमांक टाका आणि मोबाईल OTP ने पडताळणी करा.",
        "३. व्यवसायाचे नाव, कामाचा प्रकार (उदा. टिफिन / शिलाई) आणि बँक तपशील भरा.",
        "४. लगेच तुमचे अधिकृत उद्यम नोंदणी प्रमाणपत्र डाऊनलोड करून प्रिंट करा."
      ]
    },
    officialUrl: "https://udyamregistration.gov.in/",
    verifiedDate: {
      en: "October 2026",
      hi: "अक्टूबर 2026",
      mr: "ऑक्टोबर २०२६"
    },
    badge: {
      en: "Mandatory 1st Step for All Businesses",
      hi: "सभी व्यवसायों हेतु अनिवार्य पहला कदम",
      mr: "प्रत्येक व्यवसायासाठी अनिवार्य पहिले पाऊल"
    }
  },

  {
    id: "standup-india",
    name: {
      en: "Stand-Up India Scheme",
      hi: "स्टैंड-अप इंडिया योजना",
      mr: "स्टँड-अप इंडिया योजना"
    },
    ministry: {
      en: "Department of Financial Services, Ministry of Finance",
      hi: "वित्तीय सेवा विभाग, वित्त मंत्रालय, भारत सरकार",
      mr: "वित्तीय सेवा विभाग, वित्त मंत्रालय, भारत सरकार"
    },
    category: {
      en: "Greenfield Enterprise Commercial Credit",
      hi: "नए व्यावसायिक उद्यमों हेतु बैंक ऋण",
      mr: "नवीन व्यावसायिक उपक्रमांसाठी मोठे बँक कर्ज"
    },
    loanAmount: {
      en: "₹10 Lakh to ₹1 Crore",
      hi: "₹10 लाख से ₹1 करोड़",
      mr: "₹१० लाख ते ₹१ कोटी"
    },
    subsidy: {
      en: "Composite Term Loan + Working Capital Support",
      hi: "मियादी ऋण + कार्यशील पूंजी समग्र सहायता",
      mr: "मुदत कर्ज + खेळते भांडवल एकत्रीकरण"
    },
    purpose: {
      en: "Promoting entrepreneurship among women and SC/ST individuals for establishing commercial-scale manufacturing or service enterprises.",
      hi: "व्यावसायिक स्तर पर निर्माण या सेवा व्यवसाय शुरू करने हेतु महिला उद्यमियों को बढ़ावा देना।",
      mr: "मोठ्या प्रमाणावर उत्पादन किंवा सेवा व्यवसाय उभारण्यासाठी महिला उद्योजकांना चालना देणे."
    },
    intendedFor: {
      en: "Established women entrepreneurs scaling beyond home operations into a dedicated workshop, boutique, or commercial kitchen.",
      hi: "घरेलू काम से आगे बढ़कर बड़ा स्टोर, बुटीक या कमर्शियल किचन शुरू करने वाली महिलाएं।",
      mr: "घराबाहेर मोठे दुकान, बुटीक किंवा व्यावसायिक किचन सुरू करू इच्छिणाऱ्या महिला उद्योजिका."
    },
    eligibility: {
      en: [
        "Women entrepreneurs aged 18 years and above.",
        "The business must be a greenfield (new commercial enterprise).",
        "In non-individual enterprises, 51% shareholding must be held by women.",
        "Applicant should not be in default to any bank."
      ],
      hi: [
        "18 वर्ष या उससे अधिक आयु की महिला उद्यमी।",
        "व्यवसाय एक नई व्यावसायिक परियोजना (ग्रीनफील्ड) होना चाहिए।",
        "गैर-व्यक्तिगत संस्थाओं में कम से कम 51% हिस्सेदारी महिला के पास होनी चाहिए।",
        "किसी भी बैंक में पूर्व डिफॉल्टर नहीं होना चाहिए।"
      ],
      mr: [
        "१८ वर्षे किंवा त्याहून अधिक वयाच्या महिला उद्योजिका.",
        "व्यवसाय नवीन व्यावसायिक उपक्रम (ग्रीनफिल्ड) असणे आवश्यक.",
        "भागीदारी संस्थेमध्ये किमान ५१% मालकी महिलांकडे असणे आवश्यक.",
        "कोणत्याही बँकेत कर्ज थकबाकीदार नसलेली व्यक्ती."
      ]
    },
    benefits: {
      en: [
        "Bank financing covering 75% to 85% of project cost.",
        "Comprehensive support including handholding, training, and marketing guidance.",
        "Working capital sanctioned via overdraft/credit limit up to ₹10 Lakhs via RuPay card."
      ],
      hi: [
        "परियोजना की कुल लागत का 75% से 85% तक बैंक ऋण।",
        "सिडबी और अग्रणी बैंकों द्वारा व्यावहारिक मार्गदर्शन एवं प्रशिक्षण।",
        "₹10 लाख तक की कार्यशील पूंजी रुपे कार्ड द्वारा ओवरड्राफ्ट सुविधा।"
      ],
      mr: [
        "प्रकल्प खर्चाच्या ७५% ते ८५% रकमेचे बँक अर्थसाहाय्य.",
        "सिडबी आणि बँकांकडून प्रत्यक्ष मार्गदर्शन व प्रशिक्षण पाठबळ.",
        "रुपे कार्डद्वारे ₹१० लाखांपर्यंत ओव्हरड्राफ्ट खेळते भांडवल."
      ]
    },
    documents: {
      en: [
        "Proof of Identity & Address (Aadhaar, Voter ID, PAN)",
        "Detailed Project Report with cash flow projections",
        "Pollution Control & Municipal permits (where applicable)",
        "Past 6 months bank statement and asset/liability statement"
      ],
      hi: [
        "पहचान एवं निवास प्रमाण (आधार, पैन, वोटर कार्ड)",
        "विस्तृत परियोजना रिपोर्ट एवं 3-माह का वित्तीय ट्रैक रिकॉर्ड",
        "स्थानीय निकाय एवं नगर पालिका अनुमति (यदि लागू हो)",
        "विगत 6 माह का बैंक खाता विवरण"
      ],
      mr: [
        "ओळख व पत्त्याचा पुरावा (आधार, पॅन कार्ड)",
        "तपशीलवार प्रकल्प अहवाल आणि ३-महिन्यांचे रोख प्रवाह विवरण",
        "स्थानिक स्वराज्य संस्थेचे परवाने (लागू असल्यास)",
        "मागील ६ महिन्यांचे बँक स्टेटमेंट"
      ]
    },
    applicationProcess: {
      en: [
        "1. Visit www.standupmitra.in portal.",
        "2. Register as a Woman Entrepreneur trainee/applicant.",
        "3. Fill out the application form with project details and select preferred bank branch.",
        "4. SIDBI / Lead Bank officer connects to coordinate appraisal and sanction."
      ],
      hi: [
        "1. आधिकारिक पोर्टल www.standupmitra.in पर जाएं।",
        "2. महिला उद्यमी आवेदक के रूप में पंजीकरण करें।",
        "3. प्रोजेक्ट विवरण भरें और अपनी पसंदीदा बैंक शाखा चुनें।",
        "4. सिडबी / लीड बैंक अधिकारी द्वारा परियोजना का मूल्यांकन कर ऋण स्वीकृत किया जाता है।"
      ],
      mr: [
        "१. अधिकृत पोर्टल www.standupmitra.in वर जा.",
        "२. महिला उद्योजिका म्हणून नोंदणी करा.",
        "३. प्रकल्पाचा तपशील भरा आणि पसंतीची बँक शाखा निवडा.",
        "४. सिडबी / अग्रणी बँक अधिकारी तपासणी करून कर्ज मंजूर करतात."
      ]
    },
    officialUrl: "https://www.standupmitra.in/",
    verifiedDate: {
      en: "October 2026",
      hi: "अक्टूबर 2026",
      mr: "ऑक्टोबर २०२६"
    },
    badge: {
      en: "For Larger Scale Business Expansion",
      hi: "बड़े पैमाने पर व्यापार विस्तार हेतु",
      mr: "मोठ्या व्यवसाय विस्तारासाठी"
    }
  }
];

export const standardDocumentsList = [
  { 
    id: "aadhaar", 
    label: {
      en: "Aadhaar Card (Linked with active mobile for OTP)",
      hi: "आधार कार्ड (ओटीपी हेतु सक्रिय मोबाइल नंबर से लिंक)",
      mr: "आधार कार्ड (OTP पडताळणीसाठी मोबाईल नंबर लिंक असलेले)"
    }, 
    mandatory: true 
  },
  { 
    id: "pan", 
    label: {
      en: "PAN Card",
      hi: "पैन कार्ड",
      mr: "पॅन कार्ड"
    }, 
    mandatory: true 
  },
  { 
    id: "passbook", 
    label: {
      en: "Bank Account Passbook / 6-Month Account Statement",
      hi: "बैंक खाता पासबुक / 6 माह का बैंक स्टेटमेंट",
      mr: "बँक खाते पासबुक / ६ महिन्यांचे बँक स्टेटमेंट"
    }, 
    mandatory: true 
  },
  { 
    id: "business_proof", 
    label: {
      en: "Business Proof (Udyam Registration / Shop Act / Order receipts / Photo of workplace)",
      hi: "बिज़नेस प्रमाण (उद्यम रजिस्ट्रेशन / दुकान लाइसेंस / ऑर्डर पर्ची / कार्यस्थल की फोटो)",
      mr: "व्यवसाय पुरावा (उद्यम नोंदणी / शॉप ॲक्ट / ऑर्डर पावती / कामाच्या जागेचा फोटो)"
    }, 
    mandatory: true 
  },
  { 
    id: "address_proof", 
    label: {
      en: "Address Proof (Ration Card / Electricity Bill)",
      hi: "पते का प्रमाण (राशन कार्ड / बिजली बिल)",
      mr: "पत्त्याचा पुरावा (रेशन कार्ड / वीज बिल)"
    }, 
    mandatory: true 
  },
  { 
    id: "photos", 
    label: {
      en: "Two Passport-size Photographs",
      hi: "2 पासपोर्ट साइज़ फोटो",
      mr: "२ पासपोर्ट आकाराचे फोटो"
    }, 
    mandatory: true 
  },
  { 
    id: "khata_statement", 
    label: {
      en: "Khata se Credit Tak 3-Month Bank-Ready Statement",
      hi: "खाता से क्रेडिट तक 3-माह का बैंक-रेडी स्टेटमेंट",
      mr: "खाता से क्रेडिट तक ३-महिन्यांचे बँक-रेडी स्टेटमेंट"
    }, 
    mandatory: true 
  },
  { 
    id: "quotation", 
    label: {
      en: "Item / Machinery Quotation (if applying for machinery or raw material purchase)",
      hi: "मशीनरी, उपकरण या कच्चे माल का कोटेशन (यदि लागू हो)",
      mr: "मशिनरी, उपकरण किंवा कच्च्या मालाचे कोटेशन (लागू असल्यास)"
    }, 
    mandatory: false 
  }
];

