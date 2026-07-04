# academic-website-template

A single-page course website template — built for **Efficient AI** (Department of
Computer Science & Engineering, IIT Bombay) and reusable for any future course.

Live preview: open `index.html` in a browser. No build step, no dependencies —
plain HTML, CSS, and vanilla JavaScript.

## Structure

```
index.html   — all content lives here; sections are marked with EDIT comments
styles.css   — design tokens at the top (:root), then one block per section
script.js    — header hairline, scroll-spy nav, sparse-matrix ornament
assets/      — IIT Bombay seal + wordmark (SVG)
```

## Editing for a new semester (or a new course)

Everything editable is in `index.html`, flagged with `<!-- EDIT: ... -->` comments:

1. **Hero** — course code, semester, one-line description, credits/venue line.
2. **Updates** — add a new `<li>` at the top of the list; newest first.
3. **Course staff** — names, emails, offices. Duplicate an
   `<article class="person">` block to add more TAs.
4. **Logistics** — lecture slot, venue, prerequisites, grading weights.
5. **Contents** — the five module blocks.
6. **Schedule** — one `<tr>` per week: number, date, description, resources.
   Resource links can point to `#references` anchors or external pages.
7. **References** — numbered list; schedule rows link into it by `id`.

To reskin for another course, change the palette and fonts in the `:root`
block at the top of `styles.css`.

## Deploying on GitHub Pages

1. Push to GitHub.
2. Repository **Settings → Pages → Source**: select `main` branch, `/ (root)`.
3. The site appears at `https://<user>.github.io/academic-website-template/`.

## Notes

- Fonts (Marcellus, Hanken Grotesk, Spline Sans Mono) load from Google Fonts;
  system fallbacks apply offline.
- The IIT Bombay seal and wordmark are trademarks of the institute, included
  here for official course pages.
