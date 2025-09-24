document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // 一度表示したら監視をやめる
      }
    });
  }, {
    threshold: 0.1  // 10%見えたら発動
  });

  fadeElements.forEach(el => observer.observe(el));
});
