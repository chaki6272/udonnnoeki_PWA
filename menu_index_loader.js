const csvFile = "menu_category.csv";
const imageFolder = "img_cat";

async function loadCategoryCSV() {
  try {
    const res = await fetch(csvFile);
    if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);
    const text = await res.text();
    return text.trim().split('\n').slice(1).map(line => {
      const [cat_no, cat, cat_name, cat_image] = line.split(',');
      return { cat_no, cat, cat_name, cat_image };
    });
  } catch (error) {
    console.error("CSV読み込みに失敗しました:", error);
    const container = document.getElementById('category-container');
    container.innerHTML = `<p style="color:red;">カテゴリー情報の読み込みに失敗しました。</p>`;
    return [];
  }
}

async function renderCategoryList() {
  const container = document.getElementById('category-container');
  const categories = await loadCategoryCSV();
  if (categories.length === 0) return;

  categories.forEach(cat => {
    const link = document.createElement('a');
    link.href = `menu.html?cat=${cat.cat}`;

    const img = document.createElement('img');
    img.src = `${imageFolder}/${cat.cat_image}`;
    img.alt = `${cat.cat_name} の画像`;

    img.onerror = () => {
      img.src = `${imageFolder}/no_image.jpg`;
      img.alt = `${cat.cat_name}（画像なし）`;
    };

    const label = document.createElement('p');
    label.textContent = cat.cat_name;

    link.appendChild(img);
    link.appendChild(label);
    container.appendChild(link);
  });
}

document.addEventListener("DOMContentLoaded", renderCategoryList);
