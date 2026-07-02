const projectCards = [
  {
    category: "unity",
    image: "assets/images/projects/card-quest1.png",
    link: "./projects/quest1.html",
  },
  {
    category: "web",
    image: "assets/images/projects/card-quest2.png",
    link: "./projects/quest2.html",
  },
  {
    category: "unity",
    image: "assets/images/projects/card-quest3.png",
    link: "./projects/quest3.html",
  },
  {
    category: "app",
    image: "assets/images/projects/card-quest4.png",
    link: "./projects/quest4.html",
  },
];

function initProjectCards() {
  const projectCardRow = document.getElementById("projectCardRow");
  const projectTabs = document.querySelectorAll(".project-tab");
  const scrollLeftBtn = document.getElementById("projectScrollLeft");
  const scrollRightBtn = document.getElementById("projectScrollRight");

  if (!projectCardRow || projectTabs.length === 0) return;

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
        if (cardData.link) {
          window.location.href = cardData.link;
        }
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

  renderProjectCards();
}