import base64
import os
import requests

# 创建一个简单的 SVG 占位图片（1x1 像素的透明图片）
svg_placeholder = """<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#f3f4f6"/>
  <text x="200" y="150" font-family="Arial, sans-serif" font-size="18" fill="#9ca3af" text-anchor="middle">
    Image Placeholder
  </text>
  <text x="200" y="180" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af" text-anchor="middle">
    图片占位符
  </text>
</svg>"""

# 将 SVG 转换为 base64
svg_base64 = base64.b64encode(svg_placeholder.encode('utf-8')).decode('utf-8')

# GitHub 配置
GITHUB_REPO = "wjin0891/baobasteven-site"
GITHUB_API_BASE = "https://api.github.com"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

# 上传模板图片
url = f"{GITHUB_API_BASE}/repos/{GITHUB_REPO}/contents/client/public/assets/images/placeholder.svg"
data = {
    "message": "添加图片占位符模板",
    "content": svg_base64
}

response = requests.put(url, headers=headers, json=data)
if response.status_code == 200:
    print("✅ 模板图片上传成功！")
    print(f"   文件路径: client/public/assets/images/placeholder.svg")
else:
    print(f"❌ 上传失败: {response.text}")
