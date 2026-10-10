/* Sankha Subra Bhandari: portfolio scripts */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav background after scrolling ---------- */
  var nav = document.getElementById('siteNav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 24); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Close the mobile menu after choosing a link
  var menu = document.getElementById('mainNav');
  document.querySelectorAll('#mainNav .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });

  /* ---------- Hero: design comp vs finished page ---------- */
  var stage = document.getElementById('stage');
  var range = document.getElementById('stageRange');
  var touched = false;

  function setCut(v) {
    stage.style.setProperty('--cut', v + '%');
    range.value = v;
  }

  range.addEventListener('input', function (e) {
    touched = true;
    stage.style.setProperty('--cut', e.target.value + '%');
  });

  // Start with the plain comp, then sweep open to show the built page.
  var target = 48;
  if (reduceMotion) {
    setCut(target);
  } else {
    setCut(100);
    var start = null, from = 100, delay = 700, dur = 1500;
    var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
    var step = function (ts) {
      if (touched) return;
      if (start === null) start = ts;
      var t = Math.min(Math.max((ts - start - delay) / dur, 0), 1);
      setCut(from + (target - from) * ease(t));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Portfolio placeholder images (inline SVG) ---------- */
  // Any <img data-mock="..."> without a src gets a drawn page layout.
  // To use a real screenshot, set src on the img and this is skipped.
  function mockSVG(kind) {
    var B = '#1B3FA0', Y = '#FFC20E', I = '#14181F', T = '#E8EEFB', G = '#D5DCEB', W = '#FFFFFF', GR = '#3DBE7A';
    var r = function (x, y, w, h, f, rx, extra) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx === undefined ? 6 : rx) + '" fill="' + f + '" ' + (extra || '') + '/>';
    };
    var c = function (x, y, rad, f) { return '<circle cx="' + x + '" cy="' + y + '" r="' + rad + '" fill="' + f + '"/>'; };
    var range = function (n) { return Array.apply(null, Array(n)).map(function (_, i) { return i; }); };
    var line = '2';
    var b = '';

    if (kind === 'dashboard') {
      b += r(0, 44, 170, 516, B, 0) + r(24, 84, 90, 14, W, 7);
      b += range(5).map(function (i) { return r(24, 130 + i * 34, 118 - (i % 3) * 18, 10, W, 5, 'opacity=".45"'); }).join('');
      b += range(3).map(function (i) {
        var x = 200 + i * 190;
        return r(x, 76, 170, 92, T, 12) + r(x + 16, 92, 70, 10, G, 5) + r(x + 16, 118, 104, 28, i === 1 ? B : I, 7);
      }).join('');
      b += r(200, 192, 560, 190, W, 12, 'stroke="' + G + '" stroke-width="' + line + '"');
      b += '<polygon points="220,360 220,336 290,306 360,326 430,258 500,280 570,226 640,248 740,206 740,360" fill="' + Y + '" opacity=".35"/>';
      b += '<polyline points="220,336 290,306 360,326 430,258 500,280 570,226 640,248 740,206" fill="none" stroke="' + B + '" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>';
      b += range(4).map(function (i) {
        var y = 404 + i * 34;
        return r(200, y, 560, 26, i % 2 ? T : '#F6F8FC', 6) + r(216, y + 8, 130, 10, G, 5) + r(640, y + 8, 80, 10, i === 2 ? Y : G, 5);
      }).join('');
    }

    if (kind === 'landing') {
      b += r(0, 44, 800, 310, B, 0);
      b += r(60, 76, 90, 16, W, 8, 'opacity=".9"') + r(560, 78, 50, 12, W, 6, 'opacity=".5"') + r(630, 78, 50, 12, W, 6, 'opacity=".5"') + r(700, 78, 50, 12, W, 6, 'opacity=".5"');
      b += r(60, 130, 430, 30, W, 9) + r(60, 174, 350, 30, W, 9);
      b += r(60, 224, 300, 12, W, 6, 'opacity=".6"') + r(60, 248, 250, 12, W, 6, 'opacity=".6"');
      b += r(60, 288, 160, 46, Y, 23);
      b += c(620, 210, 110, '#2B55C8') + c(668, 170, 58, Y) + c(590, 262, 26, W);
      b += range(3).map(function (i) {
        var x = 60 + i * 236;
        return r(x, 382, 212, 150, T, 16) + c(x + 36, 420, 16, i === 1 ? Y : B) + r(x + 20, 452, 150, 12, I, 6, 'opacity=".85"') + r(x + 20, 478, 120, 10, G, 5) + r(x + 20, 498, 90, 10, G, 5);
      }).join('');
    }

    if (kind === 'store') {
      b += r(40, 62, 110, 20, I, 8) + r(520, 68, 50, 10, G, 5) + r(590, 68, 50, 10, G, 5) + r(660, 68, 50, 10, G, 5) + c(750, 73, 14, Y);
      var cols = [B, Y, I, Y, B, I];
      b += range(6).map(function (i) {
        var x = 40 + (i % 3) * 250, y = 108 + Math.floor(i / 3) * 218;
        return r(x, y, 226, 150, T, 14) + c(x + 113, y + 75, 40, cols[i]) + r(x, y + 166, 140, 12, I, 6, 'opacity=".85"') + r(x, y + 188, 70, 10, G, 5) + r(x + 150, y + 176, 76, 28, Y, 14);
      }).join('');
    }

    if (kind === 'enterprise') {
      b += r(0, 44, 800, 516, '#F6F8FC', 0);
      b += r(60, 76, 100, 16, B, 8) + r(540, 78, 50, 10, G, 5) + r(610, 78, 50, 10, G, 5) + r(680, 78, 50, 10, G, 5);
      b += r(60, 130, 310, 28, I, 9) + r(60, 172, 250, 28, I, 9) + r(60, 222, 290, 12, G, 6) + r(60, 246, 240, 12, G, 6) + r(60, 290, 160, 46, B, 23);
      b += range(4).map(function (i) {
        var y = 110 + i * 68;
        return r(450, y, 300, 54, I, 10) + c(478, y + 27, 6, Y) + c(500, y + 27, 6, GR) + r(530, y + 20, 190, 14, '#2A3140', 7);
      }).join('');
      b += range(4).map(function (i) {
        var x = 60 + i * 175;
        return r(x, 400, 155, 110, W, 12, 'stroke="' + G + '" stroke-width="' + line + '"') + r(x + 18, 422, 64, 24, i === 0 ? Y : B, 6) + r(x + 18, 462, 96, 10, G, 5) + r(x + 18, 482, 70, 10, G, 5);
      }).join('');
    }

    if (kind === 'figma') {
      b += r(0, 44, 800, 516, '#F6F8FC', 0);
      var dash = 'stroke="#8E9BBD" stroke-width="3" stroke-dasharray="10 8"';
      b += r(40, 84, 330, 430, '#EEF1F7', 10, dash);
      b += r(64, 112, 120, 24, '#D3D9E6', 6, dash) + r(64, 170, 270, 34, '#D3D9E6', 8, dash) + r(64, 216, 200, 34, '#D3D9E6', 8, dash) + r(64, 280, 130, 44, '#D3D9E6', 22, dash);
      b += range(3).map(function (i) { return r(64 + i * 94, 360, 82, 120, '#D3D9E6', 8, dash); }).join('');
      [[34, 78], [364, 78], [34, 508], [364, 508]].forEach(function (p) { b += r(p[0], p[1], 12, 12, B, 2); });
      b += '<path d="M392 290 h34 m-12 -14 l14 14 l-14 14" fill="none" stroke="' + Y + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>';
      b += r(450, 84, 310, 430, W, 10, 'stroke="' + G + '" stroke-width="3"');
      b += r(474, 112, 70, 18, B, 6) + r(474, 170, 262, 34, I, 9) + r(474, 216, 190, 34, I, 9) + r(474, 280, 130, 44, Y, 22);
      b += r(474, 360, 76, 120, B, 10) + r(562, 360, 76, 120, Y, 10) + r(650, 360, 76, 120, I, 10);
    }

    if (kind === 'wp') {
      b += r(40, 62, 120, 20, B, 8) + r(520, 68, 50, 10, G, 5) + r(590, 68, 50, 10, G, 5) + r(660, 68, 50, 10, G, 5);
      b += r(40, 110, 720, 210, T, 18) + c(630, 215, 74, Y) + c(580, 255, 36, B);
      b += r(80, 160, 320, 28, I, 9) + r(80, 202, 250, 28, I, 9) + r(80, 256, 140, 42, B, 21);
      b += [350, 378, 406, 434, 462].map(function (y, i) { return r(40, y, i === 4 ? 280 : 440, 12, i === 0 ? I : G, 6); }).join('');
      b += r(40, 492, 200, 36, Y, 18);
      b += r(530, 350, 230, 180, '#F6F8FC', 12, 'stroke="' + G + '" stroke-width="2"') + r(552, 372, 110, 12, I, 6) + r(552, 400, 186, 10, G, 5) + r(552, 422, 150, 10, G, 5) + r(552, 444, 170, 10, G, 5) + r(552, 478, 90, 30, B, 15);
    }

    var chrome = r(0, 0, 800, 44, '#EEF1F7', 0) + c(24, 22, 6, '#FF6B5B') + c(44, 22, 6, Y) + c(64, 22, 6, GR) + r(100, 12, 420, 20, W, 10);
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560">' + r(0, 0, 800, 560, W, 0) + chrome + b + '</svg>';
  }

  document.querySelectorAll('img[data-mock]').forEach(function (img) {
    if (!img.getAttribute('src')) {
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(mockSVG(img.dataset.mock));
    }
  });

  /* ---------- Lightbox ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.work'));
  var lbEl = document.getElementById('lightbox');
  var lb = new bootstrap.Modal(lbEl);
  var lbImg = document.getElementById('lbImg');
  var lbTitle = document.getElementById('lbTitle');
  var lbDesc = document.getElementById('lbDesc');
  var lbCount = document.getElementById('lbCount');
  var current = 0;

  function show(i) {
    current = (i + items.length) % items.length;
    var item = items[current];
    var img = item.querySelector('img');
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbTitle.textContent = item.dataset.title;
    lbDesc.textContent = item.dataset.desc;
    lbCount.textContent = (current + 1) + ' of ' + items.length;
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () { show(i); lb.show(); });
  });
  document.getElementById('lbPrev').addEventListener('click', function () { show(current - 1); });
  document.getElementById('lbNext').addEventListener('click', function () { show(current + 1); });

  lbEl.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // Swipe on touch screens
  var touchX = null;
  lbEl.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lbEl.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  }, { passive: true });

  /* ---------- Contact form ---------- */
  // There is no server, so the form opens the visitor's email app with the message filled in.
  var form = document.getElementById('contactForm');
  var statusEl = document.getElementById('formStatus');
  var TO = 'sankhasubhrabhandari@gmail.com';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      statusEl.textContent = 'Fill in the highlighted fields.';
      return;
    }
    var d = new FormData(form);
    var subject = 'Project enquiry from ' + d.get('name');
    var body = d.get('message') + '\n\n' + d.get('name') + '\n' + d.get('email');
    window.location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    statusEl.textContent = 'Your email app should open with the message ready to send.';
    form.classList.remove('was-validated');
    form.reset();
  });
})();
