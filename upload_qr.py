import base64
import json
import os
import requests

# GitHub 配置
GITHUB_REPO = "wjin0891/baobasteven-site"
GITHUB_API_BASE = "https://api.github.com"

# 读取 base64 编码
with open('/tmp/wechat_qr.txt', 'r') as f:
    base64_content = f.read().strip()

# 准备上传数据
url = f"{GITHUB_API_BASE}/repos/{GITHUB_REPO}/contents/client/public/assets/images/wechat-qr.jpg"
headers = {
    "Authorization": f"token {os.getenv('GITHUB_TOKEN')}",
    "Accept": "application/vnd.github.v3+json"
}

upload_data = {
    "message": "上传微信二维码图片",
    "content": base64_content
}

response = requests.put(url, headers=headers, json=upload_data)
print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")
