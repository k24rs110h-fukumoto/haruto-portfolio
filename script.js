document.addEventListener("DOMContentLoaded", async () => {
  await loadHtmlParts();

  initLoading();
  initMenu();
  initFadeAnimation();
  initCurrentView();
  initProfileTabs();
  initProjectCards();
  initResearchCards();
});

async function loadHtmlParts() {
  const includeTargets = document.querySelectorAll("[data-include]");

  for (const target of includeTargets) {
    const filePath = target.getAttribute("data-include");

    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`${filePath} could not be loaded`);
      }

      const html = await response.text();
      target.innerHTML = html;
    } catch (error) {
      console.error(error);
      target.innerHTML = `<p style="color: red;">${filePath} の読み込みに失敗しました</p>`;
    }
  }
}

function initLoading() {
  const loading = document.getElementById("loading");

  if (!loading) return;

  setTimeout(() => {
    loading.classList.add("hide");
  }, 1400);
}

function initMenu() {
  const menuOpen = document.getElementById("menuOpen");
  const menuClose = document.getElementById("menuClose");
  const sideMenu = document.getElementById("sideMenu");
  const menuBg = document.getElementById("menuBg");

  if (!menuOpen || !menuClose || !sideMenu || !menuBg) return;

  function openMenu() {
    sideMenu.classList.add("open");
    menuBg.classList.add("open");
  }

  function closeMenu() {
    sideMenu.classList.remove("open");
    menuBg.classList.remove("open");
  }

  menuOpen.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
  menuBg.addEventListener("click", closeMenu);

  document.querySelectorAll(".side-menu a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function initFadeAnimation() {
  const fadeTargets = document.querySelectorAll(".fade-section");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-show", entry.isIntersecting);
      });
    },
    { threshold: 0.25 }
  );

  fadeTargets.forEach((target) => fadeObserver.observe(target));
}

function initCurrentView() {
  const currentView = document.getElementById("currentView");
  const sections = document.querySelectorAll(".section-view");

  if (!currentView || sections.length === 0) return;

  const sectionNames = {
    welcome: "WELCOME",
    home: "HOME",
    profile: "PROFILE",
    projects: "PROJECTS",
    research: "RESEARCH",
    skills: "SKILLS",
    experience: "EXPERIENCE",
    contact: "CONTACT",
  };

  const viewObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentView.textContent =
            sectionNames[entry.target.id] || entry.target.id.toUpperCase();
        }
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((section) => viewObserver.observe(section));
}

function initProfileTabs() {
  const profileSection = document.querySelector("#profile");

  if (!profileSection) return;

  const tabButtons = profileSection.querySelectorAll("[data-profile-tab]");
  const panels = profileSection.querySelectorAll("[data-profile-content]");

  if (tabButtons.length === 0 || panels.length === 0) return;

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.profileTab;

      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      panels.forEach((panel) => {
        panel.classList.remove("active");
      });

      button.classList.add("active");

      const targetPanel = profileSection.querySelector(
        `[data-profile-content="${target}"]`
      );

      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });
}