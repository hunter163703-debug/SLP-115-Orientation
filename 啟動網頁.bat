@echo off
chcp 65001 > nul
echo ======================================================
echo   聽語系新生定向互動投票網頁 - 本地區域網路伺服器
echo ======================================================
echo.

:: 使用 PowerShell 取得本機的有效實體 IP 位址 (排除 127.0.0.1 與虛擬網卡)
for /f "usebackq tokens=*" %%i in (`powershell -Command "(Get-NetIPAddress | Where-Object { $_.AddressState -eq 'Preferred' -and $_.AddressFamily -eq 'IPv4' -and $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' -and $_.InterfaceAlias -notlike '*Loopback*' } | Select-Object -ExpandProperty IPAddress | Select-Object -First 1)"`) do (
    set MY_IP=%%i
)

if "%MY_IP%"=="" (
    echo [警告] 未能取得有效的區域網路 IP，將使用 localhost。學生可能無法連線投票。
    set MY_IP=localhost
) else (
    echo [資訊] 偵測到您的本機 IP 為: %MY_IP%
    echo [提醒] 請確保學生手機與此電腦連接在同一個學校/課堂 Wi-Fi 底下。
)

echo.
echo 正在背景啟動 HTTP 伺服器 (通訊埠 8000)...
:: 啟動 Python HTTP 伺服器並綁定 0.0.0.0 讓外網/區域網路可存取
start /b python -m http.server 8000 --bind 0.0.0.0 > nul 2>&1

:: 等待一秒讓伺服器完全就緒
timeout /t 2 /nobreak > nul

echo 正在開啟教師投影大螢幕端網頁...
start "" "http://%MY_IP%:8000/index.html"

echo.
echo ======================================================
echo   伺服器已啟動！請勿關閉此視窗，否則投票網頁將無法運作。
echo   要關閉伺服器時，請直接關閉此命令提示字元視窗。
echo ======================================================
pause
