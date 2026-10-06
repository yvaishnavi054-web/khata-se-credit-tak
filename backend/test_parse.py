import re
import sys
import datetime
import json
sys.stdout.reconfigure(encoding='utf-8')

NUMBER_WORDS = {
    "दोन": 2, "दो": 2, "तीन": 3, "चार": 4, "पाच": 5, "पांच": 5,
    "सहा": 6, "छह": 6, "सात": 7, "आठ": 8, "नऊ": 9, "नौ": 9, "दहा": 10, "दस": 10,
    "अकरा": 11, "ग्यारह": 11, "बारा": 12, "बारह": 12, "तेरा": 13, "चौदा": 14, "चौदह": 14,
    "पंधरा": 15, "पंद्रह": 15, "सोळा": 16, "सोलह": 16, "सतरा": 17, "सत्रह": 17,
    "अठरा": 18, "अठारह": 18, "एकोणीस": 19, "उन्नीस": 19, "वीस": 20, "बीस": 20,
    "तीस": 30, "चाळीस": 40, "चालीस": 40, "पन्नास": 50, "पचास": 50,
    "शंभर": 100, "सौ": 100, "दोनशे": 200, "दो सौ": 200, "तीनशे": 300, "तीन सौ": 300,
    "चारशे": 400, "चार सौ": 400, "पाचशे": 500, "पाँच सौ": 500, "सहाशे": 600, "छह सौ": 600,
    "सातशे": 700, "आठशे": 800, "नऊशे": 900, "हजार": 1000, "हज़ार": 1000,
}

SALE_ITEMS = [
    {"keywords": ["डबे", "डबा", "डब्बे", "डब्बा", "टिफिन", "tiffin", "tiffins", "meal", "meals", "thali"], "name": "डबे / Tiffins", "category": "Meals"},
    {"keywords": ["केक", "पेस्ट्री", "cake", "cakes", "pastry"], "name": "केक / Cakes", "category": "Bakery Sales"},
    {"keywords": ["ब्लाउज", "ब्लाउझ", "blouse", "blouses"], "name": "ब्लाउज शिवण / Blouse Stitching", "category": "Tailoring Orders"},
    {"keywords": ["ड्रेस", "कुर्ती", "सूट", "dress", "kurti", "suit"], "name": "ड्रेस शिवण / Dress Stitching", "category": "Tailoring Orders"},
    {"keywords": ["फेशियल", "मेकअप", "facial", "makeup"], "name": "सेवा / Parlour Service", "category": "Parlour Services"},
    {"keywords": ["पिशव्या", "बॅग", "हस्तकला", "bag", "bags"], "name": "हस्तकला / Handcrafted Items", "category": "Handicrafts"},
    {"keywords": ["ऑर्डर", "order", "orders", "बिक्री", "विक्री", "सेल", "sale"], "name": "व्यवसाय विक्री / Sales", "category": "Sales"}
]

EXPENSE_ITEMS = [
    {"keywords": ["सब्जी", "सब्ज़ी", "भाजी", "भाजीपाला", "vegetable", "vegetables", "veggies"], "name": "भाजी / Vegetables", "category": "Grocery"},
    {"keywords": ["गेहूं", "गहू", "wheat", "grain", "grains"], "name": "गहू / Wheat", "category": "Grocery"},
    {"keywords": ["आटा", "पीठ", "flour", "atta"], "name": "पीठ / Flour", "category": "Grocery"},
    {"keywords": ["चावल", "तांदूळ", "rice"], "name": "तांदूळ / Rice", "category": "Grocery"},
    {"keywords": ["तेल", "oil", "cooking oil"], "name": "तेल / Oil", "category": "Grocery"},
    {"keywords": ["गॅस", "गैस", "gas", "cylinder"], "name": "गॅस / Gas Cylinder", "category": "Utilities"},
    {"keywords": ["मसाला", "मसाले", "spices"], "name": "मसाले / Spices", "category": "Grocery"},
    {"keywords": ["कापड", "कपड़ा", "fabric", "cloth"], "name": "कापड / Fabric", "category": "Raw Material"},
    {"keywords": ["धागा", "दौरा", "thread", "threads"], "name": "धागा / Thread", "category": "Supplies"},
    {"keywords": ["अस्तर", "lining"], "name": "अस्तर / Lining Material", "category": "Supplies"},
    {"keywords": ["लेस", "बटन", "buttons", "lace", "zip"], "name": "लेस आणि बटणे / Accessories", "category": "Supplies"},
    {"keywords": ["क्रीम", "लोशन", "cream", "cosmetics"], "name": "कॉस्मेटिक्स / Cosmetics", "category": "Supplies"},
    {"keywords": ["सामान", "मटेरियल", "material", "raw material"], "name": "कच्चा माल / Raw Material", "category": "Supplies"}
]

def parse_business_speech(raw_text: str):
    today_str = datetime.date.today().isoformat()
    # Normalize punctuation and currency symbols
    cleaned = raw_text.replace('₹', ' ₹ ').replace('?', ' . ').replace('।', ' . ').replace('!', ' . ').replace(',', ' , ')
    
    # Replace Marathi/Hindi word numbers, except standalone 'एक' which might mean 'each'
    norm = cleaned
    for w, val in NUMBER_WORDS.items():
        norm = re.sub(r'\b' + re.escape(w) + r'\b', str(val), norm, flags=re.IGNORECASE)
    
    # Split into potential clauses
    clauses = [c.strip() for c in re.split(r'[.;।\n]+', norm) if c.strip()]
    
    transactions = []
    
    # Check for: Quantity + Item + [sold/निकले/विकले/etc] + Unit Rate
    # Pattern 1: '30 डब्बे निकले . एक डब्बा 50' or '30 डब्बे निकले 50 का एक' or '20 डबे विकले, 70 रुपये का एक'
    full_text = " ".join(clauses)
    
    # Pattern A: '30 डब्बे निकले ... एक डब्बा 50' or '30 डबे ... एक डबा 50'
    m_rate_after = re.search(
        r'(\d+)\s*(डबे|डबा|डब्बे|डब्बा|टिफिन|केक|ब्लाउज|tiffins?|cakes?|blouses?)[^\d]*?(?:निकले|निकला|गए|गया|विकले|गेले|बेचे|दिले|दिए|sold|dispatched)?[^\d]*?(?:एक|प्रति|प्रत्येक|दर)\s*(?:डबे|डबा|डब्बे|डब्बा|टिफिन|केक|ब्लाउज|tiffin|piece|नग)?\s*(?:₹|रुपये|रु)?\s*(\d+)',
        full_text,
        re.IGNORECASE
    )
    
    # Pattern B: '20 डबे विकले, 70 रुपये का एक' or '20 tiffins sold, 70 each'
    m_rate_each = re.search(
        r'(\d+)\s*(डबे|डबा|डब्बे|डब्बा|टिफिन|केक|ब्लाउज|tiffins?|cakes?|blouses?)[^\d]*?(?:निकले|निकला|गए|गया|विकले|गेले|बेचे|दिले|दिए|sold|dispatched)?[^\d]*?(\d+)\s*(?:₹|रुपये|रु)?\s*(?:का\s*एक|रुपये\s*एक|रुपये\s*का\s*एक|प्रत्येकी|प्रत्येक|each|per)',
        full_text,
        re.IGNORECASE
    )
    
    sale_span = None
    sale_qty = 0
    sale_unit_p = 0.0
    sale_item_name = "डबे / Tiffins"
    sale_cat = "Meals"
    
    if m_rate_after:
        sale_qty = int(m_rate_after.group(1))
        sale_unit_p = float(m_rate_after.group(3))
        raw_item = m_rate_after.group(2)
        sale_span = m_rate_after.span()
        for si in SALE_ITEMS:
            if any(k in raw_item.lower() for k in si["keywords"]):
                sale_item_name = si["name"]
                sale_cat = si["category"]
                break
    elif m_rate_each:
        sale_qty = int(m_rate_each.group(1))
        sale_unit_p = float(m_rate_each.group(3))
        raw_item = m_rate_each.group(2)
        sale_span = m_rate_each.span()
        for si in SALE_ITEMS:
            if any(k in raw_item.lower() for k in si["keywords"]):
                sale_item_name = si["name"]
                sale_cat = si["category"]
                break
                
    if sale_qty > 0 and sale_unit_p > 0:
        total_amt = round(sale_qty * sale_unit_p, 2)
        transactions.append({
            "type": "sale",
            "category": sale_cat,
            "description": f"{sale_qty} × {sale_item_name} (₹{int(sale_unit_p)} each)",
            "quantity": sale_qty,
            "unit_price": sale_unit_p,
            "amount": total_amt,
            "date": today_str
        })
        
    # Now find Expenses:
    # Text excluding matched sale:
    exp_text = full_text
    if sale_span:
        exp_text = full_text[:sale_span[0]] + " " + full_text[sale_span[1]:]
        
    found_expenses = []
    
    # 1. Item-specific expenses (e.g. 600 रुपये की सब्जी, 450 रुपये का गेहूं)
    for ei in EXPENSE_ITEMS:
        for kw in ei["keywords"]:
            # Pattern: 600 [रुपये] [की] सब्जी OR सब्जी [का/साठी] 600 [रुपये]
            m1 = re.search(r'(\d+)\s*(?:रुपये|रु|₹)?\s*(?:की|का|साठी|चे)?\s*' + re.escape(kw), exp_text, re.IGNORECASE)
            m2 = re.search(re.escape(kw) + r'[^\d]*?(\d+)', exp_text, re.IGNORECASE)
            amt = None
            if m1:
                amt = float(m1.group(1))
            elif m2:
                amt = float(m2.group(1))
                
            if amt and amt > 0 and not any(e["description"] == ei["name"] for e in found_expenses):
                found_expenses.append({
                    "type": "expense",
                    "category": ei["category"],
                    "description": ei["name"],
                    "quantity": None,
                    "unit_price": None,
                    "amount": amt,
                    "date": today_str
                })
                break
                
    # 2. Generic expense (e.g. 'खर्च ₹500' or 'खर्च 500' or '500 खर्च')
    if not found_expenses:
        m_generic = re.search(r'(?:खर्च|खर्चा|spent|paid|cost)\s*(?:₹|रुपये|रु)?\s*(\d+)', exp_text, re.IGNORECASE)
        if not m_generic:
            m_generic = re.search(r'(\d+)\s*(?:₹|रुपये|रु)?\s*(?:खर्च|खर्चा|spent|paid)', exp_text, re.IGNORECASE)
        if m_generic:
            amt = float(m_generic.group(1))
            found_expenses.append({
                "type": "expense",
                "category": "General Expenses",
                "description": "खर्च / Business Expense",
                "quantity": None,
                "unit_price": None,
                "amount": amt,
                "date": today_str
            })
            
    transactions.extend(found_expenses)
    return transactions

t1 = "आज 30 डब्बे निकले। एक डब्बा ₹50? खर्च ₹500।"
print("=== Test 1 ===")
print("Input:", t1)
print(json.dumps(parse_business_speech(t1), indent=2, ensure_ascii=False))

t2 = "आज 20 डबे विकले, 70 रुपये का एक. 600 रुपये की सब्जी और 450 रुपये का गेहूं लाया."
print("\n=== Test 2 ===")
print("Input:", t2)
print(json.dumps(parse_business_speech(t2), indent=2, ensure_ascii=False))
