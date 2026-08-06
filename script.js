// 10 題認識語言治療師的題目資料庫
const quizData = [
  {
    id: 1,
    question: "語言治療師平常到底在做什麼？",
    optionA: "透過評估、治療與訓練，協助個案改善溝通、語言、說話、聲音與吞嚥等能力。",
    optionB: "陪個案聊天、練習說話，偶爾唱唱歌、玩玩遊戲，讓他們「多講一點」藉此機會持續進步。",
    correct: "A",
    explanation: "語言治療是一門嚴謹的醫療專業。治療師的日常絕非只是單純的陪聊，而是需要精確的臨床評估、制定系統性的計畫，來幫助個案重建溝通與吞嚥功能！",
    meme: "🤦 學生想像的語言治療師：\n🧸 陪你聊天 + 🗣️ 教你講話 + 🎤 帶你唱歌\n\n💪 真正的語言治療師：\n🔬 專業臨床推理 + 📈 制定科學治療目標 + 👅 吞嚥與發聲功能訓練"
  },
  {
    id: 2,
    question: "語言治療師主要服務哪些族群？",
    optionA: "從嬰幼兒、兒童到成人及高齡者都有可能，服務內容會依年齡、疾病、發展狀況與功能需求而有所不同。",
    optionB: "以兒童與發展階段的語言溝通問題為主要服務對象，成人個案則多集中在神經疾病或重大疾病後的語言與吞嚥問題。",
    correct: "A",
    explanation: "語言治療的服務對象是「全年齡層 (0-100歲)」。從新生兒的餵食困難、兒童的發展遲緩，到成人的中風失語症，再到老年人的吞嚥與退化問題，都是語言治療師的守備範圍！",
    meme: "👶 嬰幼兒 (餵食與早療) ➔ 👧 兒童 (構音與語言發展) ➔ 👨 成人 (嗓音與口吃) ➔ 👵 長者 (吞嚥與認知溝通)\n💡 沒錯！我們守護的是人的一生中「溝通與享受美食」的權利！"
  },
  {
    id: 3,
    question: "語言治療師處理的問題，主要是「語言」嗎？",
    optionA: "是。語言是語言治療的核心，因此主要處理理解、表達、詞彙、句子與溝通能力，其他問題則依個案狀況延伸處理。",
    optionB: "不完全是。除了語言之外，還可能涉及構音／說話、嗓音、流暢、社交溝通以及吞嚥等功能。",
    correct: "B",
    explanation: "「語言」與「說話」在專業上是不同的概念！語言治療師除了處理語言（大腦理解與表達）之外，也處理說話（構音、口吃、嗓音）以及「吞嚥」（安全進食）等多元生理與社交溝通功能。",
    meme: "💬 語言 (Language)：腦袋裡的詞彙與語法理解\n🗣️ 說話 (Speech)：肌肉發出的聲音與流暢度\n🍽️ 吞嚥 (Swallowing)：食物從口中送入胃的生理過程\n🔥 兩者皆是語言治療師的核心專業！"
  },
  {
    id: 4,
    question: "語言治療師與心理師、職能治療師等專業最大的差異是什麼？",
    optionA: "語言治療師主要處理語言與溝通相關功能，其他專業則依各自的訓練領域提供心理、認知、動作或生活功能上的協助。",
    optionB: "語言治療師雖然有自己的專業範圍，但實際臨床上常與心理師、職能治療師、物理治療師及醫師合作，共同處理個案的整體需求。",
    correct: "A",
    explanation: "這題是個「陷阱題」，兩者在臨床上都對。但題目問的是「最大的差異（核心專業）」，因此 A 才是正解。語言治療師的核心在於「語言與溝通/吞嚥」，而 B 描述的是「跨專業協作」，並非兩者本質的差異。",
    meme: "🧠 心理師：專注於心智、情緒與認知調整\n🖐️ 職能治療師 (OT)：專注於生活適應、手部精細動作與感覺統合\n🗣️ 語言治療師 (SLP)：專注於語言、口語溝通、發聲與吞嚥"
  },
  {
    id: 5,
    question: "語言治療師畢業後，通常會在哪些地方工作？",
    optionA: "主要以醫院及醫療院所為核心，之後再依個人專長延伸至學校、早療、長照等不同服務體系。",
    optionB: "工作場域相當多元，除了醫院與診所，也可能進入學校、早療、長照及其他相關機構，並依場域接觸不同年齡與類型的個案。",
    correct: "B",
    explanation: "大一新生常以為畢業後只能待在醫院。實際上，語言治療師的工作場域極度多元，包含特教學校、早期療育機構、行動長照團隊、行動不便個案的居家服務，甚至是自行開設治療所！",
    meme: "🏥 醫院/診所 (醫療系統) \n🏫 幼兒園/特教學校 (教育系統)\n🏡 長照機構/居家服務 (社福系統)\n👐 語言治療所 (私人執業)\n💡 畢業後，你不一定只有穿白袍這一條路！"
  },
  {
    id: 6,
    question: "如果兒童在治療過程中不太願意配合，語言治療師通常會怎麼做？",
    optionA: "先建立關係與動機，再將治療目標融入遊戲、活動或兒童感興趣的情境中，讓孩子在參與活動的過程中完成治療。",
    optionB: "先透過遊戲或互動活動建立參與意願，再逐步轉換到較具結構性的語言訓練，讓孩子同時兼顧治療目標與學習規律。",
    correct: "A",
    explanation: "對兒童來說，「遊戲本身就是治療的媒介」。語言治療並非「先玩一下，再上課」，而是將治療目標完美包裝在遊戲中。當孩子玩得開心時，他其實已經在進行高強度的語言訓練了！",
    meme: "❌ 錯誤觀念：先陪你玩 10 分鐘，接著拿出課本嚴肅上課 30 分鐘。\n✅ 專業玩法：將「發音練習」融入「戳戳樂遊戲」，讓孩子在邊玩邊笑中，不知不覺練習了 50 次目標發音！"
  },
  {
    id: 7,
    question: "語言治療師如何知道個案「到底出了什麼問題」？",
    optionA: "透過晤談、觀察、標準化或非標準化評估、測驗與臨床分析，了解個案的能力與困難，再進行治療規劃。",
    optionB: "聽他講幾句話就知道了，畢竟語言治療師耳朵很專業，通常「聽一下就知道哪裡怪怪的」。",
    correct: "A",
    explanation: "語言治療是基於實證醫學。我們絕非只憑「感覺」或隨便聽兩句下診斷，而是透過國際或本土標準化評估工具、個案史晤談、跨領域報告，再進行精密的臨床推理與分析。",
    meme: "👂 學生想像的治療師：「嗯……聽你講這句，你構音異常喔！」(人形語音辨識器？)\n📝 真正的語言治療師：晤談 + 標準化量表測驗 + 口語樣本分析 + 口腔結構檢查 ➔ 綜合臨床診斷"
  },
  {
    id: 8,
    question: "語言治療師怎麼決定「要怎麼治療」？",
    optionA: "根據評估結果、個案需求、能力、生活情境與治療目標，設計個別化的治療計畫。",
    optionB: "有一套「語言治療萬用招式」，看到什麼問題就照表操課，大家一起念、一起說、一起練就好了。",
    correct: "A",
    explanation: "每個個案都是獨一無二的！語言治療沒有「萬用偏方」。治療師必須針對個案的興趣、家庭支持度、生理限制等，客製化設計「個別化治療計畫 (IEP)」，才能發揮最大成效。",
    meme: "❌ 語言治療師萬能咒語：「來，跟我念一次！」、「對，再念一次！」\n✅ 實證治療金字塔：\nAssessment (評估) ➔ Reasoning (推理) ➔ Goal Setting (設定目標) ➔ Intervention (客製化介入) ➔ Re-evaluation (再評估)"
  },
  {
    id: 9,
    question: "語言治療師除了「做治療」之外，還要做什麼？",
    optionA: "還需要進行評估、撰寫紀錄、擬定治療計畫、追蹤成效，並與家屬、教師及其他專業人員溝通合作。",
    optionB: "只要把治療做好就好了，其他就是行政人員或家長的事情；治療師下課就可以收工。",
    correct: "A",
    explanation: "臨床工作只是語言治療師的一小部分。撰寫病歷紀錄、跨專業團隊會議、與家長進行衛教與家庭作業諮詢、製作客製化教具，這些隱形工作往往佔據了治療師許多心力。",
    meme: "🧸 學生想像的語言治療師：跟小孩玩 ➔ 陪大人聊天 ➔ 準時打卡下班\n💻 真正的語言治療師：治療 ➔ 寫紀錄 ➔ 製作教材 ➔ 家長諮詢 ➔ 與醫師/老師開會 ➔ 繼續寫病歷"
  },
  {
    id: 10,
    question: "語言治療系畢業後，職涯發展通常是什麼樣子？",
    optionA: "多數畢業生會以醫院或診所的臨床工作為主要發展方向，再依累積的臨床經驗選擇兒童、成人、聲音、吞嚥等專業領域。",
    optionB: "畢業後可以依興趣與專業能力選擇不同服務場域與族群，例如醫院、診所、學校、早療、長照等，並在工作中逐步建立自己的專業方向。",
    correct: "B",
    explanation: "大一新生的職涯想像常侷限於醫院。其實語言治療系的出路非常有彈性，你可以在早療中心成為明星治療師，也可以在長照體系深入社區，甚至在科技業參與語音辨識、AAC 輔具開發，職涯廣度超乎想像！",
    meme: "🚀 傳統路線：畢業 ➔ 進入醫院復健科 ➔ 升任資深治療師\n🌈 現代多元路線：醫療臨床、特教學校支援、社區長照機構、自行創業開設治療所、AI 語音科技顧問"
  }
];

// SVG 插圖庫 - 採用 Corporate Memphis 風格 (扁平、無陰影、鄰近色、俏皮幾何造型)
const illustLibrary = {
  q1_A: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="30" width="140" height="120" rx="20" fill="#E6F0FA"/>
    <circle cx="150" cy="50" r="15" fill="#FFF5E1"/>
    <rect x="60" y="50" width="80" height="90" rx="8" fill="#FFFFFF" stroke="#1A202C" stroke-width="3"/>
    <rect x="80" y="42" width="40" height="15" rx="4" fill="#FADADD" stroke="#1A202C" stroke-width="3"/>
    <line x1="80" y1="80" x2="120" y2="80" stroke="#1A202C" stroke-width="3" stroke-linecap="round"/>
    <line x1="80" y1="100" x2="110" y2="100" stroke="#1A202C" stroke-width="3" stroke-linecap="round"/>
    <line x1="80" y1="120" x2="115" y2="120" stroke="#1A202C" stroke-width="3" stroke-linecap="round"/>
    <path d="M70 77 L73 80 L79 74" fill="none" stroke="#4DB380" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M70 97 L73 100 L79 94" fill="none" stroke="#4DB380" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M45 120 L48 123 L45 126 L42 123 Z" fill="#E8BF6C"/>
  </svg>`,
  
  q1_B: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="30" width="140" height="120" rx="20" fill="#FADADD"/>
    <path d="M60 140 C60 90, 140 90, 140 140" fill="none" stroke="#1A202C" stroke-width="3"/>
    <rect x="85" y="60" width="30" height="50" rx="15" fill="#E6F0FA" stroke="#1A202C" stroke-width="3"/>
    <line x1="85" y1="85" x2="115" y2="85" stroke="#1A202C" stroke-width="2"/>
    <path d="M80 80 C80 110, 120 110, 120 80" fill="none" stroke="#1A202C" stroke-width="3"/>
    <line x1="100" y1="110" x2="100" y2="130" stroke="#1A202C" stroke-width="3"/>
    <line x1="85" y1="130" x2="115" y2="130" stroke="#1A202C" stroke-width="3"/>
    <path d="M140 55 A 5 5 0 1 1 135 60 L 135 40 L 150 45 L 150 60 A 5 5 0 1 1 145 65" fill="#1A202C" stroke="#1A202C" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="50" cy="60" r="10" fill="#FFF5E1"/>
  </svg>`,

  q2_A: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#FFF5E1"/>
    <circle cx="50" cy="85" r="18" fill="#FADADD" stroke="#1A202C" stroke-width="3"/>
    <path d="M45 80 L55 80 M50 75 L50 85" stroke="#1A202C" stroke-width="2"/>
    <rect x="85" y="70" width="30" height="50" rx="15" fill="#E6F0FA" stroke="#1A202C" stroke-width="3"/>
    <circle cx="100" cy="55" r="12" fill="#AC8AD8" stroke="#1A202C" stroke-width="3"/>
    <path d="M135 70 C135 60, 155 60, 155 70 L155 110" fill="none" stroke="#1A202C" stroke-width="3" stroke-linecap="round"/>
    <circle cx="150" cy="115" r="8" fill="#4DB380"/>
  </svg>`,

  q2_B: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#F3E8FF"/>
    <rect x="50" y="90" width="40" height="40" rx="6" fill="#FFF5E1" stroke="#1A202C" stroke-width="3"/>
    <text x="63" y="118" font-size="24" font-weight="900" fill="#1A202C">A</text>
    <rect x="95" y="90" width="40" height="40" rx="6" fill="#FADADD" stroke="#1A202C" stroke-width="3"/>
    <text x="108" y="118" font-size="24" font-weight="900" fill="#1A202C">B</text>
    <polygon points="85,50 60,90 110,90" fill="#E6F0FA" stroke="#1A202C" stroke-width="3"/>
  </svg>`,

  q3_A: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#E6F0FA"/>
    <rect x="45" y="60" width="110" height="60" rx="12" fill="#FFFFFF" stroke="#1A202C" stroke-width="3"/>
    <path d="M130 120 L140 135 L145 120" fill="#FFFFFF" stroke="#1A202C" stroke-width="3" stroke-linejoin="round"/>
    <text x="60" y="97" font-size="28" font-weight="900" fill="#1A202C">A B C</text>
  </svg>`,

  q3_B: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#FFF5E1"/>
    <path d="M40 90 L55 70 L70 110 L85 80 L100 100 L115 90" fill="none" stroke="#1A202C" stroke-width="4" stroke-linecap="round"/>
    <rect x="130" y="65" width="30" height="55" rx="6" fill="#FFFFFF" stroke="#1A202C" stroke-width="3"/>
    <line x1="130" y1="85" x2="160" y2="85" stroke="#7F9FCA" stroke-width="3"/>
    <path d="M140 65 L155 45" stroke="#E29B9B" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  q4_A: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#FADADD"/>
    <circle cx="55" cy="100" r="20" fill="#FFFFFF" stroke="#1A202C" stroke-width="3"/>
    <circle cx="145" cy="100" r="20" fill="#FFFFFF" stroke="#1A202C" stroke-width="3"/>
    <path d="M75 90 Q100 70 125 90" fill="none" stroke="#E8BF6C" stroke-width="5" stroke-linecap="round"/>
    <rect x="80" y="45" width="40" height="25" rx="6" fill="#E6F0FA" stroke="#1A202C" stroke-width="2"/>
    <text x="92" y="62" font-size="12" font-weight="900" fill="#1A202C">SLP</text>
  </svg>`,

  q4_B: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#F3E8FF"/>
    <circle cx="85" cy="80" r="32" fill="#FADADD" fill-opacity="0.8" stroke="#1A202C" stroke-width="3"/>
    <circle cx="115" cy="80" r="32" fill="#E6F0FA" fill-opacity="0.8" stroke="#1A202C" stroke-width="3"/>
    <circle cx="100" cy="105" r="32" fill="#FFF5E1" fill-opacity="0.8" stroke="#1A202C" stroke-width="3"/>
    <text x="94" y="92" font-size="10" font-weight="900" fill="#1A202C">TEAM</text>
  </svg>`,

  q5_A: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#E6F0FA"/>
    <rect x="60" y="55" width="80" height="80" rx="8" fill="#FFFFFF" stroke="#1A202C" stroke-width="3"/>
    <rect x="85" y="100" width="30" height="35" fill="#EDF2F7" stroke="#1A202C" stroke-width="3"/>
    <path d="M100 65 L100 85 M90 75 L110 75" fill="none" stroke="#E29B9B" stroke-width="6" stroke-linecap="round"/>
    <circle cx="45" cy="60" r="10" fill="#FFF5E1"/>
  </svg>`,

  q5_B: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#FFF5E1"/>
    <polygon points="50,60 30,80 70,80" fill="#FADADD" stroke="#1A202C" stroke-width="2.5"/>
    <rect x="38" y="80" width="24" height="24" fill="#FFFFFF" stroke="#1A202C" stroke-width="2.5"/>
    <rect x="85" y="70" width="30" height="34" fill="#E6F0FA" stroke="#1A202C" stroke-width="2.5"/>
    <polygon points="80,70 100,55 120,70" fill="#AC8AD8" stroke="#1A202C" stroke-width="2.5"/>
    <circle cx="150" cy="80" r="16" fill="#E6F4EA" stroke="#1A202C" stroke-width="2.5"/>
    <text x="145" y="86" font-size="16" font-weight="900" fill="#1A202C">+</text>
  </svg>`,

  q6_A: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#F3E8FF"/>
    <rect x="55" y="75" width="90" height="50" rx="20" fill="#FFFFFF" stroke="#1A202C" stroke-width="3"/>
    <circle cx="75" cy="100" r="8" fill="#CBD5E0" stroke="#1A202C" stroke-width="2"/>
    <circle cx="125" cy="92" r="6" fill="#E29B9B" stroke="#1A202C" stroke-width="2"/>
    <circle cx="125" cy="108" r="6" fill="#7F9FCA" stroke="#1A202C" stroke-width="2"/>
    <path d="M100 45 L104 53 L113 54 L106 60 L108 69 L100 64 L92 69 L94 60 L87 54 L96 53 Z" fill="#E8BF6C" stroke="#1A202C" stroke-width="2"/>
  </svg>`,

  q6_B: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#FADADD"/>
    <path d="M70 60 L130 60 L130 70 L110 90 L130 110 L130 120 L70 120 L70 110 L90 90 L70 70 Z" fill="#FFFFFF" stroke="#1A202C" stroke-width="3" stroke-linejoin="round"/>
    <polygon points="75,65 125,65 108,82 92,82" fill="#E8BF6C"/>
    <polygon points="95,95 105,95 120,115 80,115" fill="#7F9FCA"/>
  </svg>`,

  q7_A: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#E6F0FA"/>
    <rect x="55" y="55" width="65" height="80" rx="6" fill="#FFFFFF" stroke="#1A202C" stroke-width="3"/>
    <line x1="70" y1="80" x2="105" y2="80" stroke="#1A202C" stroke-width="2"/>
    <line x1="70" y1="100" x2="100" y2="100" stroke="#1A202C" stroke-width="2"/>
    <circle cx="120" cy="100" r="20" fill="#FFF5E1" fill-opacity="0.9" stroke="#1A202C" stroke-width="3"/>
    <line x1="134" y1="114" x2="150" y2="130" stroke="#1A202C" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  q7_B: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#FFF5E1"/>
    <path d="M80 60 C50 60, 60 120, 100 120 C120 120, 120 90, 100 90 C80 90, 80 80, 100 80 C110 80, 120 70, 110 60 Z" fill="#FADADD" stroke="#1A202C" stroke-width="3" stroke-linejoin="round"/>
    <path d="M130 75 Q140 90 130 105" fill="none" stroke="#1A202C" stroke-width="3" stroke-linecap="round"/>
    <path d="M142 65 Q158 90 142 115" fill="none" stroke="#1A202C" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  q8_A: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#FFF5E1"/>
    <rect x="50" y="60" width="40" height="40" rx="8" fill="#FADADD" stroke="#1A202C" stroke-width="3"/>
    <circle cx="70" cy="80" r="8" fill="#FFFFFF" stroke="#1A202C" stroke-width="2"/>
    <rect x="105" y="80" width="45" height="45" rx="8" fill="#E6F0FA" stroke="#1A202C" stroke-width="3"/>
    <polygon points="127,92 137,112 117,112" fill="#FFFFFF" stroke="#1A202C" stroke-width="2"/>
  </svg>`,

  q8_B: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#F3E8FF"/>
    <rect x="65" y="80" width="70" height="40" fill="#FFFFFF" stroke="#1A202C" stroke-width="3"/>
    <path d="M85 80 L85 55 L115 55 L115 80" fill="none" stroke="#1A202C" stroke-width="3"/>
    <rect x="50" y="120" width="100" height="10" rx="3" fill="#E29B9B" stroke="#1A202C" stroke-width="2"/>
    <circle cx="45" cy="55" r="8" fill="#CBD5E0"/>
    <circle cx="155" cy="55" r="8" fill="#CBD5E0"/>
  </svg>`,

  q9_A: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#E6F0FA"/>
    <rect x="45" y="60" width="55" height="75" rx="6" fill="#FFFFFF" stroke="#1A202C" stroke-width="3"/>
    <line x1="55" y1="80" x2="90" y2="80" stroke="#1A202C" stroke-width="2"/>
    <line x1="55" y1="95" x2="85" y2="95" stroke="#1A202C" stroke-width="2"/>
    <polygon points="120,50 125,55 100,105 90,100" fill="#E8BF6C" stroke="#1A202C" stroke-width="2"/>
    <circle cx="140" cy="100" r="16" fill="#FADADD" stroke="#1A202C" stroke-width="2.5"/>
    <path d="M133 97 L140 103 L147 97" fill="none" stroke="#1A202C" stroke-width="2"/>
  </svg>`,

  q9_B: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#FFF5E1"/>
    <circle cx="100" cy="80" r="30" fill="#FFFFFF" stroke="#1A202C" stroke-width="3"/>
    <line x1="100" y1="80" x2="100" y2="62" stroke="#1A202C" stroke-width="3" stroke-linecap="round"/>
    <line x1="100" y1="80" x2="118" y2="80" stroke="#1A202C" stroke-width="3" stroke-linecap="round"/>
    <rect x="85" y="120" width="30" height="20" rx="4" fill="#AC8AD8" stroke="#1A202C" stroke-width="2"/>
    <path d="M93 120 L93 115 L107 115 L107 120" fill="none" stroke="#1A202C" stroke-width="2"/>
  </svg>`,

  q10_A: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#FADADD"/>
    <rect x="65" y="60" width="70" height="70" rx="10" fill="#FFFFFF" stroke="#1A202C" stroke-width="3"/>
    <path d="M100 75 L100 115 M80 95 L120 95" fill="none" stroke="#E29B9B" stroke-width="8" stroke-linecap="round"/>
    <circle cx="45" cy="50" r="10" fill="#FFF5E1"/>
  </svg>`,

  q10_B: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="120" rx="24" fill="#E6F4EA"/>
    <circle cx="100" cy="90" r="32" fill="#FFFFFF" stroke="#1A202C" stroke-width="3"/>
    <polygon points="100,68 107,90 100,95 93,90" fill="#7F9FCA" stroke="#1A202C" stroke-width="2"/>
    <polygon points="100,112 107,90 100,95 93,90" fill="#EDF2F7" stroke="#1A202C" stroke-width="2"/>
    <path d="M45 55 L48 58 L45 61 L42 58 Z" fill="#E8BF6C"/>
    <path d="M155 55 L158 58 L155 61 L152 58 Z" fill="#E8BF6C"/>
  </svg>`
};

// 狀態管理物件
let state = {
  currentQuestion: 0,
  // 結構改變：記錄每一題學生具體投給誰。格式：{ questionIndex: { A: [peerId1, peerId2...], B: [peerId3...] } }
  votes: {},
  // 記錄每一題是否已截止投票 { questionIndex: true/false }
  voteClosed: {},
  // 記錄每一題是否已經揭曉答案 { questionIndex: true/false }
  revealed: {}
};

// PeerJS 狀態與連線管理
let peer = null;
let activeConnections = [];
const TARGET_VOTES = 50; // 投票截止閥值
let qrcodeInstance = null;

// DOM 元素選取
const progressDots = document.getElementById("progressDots");
const progressBarFill = document.getElementById("progressBarFill");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const textA = document.getElementById("textA");
const textB = document.getElementById("textB");
const barA = document.getElementById("barA");
const barB = document.getElementById("barB");
const countA = document.getElementById("countA");
const countB = document.getElementById("countB");
const percentA = document.getElementById("percentA");
const percentB = document.getElementById("percentB");
const voteCountText = document.getElementById("voteCountText");
const voteProgressFill = document.getElementById("voteProgressFill");
const voteClosedTag = document.getElementById("voteClosedTag");
const explanationSection = document.getElementById("explanationSection");
const explanationText = document.getElementById("explanationText");
const memeBox = document.getElementById("memeBox");
const prevBtn = document.getElementById("prevBtn");
const revealBtn = document.getElementById("revealBtn");
const nextBtn = document.getElementById("nextBtn");
const optionsGrid = document.getElementById("optionsGrid");

const connectionDot = document.getElementById("connectionDot");
const connectionText = document.getElementById("connectionText");
const connectedCount = document.getElementById("connectedCount");
const roomCodeEl = document.getElementById("roomCode");
const qrcodeUrlText = document.getElementById("qrcodeUrlText");

// 初始化應用程式
function initApp() {
  generateProgressDots();
  initVotesData();
  setupWebRTC();
  renderQuestion();
}

// 初始化投票資料結構
function initVotesData() {
  quizData.forEach((_, idx) => {
    state.votes[idx] = { A: [], B: [] };
    state.voteClosed[idx] = false;
    state.revealed[idx] = false;
  });
}

// 設定 WebRTC PeerJS 連線 (教師投影端作為 Host)
function setupWebRTC() {
  // 生成隨機4位大寫英數字 ID 作為房間代碼
  const randomId = Math.floor(1000 + Math.random() * 9000).toString();
  const hostId = `SLP-${randomId}`;

  // 建立 Peer 節點
  peer = new Peer(hostId, {
    debug: 1
  });

  peer.on("open", (id) => {
    console.log("Teacher Host open, Peer ID:", id);
    connectionDot.className = "status-dot green";
    connectionText.textContent = "即時連線已就緒 (投影端)";
    roomCodeEl.textContent = randomId;

    // 動態計算學生端連結網址
    // 預期在 Netlify 上運作，直接使用當前 origin 替換 index.html 變成 student.html
    let baseURL = window.location.origin + window.location.pathname;
    if (baseURL.endsWith("index.html")) {
      baseURL = baseURL.replace("index.html", "");
    }
    if (!baseURL.endsWith("/")) {
      baseURL += "/";
    }
    const studentUrl = `${baseURL}student.html?hostId=${id}`;
    qrcodeUrlText.textContent = studentUrl;

    // 清除舊的 QR Code
    document.getElementById("qrcode").innerHTML = "";
    // 動態產生 QR Code
    qrcodeInstance = new QRCode(document.getElementById("qrcode"), {
      text: studentUrl,
      width: 160,
      height: 160,
      colorDark: "#1A202C",
      colorLight: "#FFFFFF",
      correctLevel: QRCode.CorrectLevel.M
    });
  });

  peer.on("connection", (conn) => {
    console.log("Student joined:", conn.peer);
    
    // 監聽此學生斷線
    conn.on("close", () => {
      activeConnections = activeConnections.filter(c => c.peer !== conn.peer);
      updateConnectedCountUI();
    });

    // 監聽資料傳遞
    conn.on("data", (data) => {
      handleStudentMessage(conn, data);
    });

    // 將連線存入連線池
    activeConnections.push(conn);
    updateConnectedCountUI();

    // 剛連線時，同步目前題目狀態與學生端
    conn.on("open", () => {
      const currentIdx = state.currentQuestion;
      const q = quizData[currentIdx];
      const studentChosen = getStudentVoteForQuestion(conn.peer, currentIdx);

      conn.send({
        type: "SYNC",
        currentQuestion: currentIdx,
        question: q,
        voteClosed: state.voteClosed[currentIdx],
        revealed: state.revealed[currentIdx],
        chosen: studentChosen, // 告訴該生他這題投過什麼
        correct: state.revealed[currentIdx] ? q.correct : null,
        explanation: state.revealed[currentIdx] ? q.explanation : null,
        meme: state.revealed[currentIdx] ? q.meme : null
      });
    });
  });

  peer.on("error", (err) => {
    console.error("PeerJS Error:", err);
    connectionDot.className = "status-dot red";
    connectionText.textContent = "連線出錯，請重啟網頁！";
  });
}

// 取得某學生在某題的投票
function getStudentVoteForQuestion(peerId, questionIdx) {
  const vote = state.votes[questionIdx];
  if (!vote) return null;
  if (vote.A.includes(peerId)) return "A";
  if (vote.B.includes(peerId)) return "B";
  return null;
}

// 更新連線人數 UI
function updateConnectedCountUI() {
  connectedCount.textContent = activeConnections.length;
}

// 廣播給所有已連線學生
function broadcast(message) {
  activeConnections.forEach((conn) => {
    if (conn.open) {
      conn.send(message);
    }
  });
}

// 處理學生端發送來的投票指令
function handleStudentMessage(conn, data) {
  if (data.type === "VOTE") {
    const currentIdx = state.currentQuestion;
    
    // 如果此題投票已截止或已公佈答案，則拒絕投票
    if (state.voteClosed[currentIdx] || state.revealed[currentIdx]) {
      conn.send({ type: "VOTE_REJECTED", reason: "本題投票已截止！" });
      return;
    }

    const votes = state.votes[currentIdx];
    const peerId = conn.peer;

    // 檢查此學生是否在該題已經投過票
    if (votes.A.includes(peerId) || votes.B.includes(peerId)) {
      conn.send({ type: "VOTE_REJECTED", reason: "您本題已經投過票囉！" });
      return;
    }

    // 計票 (去重)
    if (data.option === "A") {
      votes.A.push(peerId);
      animateTicketIncrement(countA, votes.A.length);
    } else if (data.option === "B") {
      votes.B.push(peerId);
      animateTicketIncrement(countB, votes.B.length);
    }

    // 告知學生投票成功
    conn.send({ type: "VOTE_CONFIRMED", option: data.option });

    // 重新計算並渲染票數與百分比
    updateVoteGraphics(currentIdx);

    // 檢查是否超過截止閥值 (50 票)
    const totalVotes = votes.A.length + votes.B.length;
    if (totalVotes >= TARGET_VOTES) {
      triggerVoteClose(currentIdx);
    }
  }
}

// 票數滾動加減與 Bump 微互動效果
function animateTicketIncrement(element, targetValue) {
  const startValue = parseInt(element.textContent) || 0;
  if (startValue === targetValue) return;

  // 數字變大微彈簧效果
  element.classList.add("bump");
  setTimeout(() => {
    element.classList.remove("bump");
  }, 250);

  // 數字快速跑馬燈滾動動畫效果
  let current = startValue;
  const duration = 200; // 0.2 秒
  const stepTime = Math.max(Math.floor(duration / Math.abs(targetValue - startValue)), 20);
  const timer = setInterval(() => {
    if (current < targetValue) {
      current++;
      element.textContent = current;
    } else if (current > targetValue) {
      current--;
      element.textContent = current;
    }
    if (current === targetValue) {
      clearInterval(timer);
    }
  }, stepTime);
}

// 更新長條圖與百分比
function updateVoteGraphics(questionIdx) {
  const votes = state.votes[questionIdx];
  const countValA = votes.A.length;
  const countValB = votes.B.length;
  const total = countValA + countValB;

  // 計算百分比
  let pctA = 0;
  let pctB = 0;
  if (total > 0) {
    pctA = Math.round((countValA / total) * 100);
    pctB = 100 - pctA; // 兩者相加必定是 100
  }

  // 顯示票數與百分比文字 (含滾動票數更新)
  countA.textContent = countValA;
  countB.textContent = countValB;
  percentA.textContent = `(${pctA}%)`;
  percentB.textContent = `(${pctB}%)`;

  // 長條圖平滑展開動畫
  barA.style.width = `${pctA}%`;
  barB.style.width = `${pctB}%`;

  // 更新大螢幕上的答題總進度條
  const progressPercent = Math.min((total / TARGET_VOTES) * 100, 100);
  voteProgressFill.style.width = `${progressPercent}%`;
  voteCountText.textContent = `目前票數：${total} / ${TARGET_VOTES} 票`;

  // 啟用「顯示解答」按鈕條件：只要有至少 1 人投票即可
  if (total > 0 && !state.revealed[questionIdx]) {
    revealBtn.disabled = false;
    revealBtn.className = "btn btn-primary";
  } else {
    revealBtn.disabled = true;
    revealBtn.className = "btn btn-secondary";
  }
}

// 主動截止某一題的投票
function triggerVoteClose(questionIdx) {
  state.voteClosed[questionIdx] = true;
  
  // 大螢幕展示截止特效
  voteClosedTag.style.display = "block";
  voteClosedTag.textContent = `🚫 本題投票已截止！累計投出 ${state.votes[questionIdx].A.length + state.votes[questionIdx].B.length} 票`;

  // 向所有學生端廣播截止通知
  broadcast({
    type: "STOP_VOTE",
    questionIdx: questionIdx
  });
}

// 動態產生進度點
function generateProgressDots() {
  progressDots.innerHTML = "";
  quizData.forEach((q, index) => {
    const dot = document.createElement("button");
    dot.className = `dot ${index === state.currentQuestion ? "active" : ""}`;
    dot.textContent = q.id;
    dot.id = `dot-${index}`;
    dot.onclick = () => jumpToQuestion(index);
    progressDots.appendChild(dot);
  });
}

// 躍遷到指定題目
function jumpToQuestion(index) {
  state.currentQuestion = index;
  renderQuestion();
  
  // 向所有學生同步當前題目
  const q = quizData[index];
  activeConnections.forEach((conn) => {
    if (conn.open) {
      const studentChosen = getStudentVoteForQuestion(conn.peer, index);
      conn.send({
        type: "CHANGE_QUESTION",
        currentQuestion: index,
        question: q,
        voteClosed: state.voteClosed[index],
        revealed: state.revealed[index],
        chosen: studentChosen,
        correct: state.revealed[index] ? q.correct : null,
        explanation: state.revealed[index] ? q.explanation : null,
        meme: state.revealed[index] ? q.meme : null
      });
    }
  });
}

// 渲染大螢幕當前題目與投票進度
function renderQuestion() {
  const currentIdx = state.currentQuestion;
  const q = quizData[currentIdx];

  // 更新導覽點的 active 樣式
  document.querySelectorAll(".dot").forEach((dot, idx) => {
    dot.classList.remove("active");
    if (idx === currentIdx) {
      dot.classList.add("active");
    }
    // 狀態點背景變色
    dot.classList.remove("answered", "revealed-correct");
    const total = state.votes[idx].A.length + state.votes[idx].B.length;
    if (state.revealed[idx]) {
      dot.classList.add("revealed-correct");
    } else if (total > 0) {
      dot.classList.add("answered");
    }
  });

  // 更新最上方的大一新生題目進度條
  const percentComplete = ((currentIdx + 1) / quizData.length) * 100;
  progressBarFill.style.width = `${percentComplete}%`;

  // 更新題目與選項文字
  questionNumber.textContent = `Q${q.id}`;
  questionText.textContent = q.question;
  textA.textContent = q.optionA;
  textB.textContent = q.optionB;

  // 插入對應的 SVG 插畫
  const keyA = `q${q.id}_A`;
  const keyB = `q${q.id}_B`;
  document.getElementById("illustA").innerHTML = illustLibrary[keyA] || "";
  document.getElementById("illustB").innerHTML = illustLibrary[keyB] || "";

  // 重設卡片狀態與樣式
  optionsGrid.className = "options-grid";
  optionA.classList.remove("correct", "incorrect");
  optionB.classList.remove("correct", "incorrect");

  // 更新圖形 (百分比、計數器、進度條)
  updateVoteGraphics(currentIdx);

  // 檢查是否已截止
  if (state.voteClosed[currentIdx]) {
    voteClosedTag.style.display = "block";
    voteClosedTag.textContent = `🚫 本題投票已截止！累計投出 ${state.votes[currentIdx].A.length + state.votes[currentIdx].B.length} 票`;
  } else {
    voteClosedTag.style.display = "none";
  }

  // 檢查是否已公佈答案
  if (state.revealed[currentIdx]) {
    optionsGrid.classList.add("revealed");
    
    // 標示正確與錯誤選項
    if (q.correct === 'A') {
      optionA.classList.add("correct");
      optionB.classList.add("incorrect");
    } else {
      optionB.classList.add("correct");
      optionA.classList.add("incorrect");
    }

    // 展開解析與迷因
    explanationText.textContent = q.explanation;
    memeBox.textContent = q.meme;
    explanationSection.classList.add("open");
  } else {
    explanationSection.classList.remove("open");
  }

  // 更新控制按鈕狀態
  prevBtn.disabled = currentIdx === 0;
  nextBtn.textContent = currentIdx === quizData.length - 1 ? "完成挑戰 🎉" : "下一題 →";
}

// 教師投影端手動點擊卡片投票 (單機 Fallback / 展示備用方案)
function teacherVote(option) {
  const currentIdx = state.currentQuestion;
  
  // 如果已經公佈答案或該題已經截止，則不再投票
  if (state.voteClosed[currentIdx] || state.revealed[currentIdx]) return;

  const votes = state.votes[currentIdx];
  
  // 老師手動投票時，為了快速展示得票長條圖與數字動畫，直接生成一組模擬得票
  // 例如：該選項得 38 票，另一個選項得 12 票，共 50 票並觸發截止。
  const mockA = option === 'A' ? 38 : 12;
  const mockB = option === 'B' ? 38 : 12;
  
  // 填充選票數據
  for (let i = 0; i < mockA; i++) votes.A.push(`mock-teacher-A-${i}`);
  for (let i = 0; i < mockB; i++) votes.B.push(`mock-teacher-B-${i}`);

  // 計數器動畫
  animateTicketIncrement(countA, votes.A.length);
  animateTicketIncrement(countB, votes.B.length);

  // 重新渲染百分比與圖形
  updateVoteGraphics(currentIdx);

  // 觸發投票截止
  triggerVoteClose(currentIdx);
}

// 投影端點擊「公佈答案」
function revealAnswer() {
  const currentIdx = state.currentQuestion;
  const q = quizData[currentIdx];

  // 標記為已揭曉
  state.revealed[currentIdx] = true;
  // 公佈答案時自動截止投票
  state.voteClosed[currentIdx] = true;

  // 更新導覽點外觀
  const dot = document.getElementById(`dot-${currentIdx}`);
  dot.classList.remove("answered");
  dot.classList.add("revealed-correct");

  // 向所有學生廣播答案與解析
  broadcast({
    type: "REVEAL_ANSWER",
    questionIdx: currentIdx,
    correct: q.correct,
    explanation: q.explanation,
    meme: q.meme
  });

  // 重新渲染以套用 blink 動畫
  renderQuestion();
}

// 上一題
function prevQuestion() {
  if (state.currentQuestion > 0) {
    jumpToQuestion(state.currentQuestion - 1);
  }
}

// 下一題
function nextQuestion() {
  if (state.currentQuestion < quizData.length - 1) {
    jumpToQuestion(state.currentQuestion + 1);
  } else {
    showSummary();
  }
}

// 結束挑戰展示總結畫面
function showSummary() {
  const totalQuestions = quizData.length;
  
  // 統計每一題得票最高的選項與全體分布
  let totalVotesCount = 0;
  quizData.forEach((_, i) => {
    totalVotesCount += (state.votes[i].A.length + state.votes[i].B.length);
  });

  // 動態替換 app-container 的內容為漂亮的大一新生成果總結頁面
  const container = document.querySelector(".app-container");
  container.innerHTML = `
    <header style="border-bottom: none; margin-bottom: 1.5rem;">
      <h1 class="main-title">🎉 挑戰成功！</h1>
      <p class="subtitle" style="font-size: 1.25rem;">新生定向職涯探索互動挑戰已順利落幕</p>
    </header>

    <div style="display: flex; flex-direction: column; align-items: center; gap: 2rem; margin-top: 1rem; z-index: 1;">
      <!-- Total interactive tickets badge -->
      <div style="width: 140px; height: 140px; border-radius: 50%; border: 4px solid var(--border-color); background-color: var(--accent-yellow); display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 6px 6px 0px var(--border-color);">
        <span style="font-size: 2.8rem; font-weight: 900; line-height: 1;">${totalVotesCount}</span>
        <span style="font-size: 0.95rem; font-weight: 700; color: var(--text-muted);">累計總票數</span>
      </div>

      <div style="text-align: center; max-width: 600px; line-height: 1.6;">
        <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.75rem;">用專業打開溝通的大門 🚪</h3>
        <p style="color: var(--text-muted); font-size: 1.1rem; font-weight: 500;">
          親愛的大一新生，互動投票不僅是一場趣味遊戲，更是你們認識聽力與語言治療專業的開端。語言治療師不僅是復健團隊中重要的一員，更是協助無數人重新奪回「口語溝通」與「享受美食」尊嚴的橋樑建造者！
        </p>
      </div>

      <div style="display: flex; gap: 1rem; width: 100%; justify-content: center; margin-top: 1rem;">
        <button class="btn btn-primary" onclick="restartQuiz()" style="box-shadow: 4px 4px 0px var(--border-color); width: auto;">
          🔄 重新挑戰
        </button>
      </div>
    </div>
  `;
}

// 重新開始挑戰
function restartQuiz() {
  state = {
    currentQuestion: 0,
    votes: {},
    voteClosed: {},
    revealed: {}
  };
  
  // 恢復原有的 HTML 架構
  const container = document.querySelector(".app-container");
  container.innerHTML = `
    <div class="status-bar">
      <div class="status-indicator">
        <span class="status-dot green" id="connectionDot"></span>
        <span id="connectionText">正在初始化即時連線...</span>
      </div>
      <div class="student-count">
        👥 已連線學生：<span id="connectedCount" class="badge">0</span> 人
      </div>
    </div>

    <div class="presentation-layout">
      <div class="quiz-area">
        <header>
          <h1 class="main-title">你以為的語言治療師 VS. 真正的語言治療師</h1>
          <p class="subtitle">115學年度新生定向職涯探索互動挑戰 (教師投影端)</p>
        </header>

        <div class="progress-container">
          <div class="progress-dots" id="progressDots"></div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" id="progressBarFill"></div>
          </div>
        </div>

        <main class="question-section">
          <div class="question-header">
            <div class="question-number" id="questionNumber">Q1</div>
            <h2 class="question-text" id="questionText">載入中...</h2>
          </div>

          <div class="vote-progress-wrapper">
            <div class="vote-progress-info">
              <span>📊 答題進度 (超過 50 票截止，總共 80 人)</span>
              <span id="voteCountText" class="vote-count-text">目前票數：0 / 50 票</span>
            </div>
            <div class="vote-progress-track">
              <div class="vote-progress-fill" id="voteProgressFill"></div>
              <div class="vote-progress-deadline-marker">50票</div>
            </div>
            <div class="vote-closed-tag" id="voteClosedTag">🚫 本題投票已截止</div>
          </div>

          <div class="options-grid" id="optionsGrid">
            <div class="option-card" id="optionA" onclick="teacherVote('A')">
              <div class="option-badge">A</div>
              <div class="option-illust" id="illustA"></div>
              <div class="option-text" id="textA">選項 A 載入中...</div>
              
              <div class="vote-result-container">
                <div class="vote-bar-wrapper">
                  <div class="vote-bar-fill" id="barA"></div>
                </div>
                <div class="vote-numeric-display">
                  <span class="vote-count" id="countA">0</span> 票
                  <span class="vote-percentage" id="percentA">(0%)</span>
                </div>
              </div>
            </div>

            <div class="option-card" id="optionB" onclick="teacherVote('B')">
              <div class="option-badge">B</div>
              <div class="option-illust" id="illustB"></div>
              <div class="option-text" id="textB">選項 B 載入中...</div>

              <div class="vote-result-container">
                <div class="vote-bar-wrapper">
                  <div class="vote-bar-fill" id="barB"></div>
                </div>
                <div class="vote-numeric-display">
                  <span class="vote-count" id="countB">0</span> 票
                  <span class="vote-percentage" id="percentB">(0%)</span>
                </div>
              </div>
            </div>
          </div>

          <div class="explanation-section" id="explanationSection">
            <div class="explanation-title">
              <span>💡</span>
              <span>解析與思維點</span>
            </div>
            <p class="explanation-text" id="explanationText">這裡會顯示答案解析與迷因點...</p>
            <div class="meme-box" id="memeBox"></div>
          </div>
        </main>
      </div>

      <div class="qrcode-panel">
        <div class="qrcode-card">
          <h3 class="qrcode-title">📲 學生加入投票</h3>
          <p class="qrcode-desc">請學生用手機掃描下方 QR Code，即可同步參與每一題的即時投票！</p>
          
          <div class="qrcode-container-wrapper">
            <div id="qrcode" class="qrcode-box"></div>
          </div>
          
          <div class="connection-code-box">
            <span class="code-label">連線代碼</span>
            <div class="code-value" id="roomCode">----</div>
          </div>
          <p class="qrcode-url-text" id="qrcodeUrlText">正在取得上線網址...</p>
        </div>
      </div>
    </div>

    <div class="controls-panel">
      <button class="btn btn-secondary" id="prevBtn" onclick="prevQuestion()" disabled>
        ← 上一題
      </button>
      
      <button class="btn btn-primary" id="revealBtn" onclick="revealAnswer()" disabled>
        📢 顯示解答
      </button>
      
      <button class="btn btn-success" id="nextBtn" onclick="nextQuestion()">
        下一題 →
      </button>
    </div>
  `;

  // 重新綁定與初始化 DOM 元素
  initDomElements();
  // 重新初始化投票數據
  initVotesData();
  // 重建 WebRTC Peer
  if (peer) {
    peer.destroy();
  }
  setupWebRTC();
  // 渲染
  renderQuestion();
}

// 重新抓取 DOM 元素的輔助函數
function initDomElements() {
  globalThis.progressDots = document.getElementById("progressDots");
  globalThis.progressBarFill = document.getElementById("progressBarFill");
  globalThis.questionNumber = document.getElementById("questionNumber");
  globalThis.questionText = document.getElementById("questionText");
  globalThis.optionA = document.getElementById("optionA");
  globalThis.optionB = document.getElementById("optionB");
  globalThis.textA = document.getElementById("textA");
  globalThis.textB = document.getElementById("textB");
  globalThis.barA = document.getElementById("barA");
  globalThis.barB = document.getElementById("barB");
  globalThis.countA = document.getElementById("countA");
  globalThis.countB = document.getElementById("countB");
  globalThis.percentA = document.getElementById("percentA");
  globalThis.percentB = document.getElementById("percentB");
  globalThis.voteCountText = document.getElementById("voteCountText");
  globalThis.voteProgressFill = document.getElementById("voteProgressFill");
  globalThis.voteClosedTag = document.getElementById("voteClosedTag");
  globalThis.explanationSection = document.getElementById("explanationSection");
  globalThis.explanationText = document.getElementById("explanationText");
  globalThis.memeBox = document.getElementById("memeBox");
  globalThis.prevBtn = document.getElementById("prevBtn");
  globalThis.revealBtn = document.getElementById("revealBtn");
  globalThis.nextBtn = document.getElementById("nextBtn");
  globalThis.optionsGrid = document.getElementById("optionsGrid");

  globalThis.connectionDot = document.getElementById("connectionDot");
  globalThis.connectionText = document.getElementById("connectionText");
  globalThis.connectedCount = document.getElementById("connectedCount");
  globalThis.roomCodeEl = document.getElementById("roomCode");
  globalThis.qrcodeUrlText = document.getElementById("qrcodeUrlText");
}

// 頁面加載完成後啟動
window.addEventListener("DOMContentLoaded", initApp);
