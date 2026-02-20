document.addEventListener("DOMContentLoaded", () => {

  /* ===== FORM SUBMIT ===== */
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Form submitted successfully!");
    });
  });

  /* ===== SCROLL ANIMATION ===== */
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 0.8s ease";
  });

  window.addEventListener("scroll", () => {
    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
  });

  /* ===== ADD TO CART ===== */
  document.querySelectorAll(".product-card button").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("✨ Added to cart successfully!");
    });
  });

});