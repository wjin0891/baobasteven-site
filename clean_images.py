import os
import requests

GITHUB_REPO = "wjin0891/baobasteven-site"
GITHUB_API_BASE = "https://api.github.com"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

# 获取目录中的所有文件
url = f"{GITHUB_API_BASE}/repos/{GITHUB_REPO}/contents/client/public/assets/images"
response = requests.get(url, headers=headers)

if response.status_code == 200:
    files = response.json()
    
    # 要保留的文件
    keep_files = ["placeholder.svg"]
    
    print(f"📂 找到 {len(files)} 个文件\n")
    
    deleted_count = 0
    kept_count = 0
    
    for file in files:
        file_name = file['name']
        
        if file_name in keep_files:
            print(f"✅ 保留: {file_name}")
            kept_count += 1
        else:
            # 删除文件
            delete_url = f"{GITHUB_API_BASE}/repos/{GITHUB_REPO}/contents/client/public/assets/images/{file_name}"
            delete_data = {
                "message": f"清理图片文件: {file_name}",
                "sha": file['sha']
            }
            
            delete_response = requests.delete(delete_url, headers=headers, json=delete_data)
            
            if delete_response.status_code == 200:
                print(f"🗑️  删除: {file_name} ({file['size']} bytes)")
                deleted_count += 1
            else:
                print(f"❌ 删除失败: {file_name} - {delete_response.status_code}")
    
    print(f"\n✅ 清理完成！")
    print(f"   🗑️  已删除: {deleted_count} 个文件")
    print(f"   ✅ 已保留: {kept_count} 个文件")
else:
    print(f"❌ 读取目录失败: {response.text}")
