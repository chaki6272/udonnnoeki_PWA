document.addEventListener("DOMContentLoaded", () => {
  const headerArea = document.getElementById("header-area");
  if (headerArea) {
    fetch("header.html")
      .then(res => res.text())
      .then(html => headerArea.innerHTML = html)
      .catch(err => console.error("ヘッダー読み込みエラー:", err));
  }

  const bottomNavArea = document.getElementById("bottom-nav-area");
  if (bottomNavArea) {
    fetch("bottom-nav.html")
      .then(res => res.text())
      .then(html => bottomNavArea.innerHTML = html)
      .catch(err => console.error("ボトムナビ読み込みエラー:", err));
  }

    const FooterArea = document.getElementById("footer-area");
  if (FooterArea) {
    fetch("footer.html")
      .then(res => res.text())
      .then(html => FooterArea.innerHTML = html)
      .catch(err => console.error("フッター読み込みエラー:", err));
  }

    const side_pattern = document.getElementById("side_pattern");
  if (side_pattern) {
    fetch("side_pattern.html")
      .then(res => res.text())
      .then(html => side_pattern.innerHTML = html)
      .catch(err => console.error("サイドパターン読み込みエラー:", err));
  }
});
