/* ─────────────────────────────────────────────────────────────
   MAIN APPLICATION CONTROLLER
   Replaces logic previously embedded in cig-website.html
   ───────────────────────────────────────────────────────────── */

/* ─── LOAD PARTIALS ─────────────────────────────────────────── */

// Load NAV
fetch("partials/nav.html")
  .then(response => response.text())
  .then(html => {
    const nav = document.getElementById("nav");
    if (nav) nav.innerHTML = html;
  });

// Load FOOTER
fetch("partials/footer.html")
  .then(response => response.text())
  .then(html => {
    const footer = document.getElementById("footer");
    if (footer) footer.innerHTML = html;
  });


/* ─── PAGE LOADER (SPA ROUTER) ───────────────────────────────── */

function load(page) {
  fetch(`pages/${page}.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Page not found: ${page}`);
      }
      return response.text();
    })
    .then(html => {
      const app = document.getElementById("app");
      if (!app) return;

      // Inject page HTML
      app.innerHTML = html;

      // ✅ ensure page is visible
      const pageEl = app.querySelector('.page');
      if (pageEl) {
        pageEl.classList.add('active');
      }

      // Update nav active state
      document
        .querySelectorAll(".nav-links button")
        .forEach(btn => btn.classList.remove("active"));

      const activeBtn = document.getElementById(`nav-${page}`);
      if (activeBtn) activeBtn.classList.add("active");

      // Scroll to top
      window.scrollTo(0, 0);

      // Re‑init UI interactions (animations, observers)
      if (typeof initInteractions === "function") {
        initInteractions();
      }
    })
    .catch(err => {
      console.error(err);
      const app = document.getElementById("app");
      if (app) {
        app.innerHTML = `
          <section style="padding:6rem 5rem">
            <h2 style="color:var(--teal)">404 — PAGE NOT FOUND</h2>
            <p style="margin-top:1rem;color:rgba(232,240,242,0.6)">
              Requested module could not be loaded.
            </p>
          </section>
        `;
      }
    });
}


/* ─── INITIAL BOOTSTRAP ─────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  load("home");
});