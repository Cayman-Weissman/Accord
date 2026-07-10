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

  // ── Model brand grid (homepage) ──────────────────────────────
  const brandGrid = document.getElementById("brand-grid");
  if (brandGrid) {
    const brands = [
      {
        name: "DeepSeek",
        models: [
          { label: "V4 Flash", free: true },
          { label: "V3", free: true },
          { label: "R1", free: false },
          { label: "V4 Pro", free: false },
        ],
      },
      {
        name: "Google AI",
        models: [
          { label: "2.5 Flash-Lite", free: true },
          { label: "2.5 Flash", free: true },
          { label: "2.5 Pro", free: false },
          { label: "3 Pro", free: false },
        ],
      },
      {
        name: "xAI",
        models: [
          { label: "Grok 4 Fast", free: true },
          { label: "Grok 4 Fast Reasoning", free: true },
          { label: "Grok 4.3", free: false },
          { label: "Grok 4.5", free: false },
        ],
      },
      {
        name: "Anthropic",
        models: [
          { label: "Haiku 4.5", free: true },
          { label: "Sonnet 4.5", free: true },
          { label: "Sonnet 5", free: false },
          { label: "Opus 4.8", free: false },
        ],
      },
      {
        name: "OpenAI",
        models: [
          { label: "GPT-5 Nano", free: true },
          { label: "GPT-4o mini", free: true },
          { label: "GPT-5 mini", free: false },
          { label: "GPT-5.6 Sol", free: false },
        ],
      },
    ];

    brands.forEach(function (brand) {
      const row = document.createElement("div");
      row.className = "brand-row card card--elevated";

      const name = document.createElement("span");
      name.className = "brand-row__name";
      name.textContent = brand.name;
      row.appendChild(name);

      brand.models.forEach(function (model) {
        const chip = document.createElement("span");
        chip.className = "chip" + (model.free ? " chip--free" : "");
        chip.textContent = model.label + (model.free ? " · Free" : "");
        row.appendChild(chip);
      });

      brandGrid.appendChild(row);
    });
  }

  // ── Demo model pill rotation ───────────────────────────────
  const demoModel = document.getElementById("demo-model");
  if (demoModel && !prefersReducedMotion) {
    const names = [
      "DeepSeek V4 Flash",
      "Gemini 2.5 Flash",
      "Grok 4 Fast",
      "Claude Haiku 4.5",
      "GPT-5 Nano",
    ];
    var index = 0;

    setInterval(function () {
      index = (index + 1) % names.length;
      demoModel.style.opacity = "0";
      setTimeout(function () {
        demoModel.textContent = names[index];
        demoModel.style.opacity = "1";
      }, 200);
    }, 3200);

    demoModel.style.transition = "opacity 0.2s ease";
  }
})();
