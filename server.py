import os
import json
import socket
from http.server import SimpleHTTPRequestHandler, HTTPServer

# 儲存全域投票與授課狀態
quiz_state = {
    "currentQuestion": 0,
    "revealed": False,
    "voteClosed": False,
    "votes": {}  # 格式: { "0": {"A": 0, "B": 0}, "1": {"A": 0, "B": 0}, ... }
}

# 用於去重的 IP 記錄，防止同一題重複投票
client_voted_ips = {} # 格式: { "0": ["192.168.1.101", ...], "1": ... }

class CoPresentationHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # 允許跨域 (CORS) 與無緩存
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_GET(self):
        global quiz_state
        if self.path == '/api/state':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(quiz_state).encode('utf-8'))
        else:
            # 預設託管資料夾內的所有靜態檔案 (index.html, student.html, style.css...)
            super().do_GET()

    def do_POST(self):
        global quiz_state, client_voted_ips
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode('utf-8')
        
        try:
            data = json.loads(post_data)
        except:
            self.send_response(400)
            self.end_headers()
            return

        client_ip = self.client_address[0]

        if self.path == '/api/vote':
            # 學生手機投票
            q_idx = str(quiz_state["currentQuestion"])
            option = data.get("option") # 'A' or 'B'
            
            # 檢查本題是否已截止或已公佈答案
            if quiz_state["voteClosed"] or quiz_state["revealed"]:
                self.send_response(403)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "rejected", "reason": "本題投票已截止"}).encode('utf-8'))
                return

            if q_idx not in quiz_state["votes"]:
                quiz_state["votes"][q_idx] = {"A": 0, "B": 0}
            if q_idx not in client_voted_ips:
                client_voted_ips[q_idx] = []

            # 去重防刷票：檢查該 IP 是否在此題投過
            if client_ip in client_voted_ips[q_idx]:
                self.send_response(403)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "rejected", "reason": "此手機在此題已經投過票囉！"}).encode('utf-8'))
                return

            # 計票
            if option in ["A", "B"]:
                quiz_state["votes"][q_idx][option] += 1
                client_voted_ips[q_idx].append(client_ip)
                
                # 自動判定 50 票截止邏輯
                total = quiz_state["votes"][q_idx]["A"] + quiz_state["votes"][q_idx]["B"]
                if total >= 50:
                    quiz_state["voteClosed"] = True

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "confirmed", "option": option}).encode('utf-8'))
            else:
                self.send_response(400)
                self.end_headers()

        elif self.path == '/api/control':
            # 老師投影大螢幕端控制 (切換題目或公佈答案)
            action = data.get("action")
            
            if action == "change_question":
                new_idx = data.get("index")
                quiz_state["currentQuestion"] = new_idx
                quiz_state["revealed"] = False
                
                q_idx = str(new_idx)
                if q_idx not in quiz_state["votes"]:
                    quiz_state["votes"][q_idx] = {"A": 0, "B": 0}
                total = quiz_state["votes"][q_idx]["A"] + quiz_state["votes"][q_idx]["B"]
                quiz_state["voteClosed"] = total >= 50
                
            elif action == "reveal_answer":
                quiz_state["revealed"] = True
                quiz_state["voteClosed"] = True
                
            elif action == "restart":
                quiz_state = {
                    "currentQuestion": 0,
                    "revealed": False,
                    "voteClosed": False,
                    "votes": {}
                }
                client_voted_ips.clear()

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok"}).encode('utf-8'))

def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('10.254.254.254', 1))
        ip = s.getsockname()[0]
    except:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

if __name__ == '__main__':
    ip = get_ip()
    port = 8000
    server = HTTPServer(('0.0.0.0', port), CoPresentationHandler)
    server.serve_forever()
