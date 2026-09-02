// 學生端 Firebase 即時投票邏輯（取代原先的 PeerJS WebRTC 連線）
const firebaseConfig = {
  apiKey: "AIzaSyAc-azy0N3M8kZ07nILXsNMd9Kpx9eSI58",
  authDomain: "star-kids-quiz.firebaseapp.com",
  databaseURL: "https://star-kids-quiz-default-rtdb.firebaseio.com",
  projectId: "star-kids-quiz",
  appId: "1:647348054589:web:064fa569735f38e9095854"
};
const FB_ROOT = "slp115";

let db = null;
let state = { currentQuestion: 0, revealed: {}, voteClosed: {}, round: 0 };
let fbVotes = {};

// 每位學生的裝置 ID 與投票紀錄（key 含回合數，老師重新挑戰後可再投票）
const CID = (() => {
  let id = localStorage.getItem('slp_cid');
  if (!id) {
    id = 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    localStorage.setItem('slp_cid', id);
  }
  return id;
})();
let myVotes = {};
try { myVotes = JSON.parse(localStorage.getItem('slp_myvotes') || '{}'); } catch (e) { myVotes = {}; }
const vkey = () => state.round + '#' + state.currentQuestion;

// 題目資料（與教師端投影同步的 10 題）
const QUESTIONS = [
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
    meme: "💬 語言 (Language)：腦袋裡的詞彙與語法理解\n🗣️ 說話 (Speech)：肌肉發出的聲音與流暢度\n🍽️ 吞嚥 (Swallowing)：食物從口中送入胃的生理过程\n🔥 兩者皆是語言治療師的核心專業！"
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
    meme: "🧸 學生想像的語言治療師: 跟小孩玩 ➔ 陪大人聊天 ➔ 準時打卡下班\n💻 真正的語言治療師: 治療 ➔ 寫紀錄 ➔ 製作教材 ➔ 家長諮詢 ➔ 與醫師/老師開會 ➔ 繼續寫病歷"
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

// DOM 元素選取
const connStatus = document.getElementById("connStatus");
const activeQuizArea = document.getElementById("activeQuizArea");
const qNum = document.getElementById("qNum");
const qText = document.getElementById("qText");
const optionsContainer = document.getElementById("optionsContainer");
const btnOptA = document.getElementById("btnOptA");
const btnOptB = document.getElementById("btnOptB");
const labelOptA = document.getElementById("labelOptA");
const labelOptB = document.getElementById("labelOptB");
const voteFeedback = document.getElementById("voteFeedback");
const studentExplanation = document.getElementById("studentExplanation");
const evalTitle = document.getElementById("evalTitle");
const studentExplanationText = document.getElementById("studentExplanationText");
const studentMeme = document.getElementById("studentMeme");
const liveBarA = document.getElementById("liveBarA");
const liveBarB = document.getElementById("liveBarB");
const liveCountA = document.getElementById("liveCountA");
const liveCountB = document.getElementById("liveCountB");
const liveTotal = document.getElementById("liveTotal");

// 頁面初始化：連上 Firebase 並監聽狀態與票數
window.addEventListener("DOMContentLoaded", () => {
  firebase.initializeApp(firebaseConfig);
  db = firebase.database();

  db.ref('.info/connected').on('value', (snap) => {
    if (snap.val()) {
      connStatus.textContent = '🟢 已連線，等老師出題就可以投票！';
      connStatus.className = 'student-status-indicator correct';
    } else {
      connStatus.textContent = '🔴 連線中斷，請檢查網路或重新整理！';
      connStatus.className = 'student-status-indicator incorrect';
    }
  });

  db.ref(FB_ROOT + '/state').on('value', (snap) => {
    const v = snap.val();
    if (v) {
      state.currentQuestion = v.currentQuestion || 0;
      state.revealed = v.revealed || {};
      state.voteClosed = v.voteClosed || {};
      state.round = v.round || 0;
    }
    render();
  });

  db.ref(FB_ROOT + '/votes').on('value', (snap) => {
    fbVotes = snap.val() || {};
    render();
  });
});

// 統計某一題的票數
function tally(idx) {
  const t = { A: 0, B: 0 };
  const q = fbVotes[idx];
  if (q) {
    Object.keys(q).forEach((cid) => {
      if (q[cid] === 'A') t.A++;
      else if (q[cid] === 'B') t.B++;
    });
  }
  return t;
}

// 依據目前狀態渲染畫面
function render() {
  const idx = state.currentQuestion;
  const q = QUESTIONS[idx];
  if (!q) return;

  activeQuizArea.style.display = 'block';
  qNum.textContent = 'Q' + q.id;
  qText.textContent = q.question;
  labelOptA.textContent = q.optionA;
  labelOptB.textContent = q.optionB;

  const mine = myVotes[vkey()];
  const closed = !!state.voteClosed[idx];
  const revealed = !!state.revealed[idx];

  if (revealed) {
    showExplanation(q.correct, q.explanation, q.meme);
  } else if (mine) {
    showVotedFeedback(mine);
  } else if (closed) {
    showVoteClosed();
  } else {
    resetChoiceUI();
  }

  updateLiveResults();
}

// 重設投票選項 UI
function resetChoiceUI() {
  optionsContainer.style.display = 'block';
  btnOptA.className = 'student-card';
  btnOptB.className = 'student-card';
  voteFeedback.style.display = 'none';
  studentExplanation.style.display = 'none';
}

// 更新即時投票長條圖
function updateLiveResults() {
  const idx = state.currentQuestion;
  const t = tally(idx);
  const total = t.A + t.B;
  const pctA = total ? Math.round((t.A / total) * 100) : 0;
  const pctB = total ? 100 - pctA : 0;
  liveBarA.style.width = pctA + '%';
  liveBarB.style.width = pctB + '%';
  liveCountA.textContent = t.A + ' 票・' + pctA + '%';
  liveCountB.textContent = t.B + ' 票・' + pctB + '%';
  liveTotal.textContent = '共 ' + total + ' 票';
}

// 提交投票（直接寫入 Firebase）
function submitVote(option) {
  const idx = state.currentQuestion;
  if (myVotes[vkey()]) {
    alert('本題您已經投過票囉！');
    return;
  }
  if (state.voteClosed[idx] || state.revealed[idx]) {
    showVoteClosed();
    return;
  }
  if (!db) {
    alert('尚未連線完成，請稍候再試！');
    return;
  }

  // 暫時鎖定按鈕防止連點
  btnOptA.className = 'student-card disabled';
  btnOptB.className = 'student-card disabled';

  db.ref(FB_ROOT + '/votes/' + idx + '/' + CID).set(option)
    .then(() => {
      myVotes[vkey()] = option;
      localStorage.setItem('slp_myvotes', JSON.stringify(myVotes));
      render();
    })
    .catch((err) => {
      console.error('Vote error:', err);
      alert('投票失敗，請檢查網路後重試！');
      btnOptA.className = 'student-card';
      btnOptB.className = 'student-card';
    });
}

// 顯示投票成功回饋
function showVotedFeedback(chosenOption) {
  optionsContainer.style.display = 'none';
  voteFeedback.style.display = 'block';
  voteFeedback.textContent = '📥 您已投給：【選項 ' + chosenOption + '】，請等待老師公佈答案...';
}

// 顯示投票截止狀態
function showVoteClosed() {
  btnOptA.className = 'student-card disabled';
  btnOptB.className = 'student-card disabled';
  voteFeedback.style.display = 'block';
  voteFeedback.textContent = '🚫 本題投票已截止，未投出票數。';
}

// 展示答案公佈結果與解析
function showExplanation(correctOption, explanation, meme) {
  optionsContainer.style.display = 'none';
  voteFeedback.style.display = 'none';

  const myChoice = myVotes[vkey()];

  if (myChoice) {
    if (myChoice === correctOption) {
      evalTitle.textContent = '🎉 答對了！做得好！';
      evalTitle.style.color = 'var(--accent-green-dark)';
      studentExplanation.className = 'explanation-section open';
      studentExplanation.style.backgroundColor = 'var(--accent-green)';
    } else {
      evalTitle.textContent = '❌ 答錯了！這題是陷阱喔！';
      evalTitle.style.color = 'var(--accent-red-dark)';
      studentExplanation.className = 'explanation-section open';
      studentExplanation.style.backgroundColor = 'var(--accent-red)';
    }
  } else {
    // 沒投票
    evalTitle.textContent = '💡 正確答案是 【' + correctOption + '】';
    evalTitle.style.color = 'var(--text-main)';
    studentExplanation.className = 'explanation-section open';
    studentExplanation.style.backgroundColor = 'var(--accent-yellow)';
  }

  studentExplanationText.textContent = explanation;
  studentMeme.textContent = meme;
  studentExplanation.style.display = 'block';
}
