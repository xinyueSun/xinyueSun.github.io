# Homepage Maintenance Guide

This site is a static GitHub Pages homepage. Most updates can be made by editing `index.html`.

## Common Updates

### Add News

Find the `Recent News` section in `index.html` and add a new item at the top:

```html
<li><time>YYYY.MM</time><span>News text.</span></li>
```

### Add a Publication

Find the `Selected Publications` section and copy an existing publication block:

```html
<article class="publication">
  <div class="pub-thumb">VENUE YEAR</div>
  <div>
    <h3>Paper Title</h3>
    <p class="authors"><strong>Xinyue Sun</strong>, Coauthor A, Coauthor B</p>
    <p class="venue">Venue, year.</p>
    <p class="pub-links">
      <a href="https://example.com">[Paper]</a>
    </p>
  </div>
</article>
```

### Update Profile Photo

Replace:

```text
assets/images/profile.jpg
```

Keep the same filename if possible so the page and social preview metadata continue to work.

### Update Sitemap

If the homepage URL changes, update both:

- `sitemap.xml`
- `robots.txt`

For ordinary content updates, the current sitemap can stay as is.

## Local Preview

From the repository folder:

```bash
python3 -m http.server 8000
```

Open:

```text
http://127.0.0.1:8000/
```

## Publish

Commit and push changes to the `main` branch of:

```text
xinyueSun/xinyueSun.github.io
```

GitHub Pages publishes from `main` at:

```text
https://xinyuesun.github.io/
```
