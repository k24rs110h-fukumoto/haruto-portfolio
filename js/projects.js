const projectCards = [
  {
    category: "unity",
    image: "assets/images/projects/card-quest1.png",
    popupImage: "assets/images/projects/card-quest1.png",
  },
  {
    category: "web",
    image: "assets/images/projects/card-quest2.png",
    popupImage: "assets/images/projects/card-quest2.png",
  },
  {
    category: "unity",
    image: "assets/images/projects/card-quest3.png",
    popupImage: "assets/images/projects/card-quest3.png",
  },
  {
    category: "unity",
    image: "assets/images/projects/card-quest4.png",
    popupImage: "assets/images/projects/card-quest4.png",
  },
];

function initProjectCards() {
  const projectCardRow = document.getElementById("projectCardRow");
  const projectTabs = document.querySelectorAll(".project-tab");
  const scrollLeftBtn = document.getElementById("projectScrollLeft");
  const scrollRightBtn = document.getElementById("projectScrollRight");

  const projectModal = document.getElementById("projectModal");
  const projectModalBg = document.getElementById("projectModalBg");
  const projectModalClose = document.getElementById("projectModalClose");
  const projectModalImage = document.getElementById("projectModalImage");

  if (!projectCardRow || projectTabs.length === 0) return;

  function openProjectModal(cardData) {
    if (!projectModal || !projectModalImage) return;

    projectModalImage.src = cardData.popupImage || cardData.image;
    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");
  }

  function closeProjectModal() {
    if (!projectModal || !projectModalImage) return;

    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    setTimeout(() => {
      projectModalImage.src = "";
    }, 250);
  }

  function renderProjectCards(category = "all") {
    projectCardRow.innerHTML = "";

    const filteredCards =
      category === "all"
        ? projectCards
        : projectCards.filter((card) => card.category === category);

    filteredCards.forEach((cardData) => {
      const card = document.createElement("button");
      card.className = "project-card";
      card.type = "button";

      card.innerHTML = `
        <img src="${cardData.image}" alt="Project Card">
      `;

      card.addEventListener("click", () => {
        openProjectModal(cardData);
      });

      projectCardRow.appendChild(card);
    });
  }

  projectTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      projectTabs.forEach((button) => button.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.dataset.category;
      renderProjectCards(category);

      projectCardRow.scrollLeft = 0;
    });
  });

  if (scrollLeftBtn) {
    scrollLeftBtn.addEventListener("click", () => {
      projectCardRow.scrollBy({
        left: -330,
        behavior: "smooth",
      });
    });
  }

  if (scrollRightBtn) {
    scrollRightBtn.addEventListener("click", () => {
      projectCardRow.scrollBy({
        left: 330,
        behavior: "smooth",
      });
    });
  }

  if (projectModalBg) {
    projectModalBg.addEventListener("click", closeProjectModal);
  }

  if (projectModalClose) {
    projectModalClose.addEventListener("click", closeProjectModal);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProjectModal();
    }
  });

  renderProjectCards();
}