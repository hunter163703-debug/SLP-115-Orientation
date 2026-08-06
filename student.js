// 學生端 WebRTC 連線與投票邏輯
const isLocalMode = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' || 
                     window.location.hostname.match(/^\d+\.\d+\.\d+\.\d+$/);

let peer = null;
let conn = null;
let currentQuestionIndex = null;
let currentQuestionData = null;
let myVotes = {}; // 紀錄學生自己在本地投過的選項：{ questionIndex: 'A' or 'B' }

// DOM 元素選取
const connStatus = document.getElementById("connStatus");
const manualConnectBox = document.getElementById("manualConnectBox");
const manualCodeInput = document.getElementById("manualCodeInput");
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

// 頁面初始化
window.addEventListener("DOMContentLoaded", () => {
  if (isLocalMode) {
    connStatus.textContent = "🟢 本地連線已建立 (區域網輪詢)";
    connStatus.className = "student-status-indicator correct";
    manualConnectBox.style.display = "none";
    activeQuizArea.style.display = "block";
    
    setupLocalClientPolling();
  } else {
    const urlParams = new URLSearchParams(window.location.search);
    const hostId = urlParams.get("hostId");

    // 初始化 Peer，明確設定 wss 443 埠與 STUN 伺服器
    peer = new Peer({
      host: '0.peerjs.com',
      port: 443,
      secure: true,
      pingInterval: 3000,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' }
        ]
      },
      debug: 1
    });

    peer.on("open", (id) => {
      console.log("Student Peer opened with ID:", id);
      if (hostId) {
        connectToHost(hostId);
      } else {
        // 顯示手動輸入代碼連線框
        connStatus.textContent = "📲 請手動輸入大螢幕連線代碼";
        manualConnectBox.style.display = "block";
      }
    });

    peer.on("error", (err) => {
      console.error("PeerJS Client Error:", err);
      connStatus.textContent = "❌ 連線錯誤，請刷新網頁！";
      connStatus.className = "student-status-indicator incorrect";
    });
  }
});

// 手動輸入房間代碼連線
function connectManually() {
  const code = manualCodeInput.value.trim().toUpperCase();
  if (code.length === 4) {
    const hostId = `SLP-${code}`;
    connectToHost(hostId);
  } else {
    alert("請輸入完整的 4 位數代碼！");
  }
}

// 與 Host (投影幕) 建立連線
function connectToHost(hostId) {
  connStatus.textContent = `🔌 正在連線至大螢幕 [${hostId}]...`;
  connStatus.className = "student-status-indicator";

  conn = peer.connect(hostId, {
    reliable: true
  });

  conn.on("open", () => {
    console.log("Connected to Teacher Host:", hostId);
    connStatus.textContent = "🟢 已成功連線至投影大螢幕！";
    connStatus.className = "student-status-indicator correct";
    
    // 隱藏手動輸入區域
    manualConnectBox.style.display = "none";
    activeQuizArea.style.display = "block";
  });

  conn.on("data", (data) => {
    handleServerMessage(data);
  });

  conn.on("close", () => {
    console.log("Connection closed by Host");
    connStatus.textContent = "🔴 與教師投影幕連線中斷！";
    connStatus.className = "student-status-indicator incorrect";
    activeQuizArea.style.display = "none";
    manualConnectBox.style.display = "block";
  });
}

// 處理來自教師大螢幕 (Host) 的指令
function handleServerMessage(data) {
  console.log("Received server data:", data);

  switch (data.type) {
    case "SYNC":
    case "CHANGE_QUESTION":
      currentQuestionIndex = data.currentQuestion;
      currentQuestionData = data.question;
      
      // 更新題目文字與選項文字
      qNum.textContent = `Q${currentQuestionData.id}`;
      qText.textContent = currentQuestionData.question;
      labelOptA.textContent = currentQuestionData.optionA;
      labelOptB.textContent = currentQuestionData.optionB;

      // 重設 UI
      btnOptA.className = "student-card";
      btnOptB.className = "student-card";
      optionsContainer.style.display = "block";
      voteFeedback.style.display = "none";
      studentExplanation.style.display = "none";

      // 檢查此人在此題是否投過票
      // 伺服器發送的 data.chosen 是針對此生的連線歷史，我們也結合本地緩存 myVotes
      const myChoice = data.chosen || myVotes[currentQuestionIndex];
      
      if (myChoice) {
        // 如果已投票
        myVotes[currentQuestionIndex] = myChoice; // 同步緩存
        showVotedFeedback(myChoice);
      } else if (data.voteClosed) {
        // 如果未投票但投票已被老師或人數截止
        showVoteClosed();
      }

      // 檢查是否已公佈答案
      if (data.revealed) {
        showExplanation(data.correct, data.explanation, data.meme);
      }
      break;

    case "STOP_VOTE":
      if (data.questionIdx === currentQuestionIndex) {
        // 若此題投票截止，且該生仍未投票，鎖定投票按鈕
        if (!myVotes[currentQuestionIndex]) {
          showVoteClosed();
        }
      }
      break;

    case "REVEAL_ANSWER":
      if (data.questionIdx === currentQuestionIndex) {
        showExplanation(data.correct, data.explanation, data.meme);
      }
      break;

    case "VOTE_CONFIRMED":
      // 投票被 Host 收理並確認
      myVotes[currentQuestionIndex] = data.option;
      showVotedFeedback(data.option);
      break;

    case "VOTE_REJECTED":
      alert(`投票失敗：${data.reason}`);
      // 恢復按鈕狀態
      btnOptA.classList.remove("disabled");
      btnOptB.classList.remove("disabled");
      break;
  }
}

// 提交投票
function submitVote(option) {
  if (myVotes[currentQuestionIndex]) {
    alert("本題您已經投過票囉！");
    return;
  }

  if (isLocalMode) {
    // 本地模式：發送 API 投票
    btnOptA.className = "student-card disabled";
    btnOptB.className = "student-card disabled";

    fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ option: option })
    })
    .then(res => {
      if (res.ok) {
        myVotes[currentQuestionIndex] = option;
        showVotedFeedback(option);
      } else {
        res.json().then(errData => {
          alert(`投票失敗：${errData.reason || '伺服器拒絕'}`);
          btnOptA.classList.remove("disabled");
          btnOptB.classList.remove("disabled");
        });
      }
    })
    .catch(err => {
      console.error("Vote API error:", err);
      alert("無法連上本地伺服器投開票，請檢查 Wi-Fi 連線！");
      btnOptA.classList.remove("disabled");
      btnOptB.classList.remove("disabled");
    });
  } else {
    // 雲端 WebRTC 模式
    if (!conn || !conn.open) {
      alert("與大螢幕連線中斷，無法投票！");
      return;
    }
    // 暫時鎖定按鈕防止連點
    btnOptA.className = "student-card disabled";
    btnOptB.className = "student-card disabled";

    // 發送投票指令
    conn.send({
      type: "VOTE",
      option: option
    });
  }
}

// 顯示投票成功回饋
function showVotedFeedback(chosenOption) {
  optionsContainer.style.display = "none";
  voteFeedback.style.display = "block";
  voteFeedback.textContent = `📥 您已投給：【選項 ${chosenOption}】，請等待老師公佈答案...`;
}

// 顯示投票截止狀態
function showVoteClosed() {
  btnOptA.className = "student-card disabled";
  btnOptB.className = "student-card disabled";
  voteFeedback.style.display = "block";
  voteFeedback.textContent = "🚫 本題投票已截止，未投出票數。";
}

// 展示答案公佈結果與解析
function showExplanation(correctOption, explanation, meme) {
  optionsContainer.style.display = "none";
  voteFeedback.style.display = "none";

  const myChoice = myVotes[currentQuestionIndex];
  
  if (myChoice) {
    if (myChoice === correctOption) {
      evalTitle.textContent = "🎉 答對了！做得好！";
      evalTitle.style.color = "var(--accent-green-dark)";
      studentExplanation.className = "explanation-section open";
      studentExplanation.style.backgroundColor = "var(--accent-green)";
    } else {
      evalTitle.textContent = "❌ 答錯了！這題是陷阱喔！";
      evalTitle.style.color = "var(--accent-red-dark)";
      studentExplanation.className = "explanation-section open";
      studentExplanation.style.backgroundColor = "var(--accent-red)";
    }
  } else {
    // 沒投票
    evalTitle.textContent = `💡 正確答案是 【${correctOption}】`;
    evalTitle.style.color = "var(--text-main)";
    studentExplanation.className = "explanation-section open";
    studentExplanation.style.backgroundColor = "var(--accent-yellow)";
  }

  studentExplanationText.textContent = explanation;
  studentMeme.textContent = meme;
  studentExplanation.style.display = "block";
}

// 本地模式：學生端 API 輪詢狀態
let clientPollingTimer = null;
const quizData = [
  { id: 1, question: "學語言治療的小孩，是不是長大就一定會說話？", optionA: "沒錯！長大自然就會了", optionB: "不一定！需針對性評估與介入" },
  { id: 2, question: "語言治療師的工作，僅僅是教講話不清楚的人講話嗎？", optionA: "對，就是俗稱的「剪舌頭」與發音練習", optionB: "不只！還包含吞嚥、聽覺復健與嗓音治療" },
  { id: 3, question: "如果家人中風後「吃東西會嗆咳」，應該看哪一個專業？", optionA: "復健科醫師與語言治療師 (吞嚥介入)", optionB: "耳鼻喉科醫師或營養師即可" },
  { id: 4, question: "幼兒「臭乳呆」說話不清楚，幾歲是接受語言治療的黃金期？", optionA: "四歲左右 (構音發展漸趨成熟後)", optionB: "越早越好，一歲就該去上課" },
  { id: 5, question: "口吃 (講話結巴) 的人，是因為喉嚨有問題或太緊張嗎？", optionA: "是的，多深呼吸放鬆就沒事了", optionB: "不是！口吃涉及神經、語言等多重因素" },
  { id: 6, question: "戴上助聽器後，聽損的小孩就能立刻像常人一樣聽懂說話嗎？", optionA: "可以，聽得到就代表聽得懂", optionB: "不行！還需要長期的「聽覺言語復健」" },
  { id: 7, question: "喉嚨沙啞 (如老師、歌手失聲)，語言治療師能幫上忙嗎？", optionA: "沒辦法，這需要動手術或吃藥", optionB: "可以！能進行「嗓音治療」與用聲衛教" },
  { id: 8, question: "發展遲緩的小孩，只要一直跟他說話，他就會開口嗎？", optionA: "會的，刺激夠多自然就會開口", optionB: "不夠！必須引導口語表達與社交互動溝通" },
  { id: 9, question: "語言治療師主要在哪裡服務？", optionA: "只限於各大醫院的復健科", optionB: "醫院、診所、特教學校與居家照護機構" },
  { id: 10, question: "要成為合格 of 語言治療師，需要具備什麼條件？", optionA: "相關學系畢業並通過國家專門職業專技高考", optionB: "修完相關學分並拿到推廣教育證書即可" }
];

function setupLocalClientPolling() {
  if (clientPollingTimer) clearInterval(clientPollingTimer);
  pollLocalClientState();
  clientPollingTimer = setInterval(pollLocalClientState, 800);
}

function pollLocalClientState() {
  fetch('/api/state')
    .then(res => res.json())
    .then(data => {
      const serverIdx = data.currentQuestion;
      
      // 如果伺服器的題目索引改變了，重置學生端 UI
      if (currentQuestionIndex !== serverIdx) {
        currentQuestionIndex = serverIdx;
        currentQuestionData = quizData[serverIdx];
        
        qNum.textContent = `Q${currentQuestionData.id}`;
        qText.textContent = currentQuestionData.question;
        labelOptA.textContent = currentQuestionData.optionA;
        labelOptB.textContent = currentQuestionData.optionB;

        btnOptA.className = "student-card";
        btnOptB.className = "student-card";
        optionsContainer.style.display = "block";
        voteFeedback.style.display = "none";
        studentExplanation.style.display = "none";
      }

      // 同步投票結果與截止狀態
      const myChoice = myVotes[currentQuestionIndex];
      if (myChoice) {
        showVotedFeedback(myChoice);
      } else if (data.voteClosed) {
        showVoteClosed();
      }

      // 同步解析與答案公佈
      if (data.revealed) {
        // 本地端補齊對應的答案解析
        const q = currentQuestionData;
        const explanations = [
          { correct: "B", explanation: "說話是複雜的皮質整合過程。許多遲緩幼兒或有神經損傷者，長大後依然需要經過個別化的治療設計與溝通輔助系統 (AAC)，才能建立自主口語能力。", meme: "💡 孩子不是小盆栽，每天澆水 (聽大人說話) 就會自動發芽長大喔！專業的早期評估與介入才是關鍵。" },
          { correct: "B", explanation: "語言治療學系主要涵蓋六大範疇：構音、聲音、口吃、吞嚥、語言與聽覺復健。我們協助人們吃得安全、說得清楚、聽得明白！", meme: "💡 喉嚨痛找耳鼻喉科，但吃不下飯 (吞嚥困難)、說不出話 (嗓音障礙)，那就是我們的超人守護領域了！" },
          { correct: "A", explanation: "中風病患常伴隨「吸入性肺炎」致死風險，這是因為吞嚥肌群失調。語言治療師會進行吞嚥功能評估，設計安全進食質地與吞嚥手法訓練。", meme: "💡 每一次吸入性嗆咳，都是在和肺炎死神拔河。守護這份吃東西的尊嚴，我們當仁不讓！" },
          { correct: "A", explanation: "絕大多數構音器官與生理發展在 3 歲半到 4 歲左右漸趨成熟，因此 4 歲是精準診斷與介入構音異常 (臭乳呆) 的黃金時期。", meme: "💡 2歲講「草莓」講成「倒楣」很可愛，但到了4歲如果講「去學校」還是講成「去學小」，那就需要找專業評估囉！" },
          { correct: "B", explanation: "口吃並非因呼吸急促或緊張引起，它與大腦運動神經控制、語言規劃能力有關。過度的「放鬆」勸導往往會增加個案心理負擔。", meme: "💡 拜託不要再對結巴的人說「你放鬆慢慢講」了！這只會讓他們對自己的口語缺陷更加敏感和緊張喔。" },
          { correct: "B", explanation: "助聽器僅是把「音量放大」，大腦的聽覺皮質已許久未受刺激，需要進行長期的「聽覺言語法 (AVT)」訓練，重新學習聽音與辨音。", meme: "💡 這就像是配了高度近視眼鏡，但大腦還是需要重新適應和看懂這個世界是同一個道理。" },
          { correct: "B", explanation: "長期用聲不當會導致聲帶結節或息肉。語言治療師會設計專業嗓音訓練，協助聲樂家、老師、客服人員以正確共鳴位置發聲。", meme: "💡 吼叫一時爽，嗓子火葬場。教你怎麼不費力地「大聲說愛」，正是我們的拿手好戲。" },
          { correct: "B", explanation: "語言發展遲緩需要的是「功能性溝通情境」，而非成人單方面的資訊刺激。透過互動引導、手勢、視覺支持 (AAC) 來激發主動表達意圖。", meme: "💡 在孩子身邊像個收音機一樣一直碎碎念是沒用的，要建立雙向互動、共同關注，才是大腦語言區開展的鑰匙。" },
          { correct: "B", explanation: "除了各大醫院，語言治療師大量服務於社區復健科診所、特教學校、早期療育機構、行動長照居家照護團隊，甚至包含高齡衰弱防跌預防領域。", meme: "💡 只要有人類需要溝通與吞嚥的地方，就有我們用專業傳遞溫暖的身影！" },
          { correct: "A", explanation: "語言治療師是國家高階醫事專技人員。必須完成教育部認可的聽語學系四年學士或碩士學位與規定時數實習，並考取專技高考語言治療師證照始得執業。", meme: "💡 這張高考合格證書，是我們用無數個實習熬夜的夜晚與精準專業能力換來的專業徽章！" }
        ];
        const currentExp = explanations[currentQuestionIndex];
        showExplanation(currentExp.correct, currentExp.explanation, currentExp.meme);
      }
    })
    .catch(err => console.error("Poll local client state error:", err));
}
