/* Efficient AI · IIT Bombay — behaviour
   1. Header hairline appears on scroll.
   2. Nav link tracks the section in view.
   3. Sparse-matrix ornament: a pruned grid where one weight
      occasionally decays and another regrows. */

(() => {
  "use strict";

  /* ---- 1. header hairline ---- */
  const head = document.querySelector(".site-head");
  const onScroll = () => head.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- 2. active nav link ---- */
  const links = [...document.querySelectorAll(".site-nav a")];
  const byId = new Map(links.map((a) => [a.hash.slice(1), a]));

  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const link = byId.get(entry.target.id);
        if (!link) continue;
        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    },
    { rootMargin: "-35% 0px -60% 0px" }
  );

  links.forEach((a) => {
    const section = document.getElementById(a.hash.slice(1));
    if (section) spy.observe(section);
  });

  /* ---- 3. sparse ornament ---- */
  const host = document.getElementById("sparse-ornament");
  if (!host) return;

  const COLS = 13;
  const ROWS = 5;
  const LIT = 11;

  // deterministic PRNG so the pattern is the same on every visit
  let seed = 11;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    const row = document.createElement("div");
    row.className = "o-row";
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement("i");
      row.appendChild(cell);
      cells.push(cell);
    }
    host.appendChild(row);
  }

  const active = new Set();
  while (active.size < LIT) active.add(Math.floor(rnd() * cells.length));
  active.forEach((i) => cells[i].classList.add("on"));

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  setInterval(() => {
    const on = [...active];
    const off = cells.map((_, i) => i).filter((i) => !active.has(i));
    const drop = on[Math.floor(rnd() * on.length)];
    const grow = off[Math.floor(rnd() * off.length)];
    active.delete(drop);
    active.add(grow);
    cells[drop].classList.remove("on");
    cells[grow].classList.add("on");
  }, 2400);
})();
