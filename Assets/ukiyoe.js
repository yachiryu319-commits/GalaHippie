/* 浮世繪版：畫面上緩緩飄幾片櫻花瓣（減少動態偏好時由 CSS 整個藏起來） */
(function () {
  const box = document.createElement("div");
  box.className = "petals";
  box.setAttribute("aria-hidden", "true");

  for (let i = 0; i < 14; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.left = Math.random() * 100 + "vw";
    p.style.setProperty("--sway", (Math.random() * 160 - 80).toFixed(0) + "px");
    p.style.animationDuration = (12 + Math.random() * 12).toFixed(1) + "s";
    p.style.animationDelay = (-Math.random() * 24).toFixed(1) + "s";
    const size = 7 + Math.random() * 8;
    p.style.width = size.toFixed(1) + "px";
    p.style.height = (size * 0.8).toFixed(1) + "px";
    box.appendChild(p);
  }

  document.body.appendChild(box);
})();
