async function loadCSV(url) {
  const res = await fetch(url);
  const text = await res.text();
  return text.split('\n').slice(1).filter(line => line.trim() !== '').map(line => {
    const [cat_no, cat, name, dashi, normal_price, large_price, image, caption] = line.split(',');
    return { cat_no, cat, name, dashi, normal_price, large_price, image, caption };
  });
}

async function loadCategories(url) {
  const res = await fetch(url);
  const text = await res.text();
  return text.split('\n').slice(1).filter(line => line.trim() !== '').map(line => {
    const [cat_no, cat, cat_name] = line.split(',');
    return { cat_no, cat, cat_name };
  });
}

function formatPrice(price) {
  return price ? parseInt(price).toLocaleString() + "円" : "";
}

function showMenu(menuItems, category) {
  const title = document.getElementById("category-title");
  const grid = document.getElementById("menu-grid");
  if (!title || !grid) return;

  title.textContent = category.cat_name;
  grid.innerHTML = "";

  menuItems
    .filter(item => item.cat === category.cat)
    .forEach(item => {
      const card = document.createElement("div");
      card.className = "menu-card";

      card.innerHTML = `
        <div class="menu-image">
          <img src="img/${item.image}"  class="fade-in-on-scroll" alt="${item.name}">
        </div>
        <div class="menu-text">
          <div class="menu-title">${item.name}</div>
          <div class="menu-title2">${item.dashi}</div>
          <div class="menu-price">
            <span class="price-red">${formatPrice(item.normal_price)}</span><br>
            ${item.large_price ? `<span>大：${formatPrice(item.large_price)}</span>` : ""}
          </div>
          ${item.caption ? `<div class="menu-caption">${item.caption}</div>` : ""}
        </div>
      `;
      grid.appendChild(card);
    });

      //  fade-in 対象を監視してアニメーション有効化
  observeFadeInTargets();
}

async function initMenu() {
  const categories = await loadCategories("menu_category.csv");
  const menuItems = await loadCSV("menu.csv");
//menu-nav の作成
  const nav = document.createElement("nav");
  nav.className = "menu-nav";
//menu-navのボタンの作成
  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category.cat_name;
    btn.onclick = () => showMenu(menuItems, category);
    nav.appendChild(btn);
  });

  const header = document.getElementById("header-area");
  if (header) {
    header.insertAdjacentElement("afterend", nav);
  }

  if (categories.length > 0) {
    showMenu(menuItems, categories[0]);
  }
}

document.addEventListener("DOMContentLoaded", initMenu);
