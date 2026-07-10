/**
 * Accord marketing site — minimal interactions
 */

(function () {
  "use strict";

  // ── Config (edit before deploy) ──────────────────────────────
  const CONFIG = {
    // Set your App Store URL when the app is live, e.g.:
    // appStoreURL: "https://apps.apple.com/app/idXXXXXXXXX",
    appStoreURL: "",
  };

  // ── Footer year ──────────────────────────────────────────────
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // ── App Store link ─────────────────────────────────────────
  const storeLink = document.getElementById("app-store-link");
  if (storeLink && CONFIG.appStoreURL) {
    storeLink.href = CONFIG.appStoreURL;
  } else if (storeLink) {
    storeLink.addEventListener("click", function (e) {
      e.preventDefault();
      storeLink.textContent = "Coming soon to the App Store";
      storeLink.style.opacity = "0.7";
      setTimeout(function () {
        storeLink.textContent = "Download on the App Store";
        storeLink.style.opacity = "";
      }, 2500);
    });
  }

  // ── Mobile nav ─────────────────────────────────────────────
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ── Scroll reveal ────────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

})();
