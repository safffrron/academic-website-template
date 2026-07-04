/* Efficient AI · IIT Bombay — behaviour
   Deliberately minimal: a header hairline on scroll and a
   scroll-spy for the nav. No ambient animation. */

(() => {
  "use strict";

  /* header hairline */
  const head = document.querySelector(".site-head");
  const onScroll = () => head.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* active nav link */
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
    { rootMargin: "-30% 0px -65% 0px" }
  );

  links.forEach((a) => {
    const section = document.getElementById(a.hash.slice(1));
    if (section) spy.observe(section);
  });
})();
