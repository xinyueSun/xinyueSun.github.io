# Xinyue Sun Academic Homepage

[![Homepage](https://img.shields.io/badge/homepage-online-1769aa)](https://xinyuesun.github.io/)
[![Static site check](https://github.com/xinyueSun/xinyueSun.github.io/actions/workflows/static-site-check.yml/badge.svg)](https://github.com/xinyueSun/xinyueSun.github.io/actions/workflows/static-site-check.yml)

孙新越的英文学术主页，使用静态 HTML、CSS 和 JavaScript 构建，并由 GitHub Pages 发布。

- 线上主页：https://xinyuesun.github.io/
- GitHub 仓库：https://github.com/xinyueSun/xinyueSun.github.io
- 详细更新说明：[MAINTENANCE.md](MAINTENANCE.md)

## 常用文件

| 文件 | 用途 |
| --- | --- |
| `index.html` | 主页全部公开内容 |
| `CURRENT_CONTENT.md` | 当前公开内容的文字备份 |
| `assets/styles.css` | 页面样式与响应式布局 |
| `assets/js/main.js` | 导航、主题、新闻展开和论文筛选 |
| `assets/images/profile.jpg` | 个人照片及社交分享图片 |
| `个人信息填写表.md` | 收集较大批次的新内容 |
| `scripts/check-site.sh` | 发布前检查 |
| `scripts/preview-site.sh` | 本地预览 |

## 快速更新

1. 根据 [MAINTENANCE.md](MAINTENANCE.md) 修改 `index.html`。
2. 同步更新 `CURRENT_CONTENT.md`。
3. 运行 `./scripts/check-site.sh`。
4. 需要查看页面时运行 `./scripts/preview-site.sh`，然后打开 `http://127.0.0.1:8000/`。
5. 将修改提交并推送到 `main`，GitHub Pages 会自动发布。

也可以直接向 Codex 提供新闻、论文、获奖或学生信息，并说明“更新个人主页并发布”。

## 项目结构

```text
.
├── index.html
├── assets/
│   ├── images/profile.jpg
│   ├── js/main.js
│   └── styles.css
├── scripts/
│   ├── check-site.sh
│   └── preview-site.sh
├── .github/
│   ├── ISSUE_TEMPLATE/content-update.yml
│   └── workflows/static-site-check.yml
├── CURRENT_CONTENT.md
├── MAINTENANCE.md
└── 个人信息填写表.md
```

这是 GitHub 用户主页仓库，`main` 分支发布至 `https://xinyuesun.github.io/`。
