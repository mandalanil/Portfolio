# Adding content

All evidence on the site — chapter cards, the talks timeline, the code cards and the
press & posts feed — comes from **`data/story.js`**. Chapter prose lives in `index.html`.

## Add a news article, post or paper

Copy an existing item in `items: [...]` and edit it:

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Unique slug; becomes the anchor `#item-<id>` |
| `type` | yes | `news` · `linkedin` · `youtube` · `paper` · `talk` · `product` · `document` · `milestone` |
| `date` | yes | `YYYY-MM-DD` or `YYYY-MM` |
| `title`, `source`, `url` | yes | `url` can be `null` for talks with no public page |
| `summary` | recommended | 1–2 sentences, written in the first person |
| `chapter` | yes | `ch1`–`ch5`, `epilogue`, or `null` (feed / talks only) |
| `featured` | yes | `true` shows a card in the chapter; `false` lists it in the feed only |
| `status` | yes | `verified` shows it; `needs-url` hides it unless the page is opened with `?draft=1` |
| `image`, `imageCredit` | no | Put images in `images/story/…` as WebP, ≤ 900 px wide, ≤ 150 KB |
| `focal` | no | Where to crop the photo in the 16:9 card frame, as CSS `object-position` (e.g. `"center 18%"` for a portrait headshot). Default `center 30%` |
| `embedUrl`, `embedHeight` | linkedin / youtube | See below |
| `role`, `links[]`, `doi`, `venue`, `authors`, `leadAuthor` | no | |
| `talkTitle`, `talkSource` | no | Use when a news item is about one of your talks |

Cards all share one shape: a 16:9 picture (or a generated cover when there is no photo), a 2-line title, a 3-line summary and at most two links before "+N more". Keep summaries under about 22 words so nothing important is cut off.

## Embed a LinkedIn post

1. On LinkedIn, open the post → **⋯** → **Embed this post** (or copy the link).
2. Take the number from `urn:li:activity:NUMBER` (or `urn:li:share:NUMBER`).
3. Set:
   ```js
   url: "https://www.linkedin.com/feed/update/urn:li:activity:NUMBER/",
   embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:NUMBER",
   status: "verified",
   ```

Placeholders waiting for a URL are already in the file with `status: "needs-url"`.
Preview them at `/Portfolio/?draft=1`.

## Embed a YouTube video

Set `type: "youtube"`, `videoId: "ID"` and
`embedUrl: "https://www.youtube-nocookie.com/embed/ID"`.

## Preview locally

```bash
python -m http.server 8000
# open http://localhost:8000/
```
