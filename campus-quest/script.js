const quizData = [
  {
    id: 1,
    stage: "第一階段：大一・啟航與探索期",
    locationName: "太極湖",
    locationImg: "太極湖.jpg",
    mapAction: { name: "課程地圖", img: "課程地圖.jpg" },
    mapCoords: { top: "19%", left: "36%" },
    question: "【學分分配的奧秘】聽說大學要修滿 128 學分才能畢業？這些學分到底包含哪些課？",
    optionA: "我想了解「128 學分」的整體架構與專業學程的分配比例。",
    optionB: "我想了解大一有什麼「系核心課程」？這些課如何幫我打底？",
    explanationA: "本系的畢業學分架構經過精心設計，確保你兼具通識廣度與高度專業。128 個畢業總學分的分配如下：\n- 通識課程（30 學分）：奠定跨領域素養。\n- 院核心課程（4 學分）：醫學健康學院共同基礎。\n- 專業課程（88.5 學分）：包含系核心課程（40 學分）以及大二分流後的專業學程課程（48.5 學分）。\n- 專業選修（4 學分）：提供彈性自主學習空間。",
    explanationB: "大一的必修系核心課程是進入專業的橋樑，主要在建立基礎解剖醫學與聲音分析知能。核心學科包括：\n- 溝通障礙學導論（2學分）：認識溝通障礙及聽語專業職責。\n- 語音學及語言學（2學分）：掌握IPA國際音標，是分析構音異常的基礎。\n- 聽語解剖與生理學（3學分）：探討呼吸、發聲、共鳴、構音與聽覺系統。\n- 基礎生理學與神經機轉（各2學分）：理解神經系統如何控制語言區。",
    dialogText: "出發啦！第一站太極湖，學分架構看這裡！🐻"
  },
  {
    id: 2,
    stage: "第一階段：大一・啟航與探索期",
    locationName: "資訊電機學院",
    locationImg: "資訊電機學院.jpg",
    mapCoords: { top: "15%", left: "49%" },
    question: "【不分組與適性分流】聽語系分為「聽力」跟「語言治療」，我大一就必須決定好方向嗎？",
    optionA: "我想深究「語言治療學程」的必修科目與專業內容。",
    optionB: "我想深究「聽力學程」的必修科目與科技應用。",
    explanationA: "語言治療學程專注於協助各年齡層有「溝通、語言、言語與吞嚥障礙」的個案。大二開始你將修讀：\n- 言語障礙核心：構音與音韻異常學、嗓音異常學、語暢異常學等。\n- 語言障礙核心：兒童與成人語言障礙學（如失語症）。\n- 吞嚥障礙學：學習如何評估與復健吞嚥困難，避免吸入性肺炎。",
    explanationB: "聽力學程結合醫學與科技，專注於「聽覺評估、助聽設備選配與聽能復健」。大二分流後的專屬科目包含：\n- 臨床聽力學：學習純音聽力檢查、鼓室圖等臨床評估手段。\n- 電生理聽力學：運用腦波等生理電位評估嬰幼兒的聽覺功能。\n- 聽覺輔具學與聽能復健學：學習選配精密助聽器或人工電子耳。",
    dialogText: "大二才分流，我可以慢慢探索興趣！🚀"
  },
  {
    id: 3,
    stage: "第二階段：大二・深耕與特色期",
    locationName: "護理學院",
    locationImg: "護理學院.jpg",
    mapAction: { name: "課程解析地圖", img: "課程解析地圖.png" },
    mapCoords: { top: "19%", left: "60%" },
    question: "【四年黃金進程】這四年我到底會學到什麼？能給我一個清晰的「學習歷程時間軸」嗎？",
    optionA: "我想了解「語言治療學程」大一到大四的核心修課地圖與實習里程碑。",
    optionB: "我想了解「聽力學程」大一到大四的核心修課地圖與實習里程碑。",
    explanationA: "黃金四年進程（語療）：\n- 大一【奠定學科基石】：修習通識及基礎醫學與語言學科目。\n- 大二【學程深化與初階實習】：修讀語言治療核心，並在校內進行初階語言障礙實習。\n- 大三【進階臨床技能】：修習高階臨床科目，並進行進階實習。\n- 大四【整合全職實習】：全面投入至少九個月的全職校外臨床實習。",
    explanationB: "黃金四年進程（聽力）：\n- 大一【奠定學科基石】：修習解剖生理、聽力科學等。\n- 大二【儀器操作與聽力障礙學】：修讀臨床聽力學，在系上聽力檢查室練習純音與阻抗聽力檢查。\n- 大三【高階聽能科技與復健】：精進嬰幼兒聽力學、人工電子耳等進階課程與實習。\n- 大四【整合全職實習】：投入至少八個月的全職校外臨床實習（各大教學醫院或助聽器公司）。",
    dialogText: "四年的學習地圖也很壯觀呢！🎒"
  },
  {
    id: 4,
    stage: "第二階段：大二・深耕與特色期",
    locationName: "惜福學苑",
    locationImg: "惜福學苑.jpg",
    mapCoords: { top: "22%", left: "82.5%" },
    question: "【特色學程超能力】亞大聽語系有何獨特之處？「特色課程模組」如何幫我的履歷加分？",
    optionA: "我想專修「聽語早期療育及學校溝通障礙服務模組」。",
    optionB: "我想專修「聽語長期照護模組」與「頭頸部腫瘤言語及吞嚥復健課程」。",
    explanationA: "此特色模組專為兒童健康與特殊教育市場打造。本系為全國唯一獲台中市政府核准之早期療育服務單位！\n台灣早期療育需求大增，本模組能培育你具備在特殊教育學校、早療機構、學校特教專業團隊中進行跨專業聯合評估與床邊指導的能力，大大開拓特教職涯。",
    explanationB: "高齡化社會使長照與頭頸部腫瘤復健成為藍海市場：\n- 聽語長期照護模組：培養為失智症、中風長者設計溝通與吞嚥照護方案的實戰能力。\n- 頭頸部腫瘤復健：由本系與中醫大及台中榮總合開，深入學習無喉者發聲輔具（人工喉）與吞嚥電刺激技術，成為高階臨床復健專家！",
    dialogText: "我可以選擇特色模組，讓履歷鍍金！✨"
  },
  {
    id: 5,
    stage: "第二階段：大二・深耕與特色期",
    locationName: "行政大樓(圖書館)",
    locationImg: "行政大樓(圖書館).jpg",
    mapCoords: { top: "33%", left: "37%" },
    question: "【跨域與跨校斜槓】中亞聯大雙平台！聽語系學生要如何申請跨校、跨系選修？",
    optionA: "我想修讀本系規劃的「領域專長學程」與學校的「校內跨領域學程」。",
    optionB: "我想挑戰「中亞聯大」跨校平台，申請至中國醫藥大學修讀輔系、雙主修。",
    explanationA: "本校及本系提供非常完整的跨域學習制度：\n- 系所層級：特別規劃了「聽力照護領域專長」與「語言發展領域專長」模組。\n- 校內跨領域學程：由教務處規劃，上課時間均貼心排在每週四、五。完成後畢業證書上會正式加註「跨領域學程」。",
    explanationB: "亞洲大學與中國醫藥大學結為「中亞聯大」，兩校資源全面共享！\n你可以跨校至中醫大修讀中醫、西醫、物理治療或職能治療等相關課程。若完成修讀規定，畢業證書將加註「中國醫藥大學○○雙主修/輔系」，極大化你的斜槓實力！",
    dialogText: "中亞聯大資源共享，還能跨校雙主修！🌐"
  },
  {
    id: 6,
    stage: "第三階段：大三・鍛鍊與資格檢視期",
    locationName: "管理暨社會科學學院",
    locationImg: "管理暨社會科學學院.png",
    mapAction: { name: "證照地圖", img: "證照地圖.jpg" },
    mapCoords: { top: "46.5%", left: "54%" },
    question: "【高考資格大體檢】要如何確保我畢業時，100% 符合國家專技高考的報考資格？",
    optionA: "我想確認「語言治療師」高考規定的五大領域在系上課程的對應。",
    optionB: "我想確認「聽力師」高考規定的領域與系上必修課程的對應。",
    explanationA: "系上設有詳盡的「課程與專技高考資格符合度對照表」，完全對接考選部規定的必備學分：\n- 言語障礙領域：本系開設15學分，遠超標準！\n- 語言障礙領域：合計共7學分，完美對接！\n- 相關領域：包含溝障評估方法等20門選修。\n- 聽力障礙領域：合計共8學分。\n- 聽語基礎學科：合計共19學分。",
    explanationB: "針對「聽力師」高考應考資格，本系的課程同樣做到 100% 的無縫契合：\n- 精準對應臨床聽力學、小兒聽力學等核心學科，全面覆蓋國考 6 科專業考科。\n- 修課把關機制：在每學期選課時，系上的輔導老師都會對照學生的修課歷程，並在大三結束前進行「應考資格大體檢」，確保你不會漏修任何一門課！",
    dialogText: "大三應考資格大體檢，不怕漏修任何國考學分！📝"
  },
  {
    id: 7,
    stage: "第三階段：大三・鍛鍊與資格檢視期",
    locationName: "亞洲大學現代美術館",
    locationImg: "安藤忠雄現代美術館.JPG",
    mapCoords: { top: "52%", left: "13%" },
    question: "【臨床實習大作戰】大四臨床實習要去哪裡？在校內和校外如何安全「練兵」？",
    optionA: "我想深入了解實習時間長度與時數規定的差異。",
    optionB: "我想了解亞大特設的「智慧聽語教學實習中心」以及校外實習合作醫院。",
    explanationA: "本系實習規定嚴格且紮實：\n- 語言治療學程實習：需進行至少九個月且必須修滿臨床實習手冊規定的總時數（考選部低標為 375 小時），涵蓋兒童與成人的多元實習分項。\n- 聽力學程實習：需進行至少八個月，包含聽力評估、小兒聽力、電生理檢查、助聽輔具選配等。",
    explanationB: "雙軌實習機制：\n- 校內過渡：全國唯一「智慧聽語教學實習中心」，可透過單向玻璃及視訊系統，在極其安全且無壓力的環境中累積最初的臨床手感。\n- 校外實戰：北中南57站(語療)與37站(聽力)頂尖醫學中心。包含臺大、榮總、中醫大、成大等，以及知名企業如科林、維膜助聽器。",
    dialogText: "期待未來去各大醫學中心實習！🏥"
  },
  {
    id: 8,
    stage: "第四階段：大四・全職實習與國考衝刺期",
    locationName: "築夢學苑",
    locationImg: "築夢學苑.jpeg",
    mapCoords: { top: "62.5%", left: "31%" },
    question: "【證照輔導秘密武器】大四實習結束要考國家證照，系上有提供什麼輔導機制？",
    optionA: "我想了解系上的「四年證照輔導計畫」與階段性檢定機制。",
    optionB: "我想了解秘密武器「國考檢測輔助教學系統」的功能與優勢。",
    explanationA: "考照是一場四年的馬拉松：\n- 大一到大三：系上教材全面對接國考，並舉辦「學科檢定」與「術科臨床技能檢定」，確保理論與臨床實力並進。\n- 大四：系上特別開設「證照輔導專班」，聘請老師進行國考歷屆試題解析，並提供證照輔導班經費補助，助你一臂之力！",
    explanationB: "系上耗費資源為學生開發了專屬線上模擬檢測平台！\n系統完整收錄歷年國家專技高考的歷屆真題與詳細解析。能自動分析個別領域的正確率，並提供雷達圖找出知識盲區，讓你隨時用手機平板刷題，精準補強，大大提升上榜率！",
    dialogText: "有線上刷題系統跟專班，國考我一定行！🎯"
  },
  {
    id: 9,
    stage: "第四階段：大四・全職實習與國考衝刺期",
    locationName: "體育館",
    locationImg: "羅馬競技場(體育館).png", 
    mapCoords: { top: "68%", left: "43.5%" },
    question: "【五年學碩一貫與雙證照】全國唯一！如何利用「學碩一貫」在 5 年內拿到雙證照？",
    optionA: "我想了解「學、碩士一貫學位」的申請時間與大二、大三先修課程規劃。",
    optionB: "我想了解如何實行「大學部選 A 組、碩士班選 B 組」的雙證照黃金攻略。",
    explanationA: "本系擁有全國唯一「學、碩士一貫學位」，讓你省時省學費：\n- 申請時間：大二、大三起，即可提出申請。\n- 碩士班課程先修：大四畢業後，一旦考取本系碩士班，你之前先修的碩士班學分即可全數抵免，最快只需再讀 1 年（總共 5 年）就能取得聽語學士與碩士學位！",
    explanationB: "雙棲專家的黃金攻略：\n1. 大學部階段：選擇一個學程（如：語言治療學程），大四考取語言治療師執照。\n2. 碩士班階段：直升學碩一貫，碩士班選修對組的專門學科（如：聽力學程）。\n3. 畢業考照：碩士班畢業後考取聽力師。最快在 5 年內達成「學士+碩士+語言治療師+聽力師雙證照」！",
    dialogText: "5年拿雙證照的超強規劃！🎓"
  },
  {
    id: 10,
    stage: "第五階段：國考與就業・衝刺與收割期",
    locationName: "亞大醫院",
    locationImg: "亞大醫院.jpg",
    mapAction: { name: "職涯地圖", img: "職涯地圖.jpg" },
    mapCoords: { top: "85.5%", left: "78.5%" },
    question: "【年薪百萬星光大道】聽語專業畢業後的起薪、就業率與長遠職涯發展好嗎？",
    optionA: "我想了解「醫療體系」與「輔具產業」的起薪、年薪及實際就業率。",
    optionB: "我想了解「創業、學校特教」以及「國內外進修深造」的長遠職涯出路。",
    explanationA: "聽語專業是標準的黃金鐵飯碗，畢業生平均就業率高達近 100%：\n- 醫療院所：畢業考取證照後進入各大醫院或復健中心，平均月薪資高達 6 萬元以上。\n- 大型助具公司：擔任聽力師除了底薪外還有豐厚選配業績獎金。已有許多學長姐在畢業數年內便順利達到年薪 100 萬元以上的驚人成就！",
    explanationB: "聽語專業的職涯寬度遠超想像：\n- 自主創業：累積幾年經驗後，可自行開設「聽力所」或「語言治療所」，提供社區化服務。\n- 教育特教系統：進入特殊教育學校、早期療育機構擔任專業團隊治療師。\n- 學術與研發：攻讀國內外博碩士，進入大專院校擔任教授，或與科技大廠合作開發智慧聽語評估工具！",
    dialogText: "年薪百萬星光大道！終於完成這趟星航記了！🏆"
  }
];

let state = {
  currentStage: 0, 
  nodesActive: [true, false, false, false, false, false, false, false, false, false]
};

// DOM Elements
let gridMap, nodesContainer, mapActivePath, mapProgressPath, studentAvatar, avatarSpeech;
let coverPage, appContainer, locationModal, summaryOverlay;
let fullMapModal, fullMapImg;

window.addEventListener("load", () => {
  initDOM();
  renderMapNodes();
  updateAvatarPosition();
  
  studentAvatar.addEventListener("click", () => {
    openLocationModal(state.currentStage);
  });
  
  // Setup SVG line updating
  window.addEventListener("resize", () => {
    updateSVGPaths();
    updateAvatarPosition();
  });
  
  setTimeout(() => updateSVGPaths(), 200);
});

function initDOM() {
  coverPage = document.getElementById("coverPage");
  appContainer = document.getElementById("appContainer");
  gridMap = document.getElementById("gridMap");
  nodesContainer = document.getElementById("nodesContainer");
  mapActivePath = document.getElementById("mapActivePath");
  mapProgressPath = document.getElementById("mapProgressPath");
  studentAvatar = document.getElementById("studentAvatar");
  avatarSpeech = document.getElementById("avatarSpeech");
  locationModal = document.getElementById("locationModal");
  summaryOverlay = document.getElementById("summaryOverlay");
  fullMapModal = document.getElementById("fullMapModal");
  fullMapImg = document.getElementById("fullMapImg");
}

function startGame() {
  coverPage.style.opacity = '0';
  setTimeout(() => {
    coverPage.classList.add("hidden");
    appContainer.classList.remove("hidden");
    
    // Animate map entrance
    gridMap.style.opacity = '0';
    gridMap.style.transform = 'scale(0.95)';
    setTimeout(() => {
      gridMap.style.transition = 'all 0.8s ease';
      gridMap.style.opacity = '1';
      gridMap.style.transform = 'scale(1)';
      updateSVGPaths();
      updateAvatarPosition();
    }, 100);
    
  }, 800);
}

function renderMapNodes() {
  nodesContainer.innerHTML = '';
  quizData.forEach((q, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'quest-node-wrapper';
    wrapper.style.left = q.mapCoords.left;
    wrapper.style.top = q.mapCoords.top;
    wrapper.id = `node-wrapper-${idx}`;
    
    const isActive = state.currentStage === idx;
    const isPassed = state.currentStage > idx;
    const isLocked = state.currentStage < idx;
    
    if (isActive) wrapper.classList.add('active');
    else if (isPassed) wrapper.classList.add('passed');
    else wrapper.classList.add('locked');
    
    wrapper.innerHTML = `
      <div class="quest-node" onclick="handleNodeClick(${idx})">${idx + 1}</div>
      <div class="node-label">${q.locationName}</div>
    `;
    
    nodesContainer.appendChild(wrapper);
  });
}

function handleNodeClick(idx) {
  if (idx !== state.currentStage) return; // Only allow clicking active node
  openLocationModal(idx);
}

function updateAvatarPosition() {
  const currentQ = quizData[state.currentStage];
  if (!currentQ) return;
  
  studentAvatar.style.left = currentQ.mapCoords.left;
  studentAvatar.style.top = currentQ.mapCoords.top;
  avatarSpeech.textContent = currentQ.dialogText;
  
  // Make speech bubble pop
  avatarSpeech.style.animation = 'none';
  void avatarSpeech.offsetWidth; // trigger reflow
  avatarSpeech.style.animation = 'bubblePop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
}

function updateSVGPaths() {
  const mapRect = gridMap.getBoundingClientRect();
  
  let allPoints = [];
  quizData.forEach(q => {
    // Parse percentage to pixels
    const pxLeft = (parseFloat(q.mapCoords.left) / 100) * mapRect.width;
    const pxTop = (parseFloat(q.mapCoords.top) / 100) * mapRect.height;
    allPoints.push(`${pxLeft} ${pxTop}`);
  });
  
  if (allPoints.length > 1) {
    mapActivePath.setAttribute("d", `M ${allPoints.join(" L ")}`);
  }
  
  const passedPoints = allPoints.slice(0, state.currentStage + 1);
  if (passedPoints.length > 1) {
    mapProgressPath.setAttribute("d", `M ${passedPoints.join(" L ")}`);
  } else {
    mapProgressPath.setAttribute("d", "");
  }
}

// ---- Modal Logic ----

function openLocationModal(idx) {
  const q = quizData[idx];
  
  // Update Modal Content
  document.getElementById("modalLocationPhoto").src = q.locationImg;
  document.getElementById("modalLocationTitle").textContent = q.locationName;
  document.getElementById("modalQId").textContent = `Q${q.id}`;
  
  document.getElementById("modalQText").textContent = q.question;
  document.getElementById("modalOptA").textContent = q.optionA;
  document.getElementById("modalOptB").textContent = q.optionB;
  
  // Reset States
  document.getElementById("qaState").classList.remove("hidden-state");
  document.getElementById("qaState").classList.add("active-state");
  document.getElementById("resultState").classList.remove("active-state");
  document.getElementById("resultState").classList.add("hidden-state");
  
  // Hide Map Button globally initially
  document.getElementById("mapBtn").classList.add("hidden");
  
  // Show Modal
  locationModal.classList.remove("hidden");
}

function selectOption(choice) {
  const q = quizData[state.currentStage];
  
  // Hide QA State, Show Result State
  document.getElementById("qaState").classList.remove("active-state");
  document.getElementById("qaState").classList.add("hidden-state");
  
  document.getElementById("resultState").classList.remove("hidden-state");
  document.getElementById("resultState").classList.add("active-state");
  
  // Set appropriate explanation text
  if (choice === 'A') {
    document.getElementById("modalExplanationA").style.display = "block";
    document.getElementById("modalExplanationA").innerText = q.explanationA;
    document.getElementById("modalExplanationB").style.display = "none";
  } else {
    document.getElementById("modalExplanationA").style.display = "none";
    document.getElementById("modalExplanationB").style.display = "block";
    document.getElementById("modalExplanationB").innerText = q.explanationB;
  }
  
  // Show map action button if this question has one configured
  if (q.mapAction) {
    const btn = document.getElementById("mapBtn");
    btn.classList.remove("hidden");
    document.getElementById("mapBtnText").textContent = q.mapAction.name;
    // Set the image src to global variable so the map viewer knows what to show
    window.currentMapImgSrc = q.mapAction.img;
  } else {
    document.getElementById("mapBtn").classList.add("hidden");
  }
}

function backToOptions() {
  // Hide Result State, Show QA State
  document.getElementById("resultState").classList.remove("active-state");
  document.getElementById("resultState").classList.add("hidden-state");
  
  document.getElementById("qaState").classList.remove("hidden-state");
  document.getElementById("qaState").classList.add("active-state");
}

function closeLocationModal() {
  locationModal.classList.add("hidden");
  
  // Advance state
  state.currentStage++;
  
  if (state.currentStage < quizData.length) {
    document.getElementById("currentStageNum").textContent = state.currentStage + 1;
    renderMapNodes();
    updateAvatarPosition();
    updateSVGPaths();
  } else {
    // End of game
    setTimeout(() => {
      summaryOverlay.classList.remove("hidden");
    }, 1000); 
  }
}

// Full screen map viewer
function openMapModal() {
  if (window.currentMapImgSrc) {
    fullMapImg.src = window.currentMapImgSrc;
    fullMapModal.classList.remove("hidden");
  }
}

function closeMapModal() {
  fullMapModal.classList.add("hidden");
}
