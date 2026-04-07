/* ── Typing animation ── */
const phrases = [
  "Statistics & Analytics Student",
  "Data Analyst",
  "Quantitative Researcher",
  "UNC Chapel Hill · Class of 2027",
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById("typed");

function type() {
  const current = phrases[phraseIdx];
  if (deleting) {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, 500);
      return;
    }
    setTimeout(type, 40);
  } else {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 2200);
      return;
    }
    setTimeout(type, 75);
  }
}
setTimeout(type, 800);

/* ── Navbar: scroll shadow + active link ── */
const navbar  = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id], header[id]");

window.addEventListener("scroll", () => {
  // shadow on scroll
  navbar.classList.toggle("scrolled", window.scrollY > 20);

  // active section highlight
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}, { passive: true });

/* ── Scroll reveal (Intersection Observer) ── */
const revealEls = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      revealObs.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);
revealEls.forEach(el => revealObs.observe(el));

/* ── Animated counters ── */
function animateCounter(el) {
  const target   = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals  || "0");
  const suffix   = el.dataset.suffix || "";
  const duration = 1600;
  const start    = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = value.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterEls  = document.querySelectorAll(".stat-num[data-target]");
const counterObs  = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  }),
  { threshold: 0.5 }
);
counterEls.forEach(el => counterObs.observe(el));

/* ── Footer year ── */
document.getElementById("year").textContent = new Date().getFullYear();
