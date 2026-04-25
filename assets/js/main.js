/* ================================================================
NEXT INDUSTRIES — site scripts
================================================================ */

(function () {
‘use strict’;

/* ———————————————————––
CLOSURE COUNTDOWN
A rolling 34-hour timer. Counts down HH:MM:SS to next closure,
then resets. Seeded by local time so every visitor sees the
same cadence without needing a backend.
———————————————————–– */
var counterEl = document.getElementById(‘closure-counter’);
if (counterEl) {
var INTERVAL_MS = 34 * 60 * 60 * 1000; // 34 hours

```
function tick() {
  var now = Date.now();
  var remainingMs = INTERVAL_MS - (now % INTERVAL_MS);
  var totalSec = Math.floor(remainingMs / 1000);
  var hh = Math.floor(totalSec / 3600);
  var mm = Math.floor((totalSec % 3600) / 60);
  var ss = totalSec % 60;
  counterEl.textContent =
    String(hh).padStart(2, '0') + ':' +
    String(mm).padStart(2, '0') + ':' +
    String(ss).padStart(2, '0');
}

tick();
setInterval(tick, 1000);
```

}

/* ———————————————————––
SCROLL REVEAL
Lightweight: cards fade + lift slightly on first view.
———————————————————–– */
var prefersReduced = window.matchMedia(’(prefers-reduced-motion: reduce)’).matches;

if (!prefersReduced && ‘IntersectionObserver’ in window) {
var revealTargets = document.querySelectorAll(
‘.stat, .force, .replace-card, .tc-pillar, .cc-row’
);

```
revealTargets.forEach(function (el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = 'opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)';
});

var reveal = function (el) {
  var parent = el.parentElement;
  var index = parent ? Array.prototype.indexOf.call(parent.children, el) : 0;
  var delay = Math.min(index * 60, 360);
  el.style.transitionDelay = delay + 'ms';
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
};

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      reveal(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(function (el) { observer.observe(el); });

// Safety fallback — if for any reason the observer doesn't fire
// (print, screenshot tools, some a11y modes), force every target
// visible after a short grace period.
setTimeout(function () {
  revealTargets.forEach(function (el) {
    if (el.style.opacity !== '1') reveal(el);
  });
}, 2500);
```

}

/* ———————————————————––
ANCHOR LINK FOCUS BLUR (mobile)
———————————————————–– */
document.querySelectorAll(‘a[href^=”#”]’).forEach(function (a) {
a.addEventListener(‘click’, function () {
if (document.activeElement && document.activeElement.blur) {
setTimeout(function () { document.activeElement.blur(); }, 400);
}
});
});

/* ———————————————————––
NAV ELEVATION ON SCROLL
———————————————————–– */
var nav = document.querySelector(’.nav’);
if (nav) {
var onScroll = function () {
if (window.scrollY > 120) {
nav.style.boxShadow = ‘0 1px 0 rgba(255,255,255,0.05), 0 10px 30px -20px rgba(0,0,0,0.8)’;
} else {
nav.style.boxShadow = ‘’;
}
};
window.addEventListener(‘scroll’, onScroll, { passive: true });
onScroll();
}

})();