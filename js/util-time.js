/* ─────────────────────────────────────────────
   TIME & STATUS UTILITIES
   Extracted from cig-website.html
   ───────────────────────────────────────────── */

/* ─── LAST SYNC CLOCK ───────────────────────── */

function updateLastSync() {
  const now = new Date();
  const utc =
    now.toISOString()
      .replace('T', ' ')
      .split('.')[0] + ' UTC';

  document
    .querySelectorAll('#last-sync, .last-sync-val')
    .forEach(el => {
      if (el) el.textContent = utc;
    });
}

updateLastSync();
setInterval(updateLastSync, 5000);


/* ─── OMEGA UPTIME COUNTER ───────────────────── */

function updateUptime() {
  // Static origin point to simulate long-running system
  const days = 347;
  const hrs  = 14;
  const mins = 32;

  const baseSeconds =
    (days * 86400) +
    (hrs  * 3600) +
    (mins * 60);

  const nowSeconds = Math.floor(Date.now() / 1000);
  const total = baseSeconds + (nowSeconds % 60);

  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  const el = document.getElementById('uptime-display');
  if (el) {
    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }
}

updateUptime();
setInterval(updateUptime, 1000);


/* ─── CHALLENGE COUNTDOWN (FAKE 4 DAYS) ───────── */

function updateCountdown() {
  const DURATION = 4 * 86400; // 4 days
  const now = Math.floor(Date.now() / 1000);
  const remaining = DURATION - (now % DURATION);

  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;

  const el = document.getElementById('countdown');
  if (el) {
    el.textContent =
      `${String(h).padStart(2,'0')}:` +
      `${String(m).padStart(2,'0')}:` +
      `${String(s).padStart(2,'0')}`;
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);