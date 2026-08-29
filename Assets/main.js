/* 排版、Podcast 播放器與圖片燈箱 */
(function () {
  "use strict";

  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };

  var fmt = function (sec) {
    if (!isFinite(sec)) return "--:--";
    var m = Math.floor(sec / 60), s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  };

  /* ── 大頭照：檔案還沒放時顯示預留位置 ─────────────────── */
  var avatar = document.getElementById("avatar");
  if (avatar) {
    var avatarFallback = function () {
      avatar.classList.add("missing");
      avatar.src =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">' +
            '<rect width="300" height="300" fill="#fffefd"/>' +
            '<text x="150" y="146" text-anchor="middle" font-family="sans-serif" ' +
            'font-size="15" letter-spacing="3" fill="#ff8ba7">大頭照</text>' +
            '<text x="150" y="172" text-anchor="middle" font-family="sans-serif" ' +
            'font-size="12" fill="#594a4e">Images/avatar.jpg</text>' +
          "</svg>"
        );
    };
    avatar.addEventListener("error", avatarFallback);
    // 圖檔可能在腳本執行前就已載入失敗，這時 error 事件不會再觸發
    if (avatar.complete && !avatar.naturalWidth) avatarFallback();
  }

  /* ── Podcast ────────────────────────────────────────────── */
  var epWrap = document.getElementById("episodes");
  var episodes = typeof EPISODES !== "undefined" ? EPISODES : [];

  if (epWrap) {
    if (!episodes.length) {
      epWrap.innerHTML =
        '<div class="placeholder">還沒有單集。把 mp3 放進 <code>Audio/</code>，' +
        "再到 <code>Data/podcast.js</code> 加一筆就會出現在這裡。</div>";
    } else {
      epWrap.innerHTML = episodes
        .map(function (ep) {
          return (
            '<article class="episode">' +
              '<div class="ep-main">' +
                (ep.image
                  ? '<img class="ep-art" src="' + esc(ep.image) + '" alt="' +
                    esc(ep.title) + ' 單集封面" loading="lazy">'
                  : "") +
                '<div class="ep-body">' +
                  '<div class="ep-head">' +
                    (ep.no ? '<span class="ep-no">' + esc(ep.no) + "</span>" : "") +
                    (ep.date ? "<span>" + esc(ep.date) + "</span>" : "") +
                  "</div>" +
                  '<h3 class="ep-title">' + esc(ep.title) + "</h3>" +
                  (ep.summary ? '<p class="ep-summary">' + esc(ep.summary) + "</p>" : "") +
                "</div>" +
              "</div>" +
              '<div class="ep-player">' +
                '<button class="ep-play" aria-label="播放 ' + esc(ep.title) + '">▶</button>' +
                '<input class="ep-seek" type="range" min="0" max="100" value="0" step="0.1"' +
                  ' aria-label="播放進度" disabled>' +
                '<span class="ep-time">--:-- / --:--</span>' +
              "</div>" +
              '<p class="ep-error" hidden></p>' +
              (ep.audio
                ? '<audio preload="metadata" src="' + esc(ep.audio) + '"></audio>'
                : "") +
            "</article>"
          );
        })
        .join("");

      var cards = Array.prototype.slice.call(epWrap.querySelectorAll(".episode"));

      cards.forEach(function (card) {
        var art = card.querySelector(".ep-art");
        if (art) {
          art.addEventListener("error", function () { art.remove(); });
          if (art.complete && !art.naturalWidth) art.remove();
        }

        var audio = card.querySelector("audio");
        var btn = card.querySelector(".ep-play");
        var seek = card.querySelector(".ep-seek");
        var time = card.querySelector(".ep-time");
        var err = card.querySelector(".ep-error");
        var dragging = false;

        var fail = function (msg) {
          err.textContent = msg;
          err.hidden = false;
          btn.disabled = true;
          btn.style.opacity = ".45";
          btn.style.cursor = "default";
        };

        if (!audio) {
          fail("這一集還沒設定音檔（Data/podcast.js 的 audio 欄位）。");
          return;
        }

        var ready = function () {
          seek.max = audio.duration;
          seek.disabled = false;
          time.textContent = "0:00 / " + fmt(audio.duration);
        };

        var missing = function () {
          fail("找不到音檔：" + audio.getAttribute("src"));
        };

        audio.addEventListener("loadedmetadata", ready);
        audio.addEventListener("error", missing);

        // 音檔可能在腳本執行前就已就緒或失敗，這時事件不會再觸發
        if (audio.error) missing();
        else if (audio.readyState >= 1) ready();

        audio.addEventListener("timeupdate", function () {
          if (dragging) return;
          seek.value = audio.currentTime;
          time.textContent = fmt(audio.currentTime) + " / " + fmt(audio.duration);
        });

        audio.addEventListener("play", function () {
          cards.forEach(function (other) {
            var a = other.querySelector("audio");
            if (a && a !== audio) a.pause();
          });
          card.classList.add("playing");
          btn.textContent = "❚❚";
        });

        audio.addEventListener("pause", function () {
          card.classList.remove("playing");
          btn.textContent = "▶";
        });

        audio.addEventListener("ended", function () {
          audio.currentTime = 0;
          seek.value = 0;
          time.textContent = "0:00 / " + fmt(audio.duration);
        });

        btn.addEventListener("click", function () {
          if (audio.paused) audio.play(); else audio.pause();
        });

        seek.addEventListener("pointerdown", function () { dragging = true; });
        seek.addEventListener("pointerup", function () { dragging = false; });
        seek.addEventListener("input", function () {
          audio.currentTime = Number(seek.value);
          time.textContent = fmt(audio.currentTime) + " / " + fmt(audio.duration);
        });
      });
    }
  }

  /* ── 文章 ───────────────────────────────────────────────── */
  var artWrap = document.getElementById("articles-list");
  var articles = typeof ARTICLES !== "undefined" ? ARTICLES : [];

  // 來源對應的配色，沒列到的來源會用預設的粉色
  var SOURCE_CLASS = {
    "方格子": "src-vocus",
    "電影神搜": "src-hype",
    "釀電影": "src-film",
    "皇冠雜誌": "src-crown",
    "CCC 追漫台": "src-ccc",
    "關鍵評論網": "src-tnl",
  };

  if (artWrap) {
    if (!articles.length) {
      artWrap.innerHTML =
        '<div class="placeholder">還沒有文章。到 <code>Data/articles.js</code> ' +
        "加一筆就會出現在這裡。</div>";
    } else {
      artWrap.innerHTML = articles
        .map(function (a) {
          return (
            '<a class="article" href="' + esc(a.url) + '" target="_blank" rel="noopener">' +
              (a.image
                ? '<img class="art-cover" src="' + esc(a.image) + '" alt="' + esc(a.title) +
                  ' 封面" loading="lazy" referrerpolicy="no-referrer">'
                : "") +
              '<div class="art-head">' +
                (a.source
                  ? '<span class="art-source ' + (SOURCE_CLASS[a.source] || "") + '">' +
                    esc(a.source) + "</span>"
                  : "") +
                (a.date ? '<span class="art-date">' + esc(a.date) + "</span>" : "") +
              "</div>" +
              '<h3 class="art-title">' + esc(a.title) + "</h3>" +
              (a.excerpt ? '<p class="art-excerpt">' + esc(a.excerpt) + "</p>" : "") +
              '<span class="art-more">閱讀全文 →</span>' +
            "</a>"
          );
        })
        .join("");

      Array.prototype.forEach.call(
        artWrap.querySelectorAll(".art-cover"),
        function (img) {
          img.addEventListener("error", function () { img.remove(); });
          if (img.complete && !img.naturalWidth) img.remove();
        }
      );
    }
  }

  /* ── Instagram ──────────────────────────────────────────── */
  var igWrap = document.getElementById("ig");
  var ig = typeof INSTAGRAM !== "undefined" ? INSTAGRAM : null;
  var igPosts = typeof IG_POSTS !== "undefined" ? IG_POSTS : [];

  if (igWrap && ig) {
    igWrap.innerHTML =
      '<div class="ig-card">' +
        '<a class="ig-avatar" href="' + esc(ig.url) + '" target="_blank" rel="noopener">' +
          '<img src="' + esc(ig.avatar) + '" alt="' + esc(ig.handle) + ' 大頭貼">' +
        "</a>" +
        '<div class="ig-info">' +
          '<p class="ig-name">' + esc(ig.name) + "</p>" +
          '<a class="ig-handle" href="' + esc(ig.url) + '" target="_blank" rel="noopener">' +
            esc(ig.handle) + "</a>" +
          '<ul class="ig-stats">' +
            (ig.stats || []).map(function (st) {
              return "<li><b>" + esc(st.num) + "</b> " + esc(st.label) + "</li>";
            }).join("") +
          "</ul>" +
          '<div class="ig-bio">' +
            (ig.bio || []).map(function (line) {
              return "<span>" + esc(line) + "</span>";
            }).join("") +
          "</div>" +
        "</div>" +
        '<a class="btn ig-follow" href="' + esc(ig.url) + '" target="_blank" rel="noopener">追蹤</a>' +
      "</div>" +
      (igPosts.length
        ? '<div class="ig-grid">' +
            igPosts.map(function (post) {
              return (
                '<a class="ig-post" href="' + esc(post.url) + '" target="_blank" rel="noopener">' +
                  '<img src="' + esc(post.image) + '" alt="Instagram 貼文縮圖" loading="lazy">' +
                  (post.type === "reel" ? '<span class="ig-reel">▶</span>' : "") +
                  (post.date ? '<span class="ig-date">' + esc(post.date) + "</span>" : "") +
                "</a>"
              );
            }).join("") +
          "</div>"
        : "") +
      '<a class="ig-more" href="' + esc(ig.url) + '" target="_blank" rel="noopener">看更多貼文 →</a>';
  }

  /* ── Threads ────────────────────────────────────────────── */
  var thWrap = document.getElementById("threads");
  var th = typeof THREADS !== "undefined" ? THREADS : null;
  var thPosts = typeof TH_POSTS !== "undefined" ? TH_POSTS : [];

  if (thWrap && th) {
    thWrap.innerHTML =
      '<p class="th-label">Threads</p>' +
      '<div class="ig-card">' +
        '<a class="ig-avatar" href="' + esc(th.url) + '" target="_blank" rel="noopener">' +
          '<img src="' + esc(th.avatar) + '" alt="' + esc(th.handle) + ' 大頭貼">' +
        "</a>" +
        '<div class="ig-info">' +
          '<p class="ig-name">' + esc(th.name) + "</p>" +
          '<a class="ig-handle" href="' + esc(th.url) + '" target="_blank" rel="noopener">' +
            esc(th.handle) + "</a>" +
          '<ul class="ig-stats"><li><b>' + esc(th.followers) + "</b> 位粉絲</li></ul>" +
          '<div class="ig-bio">' +
            (th.bio || []).map(function (line) {
              return "<span>" + esc(line) + "</span>";
            }).join("") +
          "</div>" +
        "</div>" +
        '<a class="btn ig-follow" href="' + esc(th.url) + '" target="_blank" rel="noopener">追蹤</a>' +
      "</div>" +
      (thPosts.length
        ? '<div class="th-posts">' +
            thPosts.map(function (post) {
              return (
                '<a class="th-post" href="' + esc(post.url) + '" target="_blank" rel="noopener">' +
                  '<span class="th-meta">' +
                    (post.topic ? '<span class="th-topic">' + esc(post.topic) + "</span>" : "") +
                    '<span class="th-date">' + esc(post.date) + "</span>" +
                  "</span>" +
                  "<span class=\"th-text\">" + esc(post.text) + "</span>" +
                "</a>"
              );
            }).join("") +
          "</div>"
        : "") +
      '<a class="ig-more" href="' + esc(th.url) + '" target="_blank" rel="noopener">看更多串文 →</a>';
  }

  /* ── 插畫 ───────────────────────────────────────────────── */
  var galWrap = document.getElementById("gallery");
  var items = typeof GALLERY !== "undefined" ? GALLERY : [];

  if (galWrap) {
    if (!items.length) {
      galWrap.innerHTML =
        '<div class="placeholder">還沒有作品。把圖檔放進 <code>Images/</code>，' +
        "再到 <code>Data/gallery.js</code> 加一筆就會出現在這裡。</div>";
    } else {
      galWrap.innerHTML = items
        .map(function (it, i) {
          var meta = [it.year, it.note].filter(Boolean).join(" ・ ");
          return (
            '<figure class="card" data-i="' + i + '" tabindex="0">' +
              '<img src="' + esc(it.src) + '" alt="' + esc(it.alt || it.title) + '" loading="lazy">' +
              "<figcaption>" +
                '<span class="card-title">' + esc(it.title) + "</span>" +
                (meta ? '<span class="card-meta">' + esc(meta) + "</span>" : "") +
              "</figcaption>" +
            "</figure>"
          );
        })
        .join("");
    }
  }

  /* ── 賣貨便商品 ─────────────────────────────────────────── */
  var shopWrap = document.getElementById("shop");
  var shop = typeof SHOP !== "undefined" ? SHOP : null;
  var shopItems = typeof SHOP_ITEMS !== "undefined" ? SHOP_ITEMS : [];

  if (shopWrap && shop && shopItems.length) {
    shopWrap.innerHTML =
      '<div class="shop-head">' +
        '<p class="shop-label">' + esc(shop.platform) + "</p>" +
        '<h3 class="shop-name">' + esc(shop.name) + "</h3>" +
      "</div>" +
      '<div class="shop-grid">' +
        shopItems.map(function (item) {
          return (
            '<a class="shop-item" href="' + esc(shop.url) + '" target="_blank" rel="noopener">' +
              '<img src="' + esc(item.image) + '" alt="' + esc(item.name) + '" loading="lazy">' +
              '<span class="shop-item-name">' + esc(item.name) + "</span>" +
              (item.spec ? '<span class="shop-item-spec">' + esc(item.spec) + "</span>" : "") +
              '<span class="shop-item-price">NT$' + esc(item.price) + "</span>" +
            "</a>"
          );
        }).join("") +
      "</div>" +
      '<a class="btn shop-btn" href="' + esc(shop.url) + '" target="_blank" rel="noopener">到賣貨便選購</a>';
  }

  /* ── 燈箱 ───────────────────────────────────────────────── */
  var box = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImage");
  var lbCap = document.getElementById("lbCaption");
  var idx = 0;

  var show = function (i) {
    if (!items.length) return;
    idx = (i + items.length) % items.length;
    var it = items[idx];
    lbImg.src = it.src;
    lbImg.alt = it.alt || it.title || "";
    lbCap.textContent = [it.title, it.year].filter(Boolean).join(" ・ ");
    box.hidden = false;
    document.body.style.overflow = "hidden";
  };

  var close = function () {
    box.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
  };

  if (galWrap) {
    galWrap.addEventListener("click", function (e) {
      var card = e.target.closest(".card");
      if (card) show(Number(card.dataset.i));
    });
    galWrap.addEventListener("keydown", function (e) {
      var card = e.target.closest(".card");
      if (card && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        show(Number(card.dataset.i));
      }
    });
  }

  document.getElementById("lbClose").addEventListener("click", close);
  document.getElementById("lbPrev").addEventListener("click", function () { show(idx - 1); });
  document.getElementById("lbNext").addEventListener("click", function () { show(idx + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) close(); });

  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });

  /* ── 頁尾年份 ───────────────────────────────────────────── */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
