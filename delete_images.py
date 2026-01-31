import json
import os
import requests

# GitHub 配置
GITHUB_REPO = "wjin0891/baobasteven-site"
GITHUB_API_BASE = "https://api.github.com"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

def get_file_sha(path):
    """获取文件的 SHA 值"""
    url = f"{GITHUB_API_BASE}/repos/{GITHUB_REPO}/contents/{path}"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return data.get("sha")
    return None

def delete_file(path):
    """删除文件"""
    sha = get_file_sha(path)
    if not sha:
        print(f"文件不存在: {path}")
        return False
    
    url = f"{GITHUB_API_BASE}/repos/{GITHUB_REPO}/contents/{path}"
    data = {
        "message": f"删除图片: {path}",
        "sha": sha
    }
    
    response = requests.delete(url, headers=headers, json=data)
    if response.status_code == 200:
        print(f"✅ 已删除: {path}")
        return True
    else:
        print(f"❌ 删除失败: {path} - {response.text}")
        return False

# 要删除的文件列表
files_to_delete = [
    "client/public/assets/images/wechat-qr.jpg"
]

print("开始删除图片文件...")
for file in files_to_delete:
    delete_file(file)

print("\n✅ 图片清理完成！")
