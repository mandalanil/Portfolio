/*
 * Renders the evidence cards, metrics, talks, code and press feed from
 * window.STORY (data/story.js), and wires up theme, scroll-spy, lazy
 * embeds, the launch card and the contact form.
 */
(function () {
  "use strict";
  var S = window.STORY || { chapters: [], items: [], code: [], meta: {} };
  var draft = /[?&]draft=1\b/.test(location.search);
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var KIND = {
    news: { label: "News", icon: "news" }, linkedin: { label: "LinkedIn post", icon: "linkedin" },
    youtube: { label: "Video", icon: "play" }, paper: { label: "Paper", icon: "paper" },
    talk: { label: "Talk", icon: "mic" }, product: { label: "Product", icon: "box" },
    document: { label: "Report", icon: "doc" }, milestone: { label: "Milestone", icon: "doc" }
  };
  var FILTER = { news: "news", linkedin: "post", youtube: "post", paper: "paper", talk: "talk", product: "work", document: "work", milestone: "work" };

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icon(name) { return '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }
  function fmtDate(d, long) {
    var p = String(d).split("-");
    var m = p[1] ? MONTHS[+p[1] - 1] : "";
    if (long && p[2]) return m + " " + (+p[2]) + ", " + p[0];
    return (m ? m + " " : "") + p[0];
  }
  function isExternal(url) { return /^https?:/.test(url || ""); }
  function linkAttrs(url) { return isExternal(url) ? ' rel="noopener" target="_blank"' : ""; }
  function visible(it) { return it.status === "verified" || draft; }
  function byDateDesc(a, b) { return String(b.date).localeCompare(String(a.date)); }
  function byDateAsc(a, b) { return String(a.date).localeCompare(String(b.date)); }

  /* ---------- evidence card ----------
   * Every card has the same slots in the same order so cards in a row line up:
   * 16:9 media (photo, video facade or generated cover) · eyebrow · 2-line title ·
   * role row · 3-line summary · footer pinned to the bottom (links, Show post).
   */
  var MAX_LINKS = 2;

  function linkHtml(l) {
    return '<a href="' + esc(l.url) + '"' + linkAttrs(l.url) + ">" + esc(l.label) + (isExternal(l.url) && l.ext ? " " + icon("ext") : "") + "</a>";
  }

  function footLinks(links) {
    if (!links.length) return "";
    var h = '<div class="links">' + links.slice(0, MAX_LINKS).map(linkHtml).join("");
    var rest = links.slice(MAX_LINKS);
    if (rest.length) {
      h += '<details class="morelinks"><summary>+' + rest.length + " more</summary><div>" + rest.map(linkHtml).join("") + "</div></details>";
    }
    return h + "</div>";
  }

  function media(it, k) {
    if (it.type === "youtube" && it.videoId) {
      return '<button class="yt media" type="button" data-yt="' + esc(it.embedUrl) + '" aria-label="Play video: ' + esc(it.title) + '">' +
        '<img src="https://i.ytimg.com/vi/' + esc(it.videoId) + '/hqdefault.jpg" alt="" loading="lazy" width="480" height="360">' +
        '<span class="play" aria-hidden="true"></span></button>';
    }
    if (it.image) {
      var pos = it.focal === "top" ? "center top" : it.focal === "bottom" ? "center bottom" : (it.focal || "center 30%");
      return '<div class="media"><img src="' + esc(it.image) + '" alt="" loading="lazy" style="object-position:' + esc(pos) + '">' +
        (it.imageCredit ? '<span class="credit">' + esc(it.imageCredit) + "</span>" : "") + "</div>";
    }
    return '<div class="media cover" aria-hidden="true">' + icon(k.icon) + '<span class="cover-src">' + esc(it.source) + "</span></div>";
  }

  function card(it) {
    var k = KIND[it.type] || KIND.news;
    var h = '<article class="card' + (it.status !== "verified" ? " draft" : "") + '" id="item-' + esc(it.id) + '">';
    h += media(it, k);

    h += '<div class="body"><div class="eyebrow"><span class="kind">' + icon(k.icon) + esc(k.label) + "</span>" +
      '<span class="src" title="' + esc(it.source) + '">' + esc(it.source) + "</span><span>" + esc(fmtDate(it.date)) + "</span></div>";
    var title = it.url ? '<a href="' + esc(it.url) + '"' + linkAttrs(it.url) + ">" + esc(it.title) + "</a>" : esc(it.title);
    h += '<h3 title="' + esc(it.title) + '">' + title + "</h3>";
    h += '<div class="rolerow">' + (it.role ? '<span class="role">' + esc(it.role) + "</span>" : "") +
      (it.leadAuthor ? '<span class="badge">Lead author</span>' : "") + "</div>";
    h += '<p class="summary">' + esc(it.summary || "") + "</p>";

    var links = [];
    if (it.doi) links.push({ label: "DOI", url: "https://doi.org/" + it.doi });
    (it.links || []).forEach(function (l) { links.push(l); });
    if (it.type === "linkedin" && it.url && it.status === "verified") links.unshift({ label: "View on LinkedIn", url: it.url, ext: true });
    if (it.type === "youtube" && it.url) links.unshift({ label: "Watch on YouTube", url: it.url, ext: true });

    h += '<div class="foot">' + footLinks(links);
    if (it.type === "linkedin" && it.embedUrl) {
      h += '<button class="btn ghost showpost" type="button" aria-expanded="false" data-embed="' + esc(it.embedUrl) +
        '" data-height="' + (it.embedHeight || 620) + '" data-title="LinkedIn post: ' + esc(it.title) + '">' + icon("linkedin") + "<span>Show post</span></button>";
    }
    if (it.status === "needs-url") h += '<span class="draftnote">Draft: add the post URL in data/story.js</span>';
    h += "</div></div>";
    return h + "</article>";
  }

  function renderChapters() {
    $all("[data-chapter]").forEach(function (ol) {
      var ch = ol.getAttribute("data-chapter");
      var items = S.items.filter(function (it) { return it.chapter === ch && it.featured && it.type !== "paper" && visible(it); }).sort(byDateAsc);
      ol.innerHTML = items.map(function (it) { return '<li class="reveal">' + card(it) + "</li>"; }).join("");
      ol.setAttribute("data-count", String(items.length));
      if (!items.length) ol.remove();
    });
    $all("[data-metrics]").forEach(function (ul) {
      var ch = S.chapters.filter(function (c) { return c.id === ul.getAttribute("data-metrics"); })[0];
      if (!ch || !ch.metrics) { ul.remove(); return; }
      ul.innerHTML = ch.metrics.map(function (m) {
        return '<li class="reveal"><span class="v">' + esc(m.value) + '</span><span class="l">' + esc(m.label) + "</span></li>";
      }).join("");
    });
  }

  /* ---------- talks timeline ---------- */
  function renderTalks() {
    var ul = $("[data-talks]"); if (!ul) return;
    var talks = S.items.filter(function (it) {
      return visible(it) && (it.type === "talk" || (it.tags || []).indexOf("talk") > -1) && it.type !== "paper";
    }).sort(byDateDesc);
    var seen = {}, h = "", year = null;
    talks.forEach(function (t) {
      var key = t.date.slice(0, 7) + t.title.slice(0, 18);
      if (seen[key]) return; seen[key] = 1;
      var y = t.date.slice(0, 4);
      if (y !== year) { year = y; h += '<li class="year" aria-hidden="true">' + y + "</li>"; }
      var name = t.talkTitle || t.title;
      var ti = t.url ? '<a href="' + esc(t.url) + '"' + linkAttrs(t.url) + ">" + esc(name) + "</a>" : esc(name);
      h += '<li class="t"><span class="d">' + esc(fmtDate(t.date)) + '</span><div><div class="ti">' + ti +
        '</div><div class="ve">' + esc(t.talkSource || t.source) + (t.role ? " · " + esc(t.role) : "") + "</div></div></li>";
    });
    ul.innerHTML = h;
  }

  /* ---------- open source ---------- */
  function renderCode() {
    var box = $("[data-code]"); if (!box) return;
    var g = 0;
    box.innerHTML = (S.code || []).map(function (c) {
      var media = c.image
        ? '<div class="media"><img src="' + esc(c.image) + '" alt="" loading="lazy"></div>'
        : '<div class="media g' + ((g++ % 4) + 1) + '">' + icon(c.icon || "box") + "</div>";
      var gh = /github\.com/.test(c.url);
      var links = '<a href="' + esc(c.url) + '" rel="noopener" target="_blank">' + icon(gh ? "github" : "ext") + (gh ? "Code" : "Open") + "</a>";
      if (c.live) links += '<a href="' + esc(c.live) + '" rel="noopener" target="_blank">' + icon("ext") + esc(c.liveLabel || "Live") + "</a>";
      return '<article class="card codecard reveal">' + media + '<div class="body"><h3 title="' + esc(c.name) + '"><a href="' + esc(c.url) +
        '" rel="noopener" target="_blank">' + esc(c.name) + '</a></h3><p class="summary">' + esc(c.blurb) + '</p><div class="chips">' +
        (c.tags || []).map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") +
        '</div><div class="foot"><div class="links">' + links + "</div></div></div></article>";
    }).join("");
  }

  /* ---------- press & posts feed ---------- */
  function renderFeed() {
    var ul = $("[data-feed]"), more = $("[data-more]"); if (!ul) return;
    var all = S.items.filter(function (it) {
      var inChapter = it.chapter && it.featured && it.type !== "paper";
      var listedElsewhere = it.type === "paper" || it.type === "talk";
      return visible(it) && it.url && !inChapter && !listedElsewhere;
    }).sort(byDateDesc);
    var filter = "all", expanded = false, LIMIT = 6;
    function draw() {
      var list = all.filter(function (it) { return filter === "all" || FILTER[it.type] === filter; });
      var shown = expanded ? list : list.slice(0, LIMIT);
      ul.innerHTML = shown.map(function (it) {
        var k = KIND[it.type] || KIND.news;
        return '<li><span class="d">' + esc(fmtDate(it.date)) + '</span><span class="ti"><a href="' + esc(it.url) + '"' +
          linkAttrs(it.url) + ">" + esc(it.title) + '</a><span class="src">' + esc(it.source) + "</span></span>" +
          '<span class="chip">' + esc(k.label) + "</span></li>";
      }).join("");
      more.hidden = expanded || list.length <= LIMIT;
      more.textContent = "Show all " + list.length;
    }
    $all("[data-filters] button").forEach(function (b) {
      b.addEventListener("click", function () {
        filter = b.getAttribute("data-f"); expanded = false;
        $all("[data-filters] button").forEach(function (o) { o.setAttribute("aria-pressed", String(o === b)); });
        draw();
      });
    });
    more.addEventListener("click", function () { expanded = true; draw(); });
    draw();
  }

  /* ---------- launch card ---------- */
  function launchCard() {
    var el = $("[data-launch]"); if (!el) return;
    var when = new Date(el.getAttribute("data-launch") + "T09:00:00-05:00");
    if (Date.now() >= when.getTime()) {
      $("[data-launch-status]", el).textContent = "Public beta · live";
      $("[data-launch-title]", el).textContent = "CWR³Data launched at GIS Mela on November 17, 2026";
      $("[data-launch-text]", el).textContent = "The public beta is open.";
    }
  }

  /* ---------- behaviour ---------- */
  function lazyEmbeds() {
    $all("[data-embed]").forEach(function (b) {
      b.addEventListener("click", function () {
        var box = b.closest(".card"), f = $(".postframe", box);
        if (!f) {
          f = document.createElement("iframe");
          f.className = "postframe";
          f.src = b.getAttribute("data-embed");
          f.height = b.getAttribute("data-height");
          f.title = b.getAttribute("data-title");
          f.setAttribute("allowfullscreen", "");
          box.appendChild(f);
        } else {
          f.hidden = !f.hidden;
        }
        var open = !f.hidden;
        b.setAttribute("aria-expanded", String(open));
        $("span", b).textContent = open ? "Hide post" : "Show post";
      });
    });

    $all("[data-yt]").forEach(function (b) {
      b.addEventListener("click", function () {
        var f = document.createElement("iframe");
        f.src = b.getAttribute("data-yt") + "?autoplay=1&rel=0";
        f.title = b.getAttribute("aria-label");
        f.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
        f.allowFullscreen = true;
        var box = document.createElement("div");
        box.className = "yt";
        box.appendChild(f);
        b.replaceWith(box);
      }, { once: true });
    });
  }

  function reveal() {
    var els = $all(".reveal");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(function (e) { e.classList.add("in"); }); return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  function scrollSpy() {
    var links = $all(".chapnav a"), map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var sections = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute("aria-current"); });
        var a = map[e.target.id]; if (!a) return;
        a.setAttribute("aria-current", "true");
        var nav = a.parentNode;
        if (a.offsetLeft < nav.scrollLeft || a.offsetLeft + a.offsetWidth > nav.scrollLeft + nav.clientWidth) {
          nav.scrollTo({ left: a.offsetLeft - 16, behavior: "smooth" });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  function theme() {
    var btn = $("#theme"); if (!btn) return;
    var root = document.documentElement;
    function current() {
      return root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
    function paint() { $("use", btn).setAttribute("href", current() === "dark" ? "#i-sun" : "#i-moon"); }
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      paint();
    });
    paint();
  }

  function contactForm() {
    var form = $("#contact-form"); if (!form) return;
    var status = $(".status", form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "status"; status.textContent = "Sending…";
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          status.className = "status ok"; status.textContent = "Thank you — your message has been sent.";
          form.reset();
        })
        .catch(function () {
          status.className = "status err";
          status.textContent = "Sorry, that didn't go through. Please email amandal2023@fau.edu instead.";
        });
    });
  }


  /* ---------- reference tabs ---------- */
  function referenceTabs() {
    var panels = $all("[data-tabpanel]"), tabs = $all('.tablist [role="tab"]');
    if (!panels.length || !tabs.length) return;
    document.documentElement.classList.add("tabs-on");
    var ids = panels.map(function (p) { return p.id; });
    function show(id, focus) {
      tabs.forEach(function (t) {
        var on = t.getAttribute("aria-controls") === id;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        if (on && focus) t.focus();
      });
      panels.forEach(function (p) { p.hidden = p.id !== id; });
    }
    function open(id) {
      show(id);
      $("#reference").scrollIntoView();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () {
        var id = t.getAttribute("aria-controls");
        show(id);
        history.replaceState(null, "", "#" + id);
      });
      t.addEventListener("keydown", function (e) {
        var k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!k) return;
        e.preventDefault();
        var next = tabs[(i + k + tabs.length) % tabs.length];
        show(next.getAttribute("aria-controls"), true);
      });
    });
    // Any in-page link to a list (top bar, quick paths, chapter text) opens its tab
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href").slice(1);
      if (ids.indexOf(id) < 0) return;
      e.preventDefault();
      history.pushState(null, "", "#" + id);
      open(id);
    });
    window.addEventListener("hashchange", function () {
      var id = location.hash.slice(1);
      if (ids.indexOf(id) > -1) open(id);
    });
    var start = location.hash.slice(1);
    if (ids.indexOf(start) > -1) open(start); else show(ids[0]);
  }


  /* ---------- chapters: summary first, details on demand ----------
   * Each chapter shows its header, number tiles and (ch5) launch card.
   * Everything else moves into a collapsed panel behind "Read the chapter".
   * Links to a chapter, or to anything inside one, open it first.
   */
  function collapsibleChapters() {
    var KEEP = ".chead, .metrics, .launch";
    var chapters = $all(".chapter").filter(function (c) { return /^ch\d$/.test(c.id); });
    chapters.forEach(function (sec) {
      var wrap = $(".wrap", sec); if (!wrap) return;
      var deep = document.createElement("div");
      deep.className = "deep"; deep.id = sec.id + "-more"; deep.hidden = true;
      Array.prototype.slice.call(wrap.children).forEach(function (el) { if (!el.matches(KEEP)) deep.appendChild(el); });
      if (!deep.children.length) return;
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "btn ghost readmore";
      btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", deep.id);
      btn.innerHTML = "<span>Read the chapter</span>" + icon("chev");
      btn.addEventListener("click", function () { setOpen(sec, deep.hidden); });
      wrap.appendChild(btn); wrap.appendChild(deep);
      sec.classList.add("collapsible");
    });
    function setOpen(sec, open) {
      var deep = $(".deep", sec), btn = $(".readmore", sec); if (!deep) return;
      deep.hidden = !open;
      sec.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      $("span", btn).textContent = open ? "Show less" : "Read the chapter";
      if (open) $all(".reveal", deep).forEach(function (e) { e.classList.add("in"); });
    }
    function openFor(id) {
      var el = id && document.getElementById(id); if (!el) return false;
      var sec = el.closest(".chapter.collapsible"); if (!sec) return false;
      if (el !== sec && $(".deep", sec).contains(el)) setOpen(sec, true);
      return true;
    }
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
      var id = a.getAttribute("href").slice(1), el = document.getElementById(id);
      if (!el || !openFor(id)) return;
      if (el.classList.contains("collapsible")) setOpen(el, true);   // overview tile / top bar: open the chapter
      e.preventDefault();
      history.pushState(null, "", "#" + id);
      el.scrollIntoView();
    });
    var start = location.hash.slice(1);
    if (start && openFor(start)) {
      var t = document.getElementById(start);
      if (t.classList.contains("collapsible")) setOpen(t, true);
      t.scrollIntoView();
    }
  }

  renderChapters();
  renderTalks();
  renderCode();
  renderFeed();
  launchCard();
  collapsibleChapters();
  lazyEmbeds();
  reveal();
  scrollSpy();
  theme();
  contactForm();
  referenceTabs();
  var y = $("[data-year]"); if (y) y.textContent = new Date().getFullYear();
})();
