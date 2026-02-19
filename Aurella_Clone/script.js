document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 0.8s ease";
  });

  window.addEventListener("scroll", () => {
    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;

      if (top < screenHeight - 100) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
  });
});
