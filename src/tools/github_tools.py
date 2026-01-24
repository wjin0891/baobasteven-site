import base64
import json
import os
import datetime
from typing import Optional
from langchain.tools import tool, ToolRuntime
import requests

# GitHub 配置
GITHUB_REPO = "wjin0891/baobasteven-site"
GITHUB_API_BASE = "https://api.github.com"

def _get_headers() -> dict:
    """获取 GitHub API 请求头"""
    token = os.getenv("GITHUB_TOKEN")
    if not token:
        raise ValueError("GitHub Token 未设置，请设置环境变量 GITHUB_TOKEN")
    return {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }

@tool
def read_github_file(path: str, runtime: ToolRuntime) -> str:
    """
    读取 GitHub 仓库中的文件内容
    
    Args:
        path: 文件在仓库中的路径，例如 "client/public/config.json"
    
    Returns:
        文件内容的 JSON 字符串（如果是 JSON 文件）或原始内容
    """
    ctx = runtime.context
    
    try:
        url = f"{GITHUB_API_BASE}/repos/{GITHUB_REPO}/contents/{path}"
        headers = _get_headers()
        
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        if data.get("encoding") == "base64":
            content = base64.b64decode(data["content"]).decode("utf-8")
            
            # 如果是 JSON 文件，尝试格式化返回
            if path.endswith(".json"):
                try:
                    json_data = json.loads(content)
                    return json.dumps(json_data, indent=2, ensure_ascii=False)
                except json.JSONDecodeError:
                    pass
            
            return content
        else:
            return "无法解码文件内容"
            
    except requests.exceptions.HTTPError as e:
        return f"读取文件失败: {e.response.status_code} - {e.response.text}"
    except Exception as e:
        return f"读取文件时出错: {str(e)}"

@tool
def update_github_file(path: str, content: str, message: str, runtime: ToolRuntime) -> str:
    """
    更新 GitHub 仓库中的文件
    
    Args:
        path: 文件在仓库中的路径，例如 "client/public/config.json"
        content: 新的文件内容
        message: 提交消息（commit message）
    
    Returns:
        操作结果
    """
    ctx = runtime.context
    
    try:
        # 首先获取当前文件的 SHA
        url = f"{GITHUB_API_BASE}/repos/{GITHUB_REPO}/contents/{path}"
        headers = _get_headers()
        
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        current_data = response.json()
        sha = current_data["sha"]
        
        # 更新文件
        encoded_content = base64.b64encode(content.encode("utf-8")).decode("utf-8")
        
        update_data = {
            "message": message,
            "content": encoded_content,
            "sha": sha
        }
        
        response = requests.put(url, headers=headers, json=update_data)
        response.raise_for_status()
        
        return f"文件 {path} 更新成功！提交 ID: {response.json().get('commit', {}).get('sha', 'N/A')}"
        
    except requests.exceptions.HTTPError as e:
        return f"更新文件失败: {e.response.status_code} - {e.response.text}"
    except Exception as e:
        return f"更新文件时出错: {str(e)}"

@tool
def upload_github_file(path: str, content: str, message: str, runtime: ToolRuntime) -> str:
    """
    上传新文件到 GitHub 仓库
    
    Args:
        path: 文件在仓库中的路径，例如 "client/public/assets/images/new-image.jpg"
        content: 文件内容（文本内容）或 base64 编码的图片内容
        message: 提交消息
    
    Returns:
        操作结果
    """
    ctx = runtime.context
    
    try:
        url = f"{GITHUB_API_BASE}/repos/{GITHUB_REPO}/contents/{path}"
        headers = _get_headers()
        
        # 判断是否为二进制文件（如图片）
        if any(ext in path.lower() for ext in [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"]):
            # 如果已经是 base64，直接使用；否则进行编码
            if content.startswith("data:image"):
                # 移除 data URL 前缀
                content = content.split(",")[1]
            encoded_content = content
        else:
            encoded_content = base64.b64encode(content.encode("utf-8")).decode("utf-8")
        
        upload_data = {
            "message": message,
            "content": encoded_content
        }
        
        response = requests.put(url, headers=headers, json=upload_data)
        response.raise_for_status()
        
        return f"文件 {path} 上传成功！提交 ID: {response.json().get('commit', {}).get('sha', 'N/A')}"
        
    except requests.exceptions.HTTPError as e:
        return f"上传文件失败: {e.response.status_code} - {e.response.text}"
    except Exception as e:
        return f"上传文件时出错: {str(e)}"

@tool
def create_blog_post(title: str, content: str, slug: str, runtime: ToolRuntime) -> str:
    """
    创建新的博客文章（Markdown 文件）
    
    Args:
        title: 博客文章标题
        content: 博客文章内容（Markdown 格式）
        slug: 文章的 URL slug（用于文件名），例如 "my-first-post"
    
    Returns:
        操作结果
    """
    ctx = runtime.context
    
    try:
        # 构建博客文件路径
        filename = f"{slug}.md"
        # 假设博客文件夹在 client/public/blog/ 目录下
        path = f"client/public/blog/{filename}"
        
        # 构建完整的 Markdown 内容（包含 frontmatter）
        full_content = f"""---
title: {title}
slug: {slug}
date: {datetime.datetime.now().strftime('%Y-%m-%d')}
---

{content}
"""
        
        # 使用上传文件功能
        result = upload_github_file(path, full_content, f"新增博客文章: {title}", runtime)
        
        return f"{result}\n\n博客文章已创建，将在 Vercel 部署后生效。"
        
    except Exception as e:
        return f"创建博客文章时出错: {str(e)}"
