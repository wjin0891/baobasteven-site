import os
import requests

# 读取 base64 编码
with open('/tmp/ashley_massage.txt', 'r') as f:
    base64_content = f.read().strip()

# GitHub 配置
GITHUB_REPO = "wjin0891/baobasteven-site"
GITHUB_API_BASE = "https://api.github.com"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

# 上传图片到 retail 目录
url = f"{GITHUB_API_BASE}/repos/{GITHUB_REPO}/contents/client/public/assets/images/listings/retail/ashley-massage-rosemead-1.jpg"
data = {
    "message": "上传 Ashley 中医按摩房源图片",
    "content": base64_content
}

response = requests.put(url, headers=headers, json=data)
if response.status_code == 200:
    print("✅ 图片上传成功！")
    print(f"   文件路径: client/public/assets/images/listings/retail/ashley-massage-rosemead-1.jpg")
    print(f"   Commit SHA: {response.json().get('commit', {}).get('sha')}")
else:
    print(f"❌ 上传失败: {response.status_code}")
    print(f"   Response: {response.text}")
