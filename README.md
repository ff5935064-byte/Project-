# Into the Unknown — Template Workspace

This folder contains 70 template pages (D1–J10) plus the shared JavaScript assets.

## Files
- `D1.html` through `J10.html`: individual template entry pages.
- `assets/data.js`: sector settings and all 70 template data records.
- `assets/core.js`: shared rendering, styling, and interactive functionality.
- `index.html`: convenience launcher with links to all 70 templates.

## Run

Keep the folder structure intact. For best results, serve the folder locally:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/` in your browser and choose a template. You can also open an individual HTML file directly, though a local server is the more reliable option for browser behavior.

## Notes

The individual HTML pages intentionally load `assets/data.js` and `assets/core.js`; do not move those files out of the `assets` folder unless you update the script paths in every page.

The JavaScript and page templates were extracted from the supplied DeepSeek conversation archive. The code was not intentionally redesigned or rewritten during extraction.
