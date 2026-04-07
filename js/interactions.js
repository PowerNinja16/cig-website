/* ─────────────────────────────────────────────
   UI INTERACTIONS & ANIMATIONS
   Extracted from cig-website.html
   ───────────────────────────────────────────── */

/* 
  This function MUST be called after
  dynamic page loads (load('page'))
*/
function initInteractions() {

  /* ─── SCROLL‑IN ANIMATIONS ───────────────── */

  const animatedElements = document.querySelectorAll(
    '.stat-cell, .feature-card, .challenge-item, .perf-cell, .team-card'
  );

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    observer.observe(el);
  });
}

/* ─── INITIAL RUN ─────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initInteractions();
});