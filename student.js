// 學生端 WebRTC 連線與投票邏輯
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
  const urlParams = new URLSearchParams(window.location.search);
  const hostId = urlParams.get("hostId");

  // 初始化 Peer
  peer = new Peer({
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
  if (!conn || !conn.open) {
    alert("與大螢幕連線中斷，無法投票！");
    return;
  }
  if (myVotes[currentQuestionIndex]) {
    alert("本題您已經投過票囉！");
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
