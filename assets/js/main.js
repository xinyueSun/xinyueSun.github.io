(function () {
  "use strict";

  const root = document.documentElement;
  const navbar = document.querySelector("#navbar");
  const navToggle = document.querySelector("#nav-toggle");
  const navMenu = document.querySelector("#nav-menu");
  const themeToggle = document.querySelector("#theme-toggle");
  const year = document.querySelector("#year");

  if (year) year.textContent = new Date().getFullYear();

  const getSavedTheme = () => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    const icon = themeToggle?.querySelector("i");
    const nextTheme = theme === "light" ? "dark" : "light";

    if (icon) icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
    if (themeToggle) themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
  };

  let currentTheme = getSavedTheme();
  setTheme(currentTheme);

  themeToggle?.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(currentTheme);
    try {
      localStorage.setItem("theme", currentTheme);
    } catch {
      // The theme still works when storage is unavailable.
    }
  });

  const closeNavigation = () => {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    navMenu.classList.remove("is-open");
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navMenu?.classList.toggle("is-open", !isOpen);
  });

  navMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth < 980 && navbar && !navbar.contains(event.target)) closeNavigation();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 980) closeNavigation();
  });

  let lastScrollY = window.scrollY;
  let scrollFrame = null;
  window.addEventListener("scroll", () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      navbar?.classList.toggle("scrolled", currentScrollY > 10);

      if (navbar && window.innerWidth < 980) {
        const menuIsOpen = navToggle?.getAttribute("aria-expanded") === "true";
        const shouldHide = currentScrollY > lastScrollY && currentScrollY > 120 && !menuIsOpen;
        navbar.style.transform = shouldHide ? "translateY(-100%)" : "translateY(0)";
      } else if (navbar) {
        navbar.style.transform = "";
      }

      lastScrollY = currentScrollY;
      scrollFrame = null;
    });
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-25% 0px -65%", threshold: 0 });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const newsToggle = document.querySelector("#news-toggle");
  const extraNews = document.querySelectorAll(".news-extra");
  newsToggle?.addEventListener("click", () => {
    const isExpanded = newsToggle.getAttribute("aria-expanded") === "true";
    newsToggle.setAttribute("aria-expanded", String(!isExpanded));
    newsToggle.classList.toggle("expanded", !isExpanded);
    extraNews.forEach((item) => { item.hidden = isExpanded; });

    const label = newsToggle.querySelector("span");
    if (label) label.textContent = isExpanded ? "Show More News" : "Show Less News";
  });

  const yearFilter = document.querySelector("#year-filter");
  const ccfFilter = document.querySelector("#ccf-filter");
  const typeFilter = document.querySelector("#type-filter");
  const filterReset = document.querySelector("#filter-reset");
  const publications = [...document.querySelectorAll(".pub-item")];
  const visibleCount = document.querySelector("#visible-count");

  const applyPublicationFilters = () => {
    const selectedYear = yearFilter?.value || "all";
    const selectedCcf = ccfFilter?.value || "all";
    const selectedType = typeFilter?.value || "all";
    let count = 0;

    publications.forEach((publication) => {
      const yearMatches = selectedYear === "all" || publication.dataset.year === selectedYear;
      const ccfMatches = selectedCcf === "all" || publication.dataset.ccf === selectedCcf;
      const typeMatches = selectedType === "all" || publication.dataset.type === selectedType;
      const isVisible = yearMatches && ccfMatches && typeMatches;
      publication.classList.toggle("is-filtered-out", !isVisible);
      if (isVisible) count += 1;
    });

    if (visibleCount) visibleCount.textContent = String(count);
  };

  yearFilter?.addEventListener("change", applyPublicationFilters);
  ccfFilter?.addEventListener("change", applyPublicationFilters);
  typeFilter?.addEventListener("change", applyPublicationFilters);
  filterReset?.addEventListener("click", () => {
    if (yearFilter) yearFilter.value = "all";
    if (ccfFilter) ccfFilter.value = "all";
    if (typeFilter) typeFilter.value = "all";
    applyPublicationFilters();
  });
})();
