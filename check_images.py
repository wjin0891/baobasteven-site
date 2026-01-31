import os
import requests

GITHUB_REPO = "wjin0891/baobasteven-site"
GITHUB_API_BASE = "https://api.github.com"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

url = f"{GITHUB_API_BASE}/repos/{GITHUB_REPO}/contents/client/public/assets/images"
response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print("📂 client/public/assets/images/ 目录内容：\n")
    for item in data:
        print(f"  📄 {item['name']} ({item['size']} bytes)")
        print(f"     SHA: {item['sha'][:16]}...")
        print()
else:
    print(f"❌ 读取失败: {response.text}")
