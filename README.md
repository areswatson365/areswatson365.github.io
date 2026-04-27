# SAAI Demo Static Prototype

这是一个纯静态前端演示（HTML/CSS/JS），无需后端，包含 mock 数据，适合部署到 GitHub Pages 或 Netlify。

快速部署：

1. GitHub Pages（推荐）
   - 在你的仓库根目录创建 `docs/`，把 `demo_static` 内文件复制到 `docs/`。
   - 在仓库 Settings -> Pages 中选择 `Deploy from` -> `Branch: main` -> `Folder: /docs`，保存即可。页面会在 `https://<your-username>.github.io/<repo>/` 可访问。

2. Netlify（无需 repo）
   - 打开 https://app.netlify.com/drop ，把 `demo_static` 文件夹拖放进去即可自动部署，得到一个临时免费域名。

3. 本地预览

```bash
# 在 demo_static 目录运行（有 Python 3）
python3 -m http.server 8080
# 然后访问 http://localhost:8080
```

需要我直接为你：
- 将 demo 上传到你的 GitHub 仓库并帮你启用 GitHub Pages，或
- 使用 Netlify 助手为你部署并返回访问链接。

回复想要的部署方式（`github` 或 `netlify`），我可以继续帮你一键完成。