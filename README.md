# Portfolio — Anil Kumar Mandal

A narrative portfolio: from GIS and drone mapping in Nepal, through flood modelling at FAU's
Center for Water Resiliency and Risk Reduction (CWR³), to the ASPRS FAU Student Chapter and the
launch of CWR³Data. Each chapter is backed by the original public news articles, posts and papers.

**Live:** https://mandalanil.github.io/Portfolio/

## Structure

```
index.html            Story page: chapters, publications, contact (static HTML)
data/story.js         All evidence items, talks, code cards and the press feed
assets/js/story.js    Renders cards from data/story.js; theme, scroll-spy, lazy embeds
assets/css/story.css  Design tokens (light/dark), layout and print styles
images/story/         WebP images (hero, headshot, press, events, figures, logos)
assets/docs/          Downloadable PDFs
Anil_Mandal_CV.pdf    CV
404.html              Redirects old pages (projects.html) to the new sections
```

Plain HTML, CSS and JavaScript, with no build step, served by GitHub Pages.

To add a news article, LinkedIn post or paper, see [CONTENT.md](CONTENT.md).
