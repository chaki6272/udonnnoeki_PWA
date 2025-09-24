// fadein.js

function observeFadeInTargets() {
  const targets = document.querySelectorAll('.fade-in-on-scroll:not(.visible)');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // 1回表示で停止
      }
    });
  }, {
    threshold: 0.1
  });

  targets.forEach(target => observer.observe(target));
}

// 初回ロード時にも実行（初期表示分）
document.addEventListener("DOMContentLoaded", () => {
  observeFadeInTargets();
});
