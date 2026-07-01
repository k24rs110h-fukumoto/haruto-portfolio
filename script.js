const menuCards = document.querySelectorAll(".menu-card");

menuCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.filter = "brightness(1.05)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.filter = "brightness(1)";
  });
});