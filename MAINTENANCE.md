# 个人主页更新指南

网站是纯静态 GitHub Pages 项目，不依赖数据库或构建工具。大多数更新只需要修改 `index.html`，再同步 `CURRENT_CONTENT.md`。

## 推荐流程

1. 修改 `index.html` 中对应栏目。
2. 在 `CURRENT_CONTENT.md` 保存同样的信息，作为以后核对的文字版本。
3. 运行发布前检查：

   ```bash
   ./scripts/check-site.sh
   ```

4. 需要查看效果时启动本地预览：

   ```bash
   ./scripts/preview-site.sh
   ```

   浏览器打开 `http://127.0.0.1:8000/`。使用其他端口时可运行 `./scripts/preview-site.sh 8080`。

5. 提交并推送到 GitHub 的 `main` 分支。GitHub Actions 检查通过后，Pages 会自动更新。

## 更新最新动态

在 `index.html` 中搜索 `Latest News`，把新条目放在 `.news-list` 最上方：

```html
<article class="news-item">
  <time class="news-date" datetime="2026-06">Jun 2026</time>
  <h3 class="news-title">News text.</h3>
</article>
```

主页默认显示前三条。需要折叠到 “Show More News” 中的旧动态，添加 `news-extra` 和 `hidden`：

```html
<article class="news-item news-extra" hidden>...</article>
```

## 添加论文

在 `Selected Publications` 中复制一整块 `.pub-item`，再修改：

- `data-year`：年份，例如 `2026`
- `data-ccf`：`A`、`B`、`T1` 或 `other`
- `data-type`：`journal` 或 `conference`
- 标题、作者、venue、年份和链接
- `pub-year-badge`、`pub-venue-badge` 和 CCF 标签

如果出现新年份，还要在 `#year-filter` 中添加对应 `<option>`。最后把页面底部 `of 12 publications` 的总数改为新的数量；筛选后的可见数量会由 JavaScript 自动计算。

论文元数据优先以出版社页面、DBLP、arXiv 或 Google Scholar 为准。作者列表中的 `Xinyue Sun` 使用 `<strong>` 标记。

## 更新获奖、学术服务和学生

- 获奖：搜索 `.awards-list`，复制一个 `.award-item`。
- 学术服务：搜索 `.services-grid`，复制一个 `.service-card`。
- 学生：搜索 `.mentorship-groups`，在对应 Doctoral、Master's 或 Undergraduate 分组中复制 `.student-card`。

新增学生时，用中文姓氏作为 `.student-avatar` 内容，并保留联合指导信息。删除人员时要删除完整的 `<article class="student-card">...</article>`。

## 更新简介或职称

简介和职称可能同时出现在多个位置。修改后搜索旧文本，确保同步更新：

- 页面描述 `meta description`
- Open Graph 和 Twitter 描述
- JSON-LD 中的 `jobTitle`
- 首屏 `.hero-subtitle`
- About Me
- `CURRENT_CONTENT.md`

当前“副研究员”使用 `Associate Research Fellow`。

## 更换照片

替换 `assets/images/profile.jpg` 并保持文件名不变，这样主页和社交分享图片无需修改链接。建议使用清晰的竖版证件照或职业照，并在发布前检查手机端裁切效果。

## 不需要经常修改的文件

- `assets/styles.css`：只有调整视觉样式时才修改。
- `assets/js/main.js`：只有调整交互功能时才修改。
- `sitemap.xml` 和 `robots.txt`：主页地址不变时无需修改。
- `404.html` 和 `favicon.svg`：通常无需修改。

## GitHub 内容更新表单

也可以在仓库的 Issues 页面选择 **Homepage content update**，填写需要更新的内容和来源链接。该表单适合暂存尚未立即发布的新闻、论文、奖励或学生变动。

## 发布检查

`./scripts/check-site.sh` 会检查：

- 必要文件和核心主页内容是否存在
- 已明确删除的旧栏目是否意外恢复
- JSON-LD 是否为有效 JSON
- 页面内部锚点是否有效且 ID 不重复
- 本地图片、脚本和样式链接是否真实存在
- JavaScript 是否存在语法错误

线上自动检查与本地使用同一脚本。
