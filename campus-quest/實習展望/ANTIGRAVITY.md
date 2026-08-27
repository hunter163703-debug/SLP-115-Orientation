# ANTIGRAVITY 專案規則檔 — 臺灣語言治療臨床實習地圖

## 專案基本資訊
- **專案名稱**：臺灣語言治療臨床實習地圖 (Taiwan SLP Internship Map)
- **主要用途**：115 新生定向與臨床實習展望導覽系統，彙整全臺 26 家語言治療實習醫院資訊、已去識別化環境照片及實習成果發表影片。
- **線上正式雲端網址**：https://hunter163703-debug.github.io/Taiwan-SLP-Internship-Map/
- **GitHub 儲存庫**：
  - 獨立儲存庫：`hunter163703-debug/Taiwan-SLP-Internship-Map`
  - 主專案目錄：`hunter163703-debug/SLP-115-Orientation` (路徑：`campus-quest/實習展望/`)

## 核心安全規範
1. **去識別化與隱私保護**：
   - 嚴禁於環境照片、文字記事本或程式碼中揭露學生真實姓名、督導老師真實姓名與敏感個資。
   - 所有照片之姓名區域均須以白色實心遮蔽覆蓋。
2. **大檔防護**：
   - 專案目錄中的原始大檔（如 `.mp4`、`.mov`、`.pdf`）必須透過 `.gitignore` 排除，嚴禁推送至 GitHub（避免觸發 100MB 限制）。
   - 影片一律採用 YouTube 嵌入式串流播放。
3. **頁碼無干擾原則**：
   - 網頁介面與資料庫中嚴格濾除任何投影片頁碼標記（如 `[第 X 頁]`）。

## 開工與收工規範
- **開工**：依序讀取 `ANTIGRAVITY.md` 與進度筆記，執行 `git status` 檢查，匯報狀態並提出下一步建議，不自動推送。
- **收工**：嚴格執行敏感資料檢查、更新進度與踩坑紀錄、比對 `git diff`、確認後 stage 與 commit / push。
