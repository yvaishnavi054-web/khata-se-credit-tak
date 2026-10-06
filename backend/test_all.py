import sys, re, datetime
sys.stdout.reconfigure(encoding='utf-8')

NUMBER_WORDS = {
    'दोन': 2, 'दो': 2, 'तीन': 3, 'चार': 4, 'पाच': 5, 'पांच': 5,
    'सहा': 6, 'छह': 6, 'सात': 7, 'आठ': 8, 'नऊ': 9, 'नौ': 9, 'दहा': 10, 'दस': 10,
    'अकरा': 11, 'ग्यारह': 11, 'बारा': 12, 'बारह': 12, 'तेरा': 13, 'चौदा': 14, 'चौदह': 14,
    'पंधरा': 15, 'पंद्रह': 15, 'सोळा': 16, 'सोलह': 16, 'सतरा': 17, 'सत्रह': 17,
    'अठरा': 18, 'अठारह': 18, 'एकोणीस': 19, 'उन्नीस': 19, 'वीस': 20, 'बीस': 20,
    'तीस': 30, 'चाळीस': 40, 'चालीस': 40, 'पन्नास': 50, 'पचास': 50,
    'शंभर': 100, 'सौ': 100, 'दोनशे': 200, 'दो सौ': 200, 'तीनशे': 300, 'तीन सौ': 300,
    'चारशे': 400, 'चार सौ': 400, 'पाचशे': 500, 'पाँच सौ': 500, 'सहाशे': 600, 'छह सौ': 600,
    'सातशे': 700, 'आठशे': 800, 'नऊशे': 900, 'हजार': 1000, 'हज़ार': 1000
}

CURRENCY_REGEX = r'(?:rupees|rupess|rupes|rupya|rupiya|रुपयांचे|रुपयांचा|रुपयांची|रुपयांच्या|रुपये|रु|₹|rs\.?|inr)'

def normalize_speech_text(text: str) -> str:
    t = text.lower()
    t = t.replace('₹', ' ₹ ').replace('?', ' . ').replace('।', ' . ').replace('!', ' . ').replace(',', ' , ')
    t = re.sub(r'\brupess?\b|\brupes\b|\brupya\b|\brupiya\b|\brs\.?\b|\binr\b', ' rupees ', t)
    t = re.sub(r'\bsolde\b', 'sold', t)
    t = re.sub(r'\bdaba\b', 'dabba', t)
    t = re.sub(r'\btifins?\b', 'tiffin', t)
    t = re.sub(r'\bspended\b|\bspend\b', 'spent', t)
    t = re.sub(r'ब्लाऊज|ब्लाउझ|ब्लाऊझ', 'ब्लाउज', t)

    for w, val in NUMBER_WORDS.items():
        t = re.sub(rf'(?:^|(?<=[^a-zA-Z0-9\u0900-\u097f])){re.escape(w)}(?=[^a-zA-Z0-9\u0900-\u097f]|$)', f' {val} ', t)
    return t

def parse(text: str):
    norm = normalize_speech_text(text)
    today_str = datetime.date.today().isoformat()
    txns = []

    # 1. Rate detection
    rate = None
    rate_span = None

    # Pattern A: '1/one/एक <product> ₹ 400' or '1 dabba at 70'
    m_rateA = re.search(
        rf'(?:(?:^|\s)(?:1|one|एक)\s+([^\d.,!?।]{{1,25}}?)\s*(?:at|@|for|का|चे|ची|च्या|ला|में|प्रती|प्रमाणे)?\s*{CURRENCY_REGEX}?\s*(\d+(?:\.\d+)?))',
        norm
    )
    # Pattern B: '400 प्रमाणे' / '70 रुपये चा एक' / '70 each' / '80 rs per tiffin'
    m_rateB = re.search(
        rf'(\d+(?:\.\d+)?)\s*{CURRENCY_REGEX}?\s*(?:each|per|का\s*एक|चा\s*एक|ची\s*एक|चे\s*एक|प्रत्येकी|प्रती|प्रमाणे)',
        norm
    )
    # Pattern C: 'each 80' / 'per 70' / '@ 50'
    m_rateC = re.search(
        rf'(?:each|per|at|@)\s*{CURRENCY_REGEX}?\s*(\d+(?:\.\d+)?)',
        norm
    )

    if m_rateA:
        rate = float(m_rateA.group(2))
        rate_span = m_rateA.span()
    elif m_rateB:
        rate = float(m_rateB.group(1))
        rate_span = m_rateB.span()
    elif m_rateC:
        rate = float(m_rateC.group(1))
        rate_span = m_rateC.span()

    # 2. Quantity & Product
    qty = None
    product_name = 'वस्तू / Items'
    product_cat = 'Sales'

    KNOWN_ITEMS = [
        ('ब्लाउज / Blouses', ['ब्लाउज', 'blouse', 'blouses'], 'Tailoring Orders'),
        ('ड्रेस / Dresses', ['ड्रेस', 'dress', 'dresses', 'सूट', 'suit', 'suits', 'कुर्ती', 'kurti'], 'Tailoring Orders'),
        ('साड्या / Sarees', ['साडी', 'साड्या', 'saree', 'sarees'], 'Retail Sales'),
        ('डबे / Tiffins', ['डबे', 'डब्बे', 'डब्बा', 'डबा', 'टिफिन', 'tiffin', 'tiffins', 'dabba', 'dabbas', 'थाळी'], 'Meals'),
        ('केक / Cakes', ['केक', 'cake', 'cakes', 'पेस्ट्री', 'pastry'], 'Bakery Sales'),
        ('फेशिअल / Facials', ['फेशिअल', 'facial', 'facials', 'आयब्रो', 'eyebrow'], 'Salon Services'),
    ]

    for disp, syns, cat in KNOWN_ITEMS:
        syn_re = '|'.join(syns)
        # Search all matches for this product
        matches = list(re.finditer(rf'(\d+)\s*(?:of\s*)?({syn_re})(?:\s|[.,!?।]|$)', norm))
        if matches:
            chosen = matches[0]
            if len(matches) > 1 and chosen.group(1) == '1' and int(matches[1].group(1)) > 1:
                chosen = matches[1]
            elif rate_span and rate_span[0] <= chosen.start() and chosen.end() <= rate_span[1] + 5 and chosen.group(1) == '1':
                # If there's another match outside the rate span
                other_matches = [m for m in matches if not (rate_span[0] <= m.start() and m.end() <= rate_span[1] + 5)]
                if other_matches:
                    chosen = other_matches[0]
            qty = int(chosen.group(1))
            product_name = disp
            product_cat = cat
            break

    # If no known item, search verb pattern
    if qty is None:
        m_verb = re.search(
            r'(\d+)\s+([^\d.,!?।]{1,25}?)\s+(?:शिवले|शिवल्या|शिवून दिले|विकले|विकल्या|विकला|विकली|बेचे|बेची|बनाए|बनवले|बनवल्या|दिले|दिल्या|केले|केल्या|तैयार किए|तयार केले|sold|stitched|made|delivered)',
            norm
        )
        if m_verb:
            q_val = int(m_verb.group(1))
            noun = m_verb.group(2).strip()
            qty = q_val
            product_name = f'{noun} / Sales'
            product_cat = 'Sales'

    # If still no qty, search any '<number> sold / beche / vikle'
    if qty is None:
        m_gen_qty = re.search(r'(\d+)\s*(?:items?|units?)?\s*(?:sold|beche|vikle|nikle|दिए|सेल)', norm)
        if m_gen_qty:
            qty = int(m_gen_qty.group(1))

    # Calculate sale
    if qty and rate:
        total = round(qty * rate, 2)
        txns.append({
            'type': 'sale',
            'category': product_cat,
            'description': f'{qty} × {product_name} (₹{int(rate) if rate.is_integer() else rate} each)',
            'quantity': qty,
            'unit_price': rate,
            'amount': total,
            'date': today_str
        })
    elif qty and not rate:
        m_flat = re.search(rf'(\d+(?:\.\d+)?)\s*{CURRENCY_REGEX}?\s*(?:total|me|में|मिले|कमाई|बिक्री|विक्री)', norm)
        if m_flat:
            amt = float(m_flat.group(1))
            txns.append({
                'type': 'sale',
                'category': product_cat,
                'description': f'{qty} × {product_name}',
                'quantity': qty,
                'unit_price': round(amt / qty, 2),
                'amount': amt,
                'date': today_str
            })
    elif rate and not qty:
        txns.append({
            'type': 'sale',
            'category': product_cat,
            'description': f'१ × {product_name}',
            'quantity': 1,
            'unit_price': rate,
            'amount': rate,
            'date': today_str
        })

    # Flat sale fallback
    if not txns:
        m_flat_only = re.search(rf'(\d+(?:\.\d+)?)\s*{CURRENCY_REGEX}?\s*(?:ची\s*विक्री|की\s*बिक्री|सेल|sales|मिले|मिळाले|कमाई)', norm)
        if not m_flat_only:
            m_flat_only = re.search(rf'(?:sales|बिक्री|कमाई|विक्री)\s*(\d+(?:\.\d+)?)', norm)
        if m_flat_only:
            amt = float(m_flat_only.group(1))
            txns.append({
                'type': 'sale',
                'category': 'Sales',
                'description': 'दैनिक विक्री / Daily Sales',
                'quantity': 1,
                'unit_price': amt,
                'amount': amt,
                'date': today_str
            })

    # 3. Detect Itemized Expenses
    EXPENSE_CATEGORIES = [
        ('भाजी / Vegetables', ['vegetables', 'veggies', 'sabzi', 'sabji', 'bhaji', 'भाजी', 'सब्जी', 'भाजीपाला'], 'Grocery'),
        ('गहू / Wheat', ['wheat', 'atta', 'flour', 'गेहूं', 'गहू', 'पीठ'], 'Grocery'),
        ('तेल / Oil', ['oil', 'cooking oil', 'तेल'], 'Grocery'),
        ('मसाले / Spices', ['spices', 'masala', 'मसाला', 'मसाले'], 'Grocery'),
        ('गॅस / Gas Cylinder', ['gas', 'cylinder', 'गॅस', 'गैस'], 'Utilities'),
        ('कापड / Fabric', ['fabric', 'cloth', 'kapda', 'कापड', 'कपड़ा'], 'Raw Material'),
        ('धागा / Thread', ['thread', 'threads', 'धागा'], 'Supplies'),
        ('अस्तर / Lining', ['अस्तर', 'lining', 'astar'], 'Supplies'),
        ('लेस / Lace', ['लेस', 'lace', 'लेसचा'], 'Supplies'),
        ('क्रीम / Cream', ['क्रीम', 'cream'], 'Bakery Supplies'),
        ('मैदा / Flour', ['मैदा', 'maida'], 'Bakery Supplies'),
        ('भाडे / Rent & Travel', ['भाडे', 'भाडा', 'टेम्पो', 'rent', 'auto', 'tempo'], 'Logistics'),
        ('किराणा / Groceries', ['grocery', 'groceries', 'किराणा', 'सामान'], 'Grocery')
    ]

    for disp_name, syns, cat in EXPENSE_CATEGORIES:
        syn_re = '|'.join(syns)
        p1 = rf'(\d+(?:\.\d+)?)\s*{CURRENCY_REGEX}?\s*(?:i\s*)?(?:spent|spend|खर्च|लागत|for|on|की|का|के|चा|चे|ची|च्या)?\s*(?:on\s*)?(?:{syn_re})(?:\s|[.,!?।]|$)'
        p2 = rf'(?:{syn_re})\s*(?:for|cost|worth|of|के|चे|चा)?\s*{CURRENCY_REGEX}?\s*(\d+(?:\.\d+)?)(?:\s|[.,!?।]|$)'
        m1 = re.search(p1, norm)
        m2 = re.search(p2, norm)
        if m1:
            amt = float(m1.group(1))
            if not any(t['amount'] == amt for t in txns):
                txns.append({'type': 'expense', 'category': cat, 'description': disp_name, 'amount': amt, 'date': today_str})
        elif m2:
            amt = float(m2.group(1))
            if not any(t['amount'] == amt for t in txns):
                txns.append({'type': 'expense', 'category': cat, 'description': disp_name, 'amount': amt, 'date': today_str})

    # 4. Generic Expense if no itemized expenses
    if not any(x['type'] == 'expense' for x in txns):
        m_gen = re.search(rf'(\d+(?:\.\d+)?)\s*{CURRENCY_REGEX}?\s*(?:i\s*)?(?:चा|चे|ची|च्या|का|के|की|on|for)?\s*(?:spent|spend|expense|खर्च|लागत)', norm)
        if not m_gen:
            m_gen = re.search(rf'(?:खर्च|खर्चा|expense|spent)\s*{CURRENCY_REGEX}?\s*(\d+(?:\.\d+)?)', norm)
        if m_gen:
            amt = float(m_gen.group(1))
            txns.append({
                'type': 'expense',
                'category': 'Operational',
                'description': 'दैनिक खर्च / Expenses',
                'amount': amt,
                'date': today_str
            })

    return txns

test_sentences = [
    'चार ब्लाऊज शिवले. एक ब्लाऊज ₹400. ₹300 खर्च झाला.',
    '3 ड्रेस शिवले 600 प्रमाणे. 500 रुपयांचे अस्तर आणि धागा आणला.',
    'एक ब्लाउज 350 रुपये. आज 5 ब्लाऊज शिवून दिले. 200 रुपये लेस चा खर्च.',
    'आज 20 डबे विकले, 70 रुपये का एक. 600 रुपये की सब्जी और 450 रुपये का गेहूं लाया.',
    'if 1 dabba at 70 rupess like then 20 tiffin i solde total 300 i spend on vegetables',
    '2 केक बनवले 400 चा एक. 250 रुपयांचे क्रीम आणि मैदा आणला.',
    'आज 3 फेशिअल केले 500 प्रमाणे. 400 चा सामान खर्च.',
    'आज 15 साड्या विकल्या, 800 रुपये ची एक. टेम्पो भाडे 500 रुपये खर्च.',
    'आज 3500 ची विक्री झाली आणि 1200 चा खर्च झाला.',
    'stitched 4 blouses for 400 each and spent 300 on thread'
]

for s in test_sentences:
    print('INPUT:', s)
    res = parse(s)
    inc = sum(t['amount'] for t in res if t['type'] == 'sale')
    exp = sum(t['amount'] for t in res if t['type'] == 'expense')
    print(f' => Income: ₹{inc}, Expense: ₹{exp}, Net Profit: ₹{inc - exp}')
    for t in res:
        print(f"    [{t['type']}] {t['description']}: ₹{t['amount']}")
    print('-'*50)
