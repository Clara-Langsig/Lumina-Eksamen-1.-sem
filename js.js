// js.js
// Purpose: Handles interactive behavior (menu, search, sliders, likes, carousel)

// Simple console log to confirm that the file is loaded correctly
console.log("js.js er loadet");

/* -------- BURGER MENU: OPEN AND CLOSE SLIDE-IN PANEL -------- */

function openMenu() {
  const navPanel = document.getElementById("navPanel");
  if (navPanel) {
    navPanel.classList.add("nav-panel--open");
  }
}

function closeMenu() {
  const navPanel = document.getElementById("navPanel");
  if (navPanel) {
    navPanel.classList.remove("nav-panel--open");
  }
}

/* -------- SEARCH OVERLAY TOGGLE -------- */

const searchBtn = document.getElementById("searchBtn");
const searchBar = document.getElementById("searchBar");

if (searchBtn && searchBar) {
  // Toggle the search overlay when clicking the search icon
  searchBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevents click from reaching the document listener
    searchBar.classList.toggle("active");
  });

  // Clicking outside the search field closes the overlay
  document.addEventListener("click", (e) => {
    if (
      searchBar.classList.contains("active") &&
      !searchBar.contains(e.target) &&
      !searchBtn.contains(e.target)
    ) {
      searchBar.classList.remove("active");
    }
  });

  // Pressing Escape also closes the search overlay
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchBar.classList.remove("active");
    }
  });
}

/* -------- CTA BUTTON -------- */

const ctaBtn = document.getElementById("ctaBtn");
if (ctaBtn) {
  ctaBtn.addEventListener("click", () => {
    // In a real project this would navigate to the product page
    alert("Jeg sender brugeren til produktsiden");
  });
}

/* -------- LIKE BUTTONS ON PRODUCT CARDS -------- */

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Image element inside the button
    const img = btn.querySelector(".heart-icon");

    // Toggle CSS class and swap the image source between red and black heart
    if (btn.classList.toggle("liked")) {
      img.src = "images/like.png"; // Filled red heart
    } else {
      img.src = "images/unlike.png"; // Outline / black heart
    }
  });
});

/* -------- PRODUCT CARDS RANGE SLIDER / CUSTOM SCROLLBAR -------- */

const cardSlider = document.getElementById("cardSlider");
const cardsTrack = document.querySelector(".cards-track");
const cardsViewport = document.querySelector(".cards-viewport");

if (cardSlider && cardsTrack && cardsViewport) {
  const updateCardsPosition = () => {
    // Maximum scroll distance is full track width minus viewport width
    const maxScroll = cardsTrack.scrollWidth - cardsViewport.clientWidth;

    // If everything fits, do not scroll
    if (maxScroll <= 0) {
      cardsTrack.style.transform = "translateX(0)";
      return;
    }

    // Slider value is between 0 and 100, convert to 0–1
    const percent = cardSlider.value / cardSlider.max;
    const offset = -maxScroll * percent;

    // Move the track horizontally using CSS transform
    cardsTrack.style.transform = `translateX(${offset}px)`;
  };

  // Update position when user moves the slider
  cardSlider.addEventListener("input", updateCardsPosition);

  // Also recompute on window resize (e.g. when viewport width changes)
  window.addEventListener("resize", updateCardsPosition);

  // Initial position
  updateCardsPosition();
}

/* -------- SOCIAL CAROUSEL ARROWS -------- */

const socialWrapper = document.querySelector(".social-carousel-wrapper");
const socialPrev = document.getElementById("socialPrev");
const socialNext = document.getElementById("socialNext");

if (socialWrapper && socialPrev && socialNext) {
  // Calculate how far to scroll: roughly 1.5 card widths per click
  const scrollAmount = () => {
    const card = socialWrapper.querySelector(".social-card");
    return card ? card.clientWidth * 1.5 : 300;
  };

  // Scroll to the right when clicking the "next" arrow
  socialNext.addEventListener("click", () => {
    socialWrapper.scrollBy({
      left: scrollAmount(),
      behavior: "smooth",
    });
  });

  // Scroll to the left when clicking the "previous" arrow
  socialPrev.addEventListener("click", () => {
    socialWrapper.scrollBy({
      left: -scrollAmount(),
      behavior: "smooth",
    });
  });
}
