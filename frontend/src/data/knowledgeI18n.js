export const KNOWLEDGE_TRANSLATIONS = {
  en: {
    flashcards: [
      { term: "Moisture Content & WVTR", category: "Moisture & Water", meaning: "Water Vapor Transmission Rate (WVTR) is critical for preventing dehydration in fresh produce and sogginess in dry goods. A high WVTR lets moisture escape.", range: "15-30 g/m²/day for breathable films", param: "?commodityType=freshProduce" },
      { term: "Respiration Rate & OTR", category: "Gas & Respiration", meaning: "Oxygen Transmission Rate (OTR) balances the respiration of living tissues (like apples) to prevent anaerobic fermentation. High respiration requires high OTR.", range: "10,000+ cc/m²/day for fresh produce", param: "?commodityType=freshProduce" },
      { term: "pH Level", category: "Chemical Properties", meaning: "Acidity (low pH) slows bacterial growth but can corrode certain packaging (like metal). Neutral pH foods need higher barrier protection.", range: "Acidic (pH < 4.5) vs Neutral", param: "?commodityType=meatPoultry" },
      { term: "Oil/Fat Content", category: "Chemical Properties", meaning: "High oil content requires packaging that resists fat migration to prevent structural weakening or greasiness.", range: "High (>20%) vs Low", param: "?commodityType=snacks" },
      { term: "Shelf Life & Temperature", category: "Storage & Shelf Life", meaning: "The Q10 temperature coefficient dictates that every 10°C increase roughly halves shelf life. Chilled storage extends shelf life but requires anti-fog films.", range: "Chilled (4°C) vs Ambient (20°C)", param: "?commodityType=dairy" }
    ],
    categories: {
      "All": "All",
      "Moisture & Water": "Moisture & Water",
      "Gas & Respiration": "Gas & Respiration",
      "Chemical Properties": "Chemical Properties",
      "Storage & Shelf Life": "Storage & Shelf Life"
    },
    ui: {
      tapToFlip: "(Tap to flip)",
      typicalRange: "Typical Range",
      seeInEngine: "Where you'll see this in Engine"
    }
  },
  hi: {
    flashcards: [
      { term: "Moisture Content & WVTR", category: "नमी (Moisture)", meaning: "WVTR (Water Vapor Transmission Rate) यह तय करता है कि पैकेजिंग से कितनी नमी बाहर निकल सकती है। ताजे फलों के लिए उच्च WVTR जरूरी है ताकि वे सड़ें नहीं, जबकि सूखे स्नैक्स के लिए कम WVTR चाहिए।", range: "हवादार फिल्म के लिए 15-30 g/m²/day", param: "?commodityType=freshProduce" },
      { term: "Respiration Rate & OTR", category: "गैस और हवा (Gas)", meaning: "OTR (Oxygen Transmission Rate) से पता चलता है कि उत्पाद को कितनी ऑक्सीजन मिल रही है। ताजी सब्जियों को सांस लेने के लिए उच्च OTR की आवश्यकता होती है।", range: "ताजे उत्पाद के लिए 10,000+ cc/m²/day", param: "?commodityType=freshProduce" },
      { term: "pH Level", category: "रासायनिक गुण", meaning: "एसिडिटी (कम pH) बैक्टीरिया को रोकती है लेकिन कुछ पैकेट (जैसे धातु) को खराब कर सकती है। न्यूट्रल pH वाले खाने को ज्यादा सुरक्षित पैकिंग की जरूरत होती है।", range: "एसिडिक (pH < 4.5) vs न्यूट्रल", param: "?commodityType=meatPoultry" },
      { term: "Oil/Fat Content", category: "रासायनिक गुण", meaning: "अधिक तेल वाले उत्पादों के लिए ऐसी पैकिंग चाहिए जिससे तेल बाहर न रिस सके और पैकेट कमजोर न पड़े।", range: "उच्च (>20%) vs निम्न", param: "?commodityType=snacks" },
      { term: "Shelf Life & Temperature", category: "स्टोरेज (Storage)", meaning: "तापमान 10°C बढ़ने पर शेल्फ लाइफ लगभग आधी रह जाती है। ठंडे स्टोरेज में शेल्फ लाइफ बढ़ती है लेकिन एंटी-फॉग (anti-fog) फिल्म की आवश्यकता होती है।", range: "ठंडा (4°C) vs सामान्य (20°C)", param: "?commodityType=dairy" }
    ],
    categories: {
      "All": "सभी",
      "Moisture & Water": "नमी (Moisture)",
      "Gas & Respiration": "गैस और हवा (Gas)",
      "Chemical Properties": "रासायनिक गुण",
      "Storage & Shelf Life": "स्टोरेज (Storage)"
    },
    ui: {
      tapToFlip: "(पलटने के लिए टैप करें)",
      typicalRange: "सामान्य रेंज",
      seeInEngine: "इसे इंजन में देखें"
    }
  },
  mr: {
    flashcards: [
      { term: "Moisture Content & WVTR", category: "ओलावा (Moisture)", meaning: "WVTR (Water Vapor Transmission Rate) ठरवते की पॅकेजिंगमधून किती ओलावा बाहेर जाऊ शकतो. ताज्या भाज्यांसाठी जास्त WVTR आवश्यक आहे, तर कोरड्या पदार्थांसाठी कमी WVTR लागतो.", range: "हवेशीर फिल्मसाठी 15-30 g/m²/day", param: "?commodityType=freshProduce" },
      { term: "Respiration Rate & OTR", category: "हवा (Gas)", meaning: "OTR (Oxygen Transmission Rate) मुळे उत्पादनाला किती ऑक्सिजन मिळतो हे समजते. ताज्या फळांना श्वास घेण्यासाठी जास्त OTR लागतो, जेणेकरून ते खराब होणार नाहीत.", range: "ताज्या भाज्यांसाठी 10,000+ cc/m²/day", param: "?commodityType=freshProduce" },
      { term: "pH Level", category: "रासायनिक गुणधर्म", meaning: "आंबटपणा (कमी pH) बॅक्टेरियाची वाढ रोखतो. परंतु न्यूट्रल pH असलेल्या अन्नाला अधिक सुरक्षित पॅकेजिंग लागते.", range: "आंबट (pH < 4.5) vs न्यूट्रल", param: "?commodityType=meatPoultry" },
      { term: "Oil/Fat Content", category: "रासायनिक गुणधर्म", meaning: "जास्त तेल असलेल्या पदार्थांसाठी असे पॅकेजिंग लागते जे तेल बाहेर झिरपू देणार नाही आणि पॅकेट कमकुवत होणार नाही.", range: "जास्त (>20%) vs कमी", param: "?commodityType=snacks" },
      { term: "Shelf Life & Temperature", category: "स्टोरेज (Storage)", meaning: "तापमान 10°C ने वाढल्यास शेल्फ लाईफ निम्मी होते. थंड स्टोरेजमुळे अन्न जास्त काळ टिकते, पण त्यासाठी अँटी-फॉग (anti-fog) फिल्म लागते.", range: "थंड (4°C) vs सामान्य (20°C)", param: "?commodityType=dairy" }
    ],
    categories: {
      "All": "सर्व",
      "Moisture & Water": "ओलावा (Moisture)",
      "Gas & Respiration": "हवा (Gas)",
      "Chemical Properties": "रासायनिक गुणधर्म",
      "Storage & Shelf Life": "स्टोरेज (Storage)"
    },
    ui: {
      tapToFlip: "(उलटण्यासाठी टॅप करा)",
      typicalRange: "सामान्य श्रेणी",
      seeInEngine: "इंजिनमध्ये पहा"
    }
  },
  gu: {
    flashcards: [
      { term: "Moisture Content & WVTR", category: "ભેજ (Moisture)", meaning: "WVTR (Water Vapor Transmission Rate) નક્કી કરે છે કે પેકેજિંગમાંથી કેટલો ભેજ બહાર જઈ શકે છે. તાજા ફળો માટે વધુ WVTR જરૂરી છે જેથી તે સડે નહીં.", range: "હવાઉજાસવાળી ફિલ્મ માટે 15-30 g/m²/day", param: "?commodityType=freshProduce" },
      { term: "Respiration Rate & OTR", category: "હવા (Gas)", meaning: "OTR (Oxygen Transmission Rate) દર્શાવે છે કે ઉત્પાદનને કેટલો ઓક્સિજન મળે છે. તાજી શાકભાજીને શ્વાસ લેવા માટે વધુ OTR ની જરૂર પડે છે.", range: "તાજા ઉત્પાદન માટે 10,000+ cc/m²/day", param: "?commodityType=freshProduce" },
      { term: "pH Level", category: "રાસાયણિક ગુણધર્મો", meaning: "એસિડિટી (ઓછું pH) બેક્ટેરિયાને અટકાવે છે. પરંતુ ન્યુટ્રલ pH વાળા ખોરાકને વધુ સુરક્ષિત પેકિંગની જરૂર છે.", range: "એસિડિક (pH < 4.5) vs ન્યુટ્રલ", param: "?commodityType=meatPoultry" },
      { term: "Oil/Fat Content", category: "રાસાયણિક ગુણધર્મો", meaning: "વધુ તેલ વાળા ઉત્પાદનો માટે એવું પેકિંગ જોઈએ જેમાંથી તેલ બહાર ન નીકળે.", range: "ઉચ્ચ (>20%) vs નિમ્ન", param: "?commodityType=snacks" },
      { term: "Shelf Life & Temperature", category: "સ્ટોરેજ (Storage)", meaning: "તાપમાન 10°C વધવાથી શેલ્ફ લાઇફ અડધી થઈ જાય છે. ઠંડા સ્ટોરેજમાં ખોરાક લાંબો સમય ટકે છે.", range: "ઠંડુ (4°C) vs સામાન્ય (20°C)", param: "?commodityType=dairy" }
    ],
    categories: {
      "All": "બધા",
      "Moisture & Water": "ભેજ (Moisture)",
      "Gas & Respiration": "હવા (Gas)",
      "Chemical Properties": "રાસાયણિક ગુણધર્મો",
      "Storage & Shelf Life": "સ્ટોરેજ (Storage)"
    },
    ui: {
      tapToFlip: "(ફેરવવા માટે ટેપ કરો)",
      typicalRange: "સામાન્ય રેન્જ",
      seeInEngine: "એન્જિનમાં જુઓ"
    }
  },
  pa: {
    flashcards: [
      { term: "Moisture Content & WVTR", category: "ਨਮੀ (Moisture)", meaning: "WVTR (Water Vapor Transmission Rate) ਤੈਅ ਕਰਦਾ ਹੈ ਕਿ ਪੈਕਿੰਗ ਵਿੱਚੋਂ ਕਿੰਨੀ ਨਮੀ ਬਾਹਰ ਜਾ ਸਕਦੀ ਹੈ। ਤਾਜ਼ੇ ਫਲਾਂ ਲਈ ਵੱਧ WVTR ਜ਼ਰੂਰੀ ਹੈ।", range: "ਹਵਾਦਾਰ ਫਿਲਮ ਲਈ 15-30 g/m²/day", param: "?commodityType=freshProduce" },
      { term: "Respiration Rate & OTR", category: "ਹਵਾ (Gas)", meaning: "OTR (Oxygen Transmission Rate) ਦੱਸਦਾ ਹੈ ਕਿ ਉਤਪਾਦ ਨੂੰ ਕਿੰਨੀ ਆਕਸੀਜਨ ਮਿਲ ਰਹੀ ਹੈ। ਤਾਜ਼ੀਆਂ ਸਬਜ਼ੀਆਂ ਨੂੰ ਸਾਹ ਲੈਣ ਲਈ ਵੱਧ OTR ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ।", range: "ਤਾਜ਼ੇ ਉਤਪਾਦ ਲਈ 10,000+ cc/m²/day", param: "?commodityType=freshProduce" },
      { term: "pH Level", category: "ਰਸਾਇਣਕ ਗੁਣ", meaning: "ਐਸਿਡਿਟੀ (ਘੱਟ pH) ਬੈਕਟੀਰੀਆ ਨੂੰ ਰੋਕਦੀ ਹੈ। ਪਰ ਨਿਊਟਰਲ pH ਵਾਲੇ ਭੋਜਨ ਨੂੰ ਵਧੇਰੇ ਸੁਰੱਖਿਅਤ ਪੈਕਿੰਗ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ।", range: "ਐਸਿਡਿਕ (pH < 4.5) vs ਨਿਊਟਰਲ", param: "?commodityType=meatPoultry" },
      { term: "Oil/Fat Content", category: "ਰਸਾਇਣਕ ਗੁਣ", meaning: "ਵੱਧ ਤੇਲ ਵਾਲੇ ਉਤਪਾਦਾਂ ਲਈ ਅਜਿਹੀ ਪੈਕਿੰਗ ਚਾਹੀਦੀ ਹੈ ਜਿਸ ਵਿੱਚੋਂ ਤੇਲ ਬਾਹਰ ਨਾ ਨਿਕਲੇ।", range: "ਉੱਚ (>20%) vs ਨਿਮਨ", param: "?commodityType=snacks" },
      { term: "Shelf Life & Temperature", category: "ਸਟੋਰੇਜ (Storage)", meaning: "ਤਾਪਮਾਨ 10°C ਵਧਣ 'ਤੇ ਸ਼ੈਲਫ ਲਾਈਫ ਲਗਭਗ ਅੱਧੀ ਰਹਿ ਜਾਂਦੀ ਹੈ। ਠੰਢੇ ਸਟੋਰੇਜ ਵਿੱਚ ਭੋਜਨ ਲੰਬੇ ਸਮੇਂ ਤੱਕ ਰਹਿੰਦਾ ਹੈ।", range: "ਠੰਡਾ (4°C) vs ਆਮ (20°C)", param: "?commodityType=dairy" }
    ],
    categories: {
      "All": "ਸਾਰੇ",
      "Moisture & Water": "ਨਮੀ (Moisture)",
      "Gas & Respiration": "ਹਵਾ (Gas)",
      "Chemical Properties": "ਰਸਾਇਣਕ ਗੁਣ",
      "Storage & Shelf Life": "ਸਟੋਰੇਜ (Storage)"
    },
    ui: {
      tapToFlip: "(ਪਲਟਣ ਲਈ ਟੈਪ ਕਰੋ)",
      typicalRange: "ਆਮ ਰੇਂਜ",
      seeInEngine: "ਇੰਜਣ ਵਿੱਚ ਦੇਖੋ"
    }
  }
};
