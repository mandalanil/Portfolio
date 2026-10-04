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

  /* ---------- evidence card ---------- */
  function card(it) {
    var k = KIND[it.type] || KIND.news;
    var h = '<article class="card' + (it.status !== "verified" ? " draft" : "") + '" id="item-' + esc(it.id) + '">';

    if (it.type === "youtube" && it.videoId) {
      h += '<button class="yt" type="button" data-yt="' + esc(it.embedUrl) + '" aria-label="Play video: ' + esc(it.title) + '">' +
        '<img src="https://i.ytimg.com/vi/' + esc(it.videoId) + '/hqdefault.jpg" alt="" loading="lazy" width="480" height="360">' +
        '<span class="play" aria-hidden="true"></span></button>';
    } else if (it.image) {
      var tall = /poster|board|corridor/.test(it.image) ? " tall" : "";
      h += '<div class="media' + tall + '"><img src="' + esc(it.image) + '" alt="" loading="lazy"></div>';
    }

    h += '<div class="body"><div class="eyebrow"><span class="kind">' + icon(k.icon) + esc(k.label) + "</span>" +
      "<span>" + esc(it.source) + "</span><span>" + esc(fmtDate(it.date)) + "</span></div>";
    var title = it.url ? '<a href="' + esc(it.url) + '"' + linkAttrs(it.url) + ">" + esc(it.title) + "</a>" : esc(it.title);
    h += "<h3>" + title + "</h3>";
    if (it.role) h += '<span class="role">' + esc(it.role) + "</span>";
    if (it.leadAuthor) h += '<span><span class="badge">Lead author</span></span>';
    if (it.authors && it.type !== "paper") h += '<span class="meta">' + esc(it.authors) + "</span>";
    if (it.venue) h += '<span class="meta">' + esc(it.venue) + "</span>";
    if (it.summary) h += "<p>" + esc(it.summary) + "</p>";

    var links = [];
    if (it.doi) links.push('<a href="https://doi.org/' + esc(it.doi) + '" rel="noopener" target="_blank">DOI</a>');
    (it.links || []).forEach(function (l) {
      links.push('<a href="' + esc(l.url) + '"' + linkAttrs(l.url) + ">" + esc(l.label) + "</a>");
    });
    if (it.type === "linkedin" && it.url && it.status === "verified") links.push('<a href="' + esc(it.url) + '" rel="noopener" target="_blank">View on LinkedIn ' + icon("ext") + "</a>");
    if (it.type === "youtube" && it.url) links.push('<a href="' + esc(it.url) + '" rel="noopener" target="_blank">Watch on YouTube ' + icon("ext") + "</a>");
    if (links.length) h += '<div class="links">' + links.join("") + "</div>";
    if (it.imageCredit && it.image) h += '<span class="credit">' + esc(it.imageCredit) + "</span>";
    if (it.status === "needs-url") h += '<span class="draftnote">Draft: add the post URL in data/story.js</span>';
    h += "</div>";

    if (it.type === "linkedin" && it.embedUrl) {
      h += '<div class="embed"><button class="btn ghost showpost" type="button" aria-expanded="false" data-embed="' +
        esc(it.embedUrl) + '" data-height="' + (it.embedHeight || 620) + '" data-title="LinkedIn post: ' + esc(it.title) + '">' +
        icon("linkedin") + "Show post</button></div>";
    }
    return h + "</article>";
  }

  function renderChapters() {
    $all("[data-chapter]").forEach(function (ol) {
      var ch = ol.getAttribute("data-chapter");
      var items = S.items.filter(function (it) { return it.chapter === ch && it.featured && it.type !== "paper" && visible(it); }).sort(byDateAsc);
      ol.innerHTML = items.map(function (it) { return '<li class="reveal">' + card(it) + "</li>"; }).join("");
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
      var links = '<a href="' + esc(c.url) + '" rel="noopener" target="_blank">' + icon(/github\.com/.test(c.url) ? "github" : "ext") + " " +
        (/github\.com/.test(c.url) ? "Code" : "Open") + "</a>";
      if (c.live) links += '<a href="' + esc(c.live) + '" rel="noopener" target="_blank">' + icon("ext") + " " + esc(c.liveLabel || "Live") + "</a>";
      return '<article class="card codecard reveal">' + media + '<div class="body"><h3><a href="' + esc(c.url) +
        '" rel="noopener" target="_blank">' + esc(c.name) + "</a></h3><p>" + esc(c.blurb) + '</p><div class="chips">' +
        (c.tags || []).map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") +
        '</div><div class="links">' + links + "</div></div></article>";
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
        var box = b.parentNode, f = $("iframe", box);
        if (!f) {
          f = document.createElement("iframe");
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
        b.lastChild.textContent = open ? "Hide post" : "Show post";
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

  renderChapters();
  renderTalks();
  renderCode();
  renderFeed();
  launchCard();
  lazyEmbeds();
  reveal();
  scrollSpy();
  theme();
  contactForm();
  referenceTabs();
  var y = $("[data-year]"); if (y) y.textContent = new Date().getFullYear();
})();
