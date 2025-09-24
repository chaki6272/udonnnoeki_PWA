const imagePaths = [
/*  'P/image1.jpg',
  'P/image2.jpg',
  'P/image3.jpg',
  'P/image4.jpg',
  'P/image5.jpg'
*/
  'ss_kake.jpg',
  'ss_kimuti-nikujiru.jpg',
  'ss_nibosi-noukou.jpg',
  'ss_niku-kinpira.jpg',
  'ss_nikujiru-aka.jpg',
  'ss_nikujiru.jpg'
];

const container = document.getElementById('slideshow-container');
const toggleButton = document.getElementById('stop-button');

let lastImageIndex = -1;
let loopTimeoutId = null;
let isStopped = false; // false = 動作中、true = 停止中

// ランダム数値生成
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// ランダムフェードクラス選択
function getRandomFadeClass() {
  const effects = ['fade-in', 'zoom-in', 'rotate-in'];
  return effects[Math.floor(Math.random() * effects.length)];
}

// 前回と異なる画像インデックスを取得
function getNextImageIndex() {
  let index;
  do {
    index = Math.floor(Math.random() * imagePaths.length);
  } while (index === lastImageIndex);
  lastImageIndex = index;
  return index;
}

// ランダム画像を表示
function showRandomImage() {
  const img = document.createElement('img');
  img.src = imagePaths[getNextImageIndex()];
  img.className = 'slideshow-image';

  const width = getRandom(100, 300);
  img.style.width = `${width}px`;

  const x = getRandom(window.innerWidth * 0.25, window.innerWidth * 0.75 - width);
  const y = getRandom(window.innerHeight * 0.25, window.innerHeight * 0.75 - width);
  img.style.left = `${x}px`;
  img.style.top = `${y}px`;

  img.classList.add(getRandomFadeClass());
  container.appendChild(img);

  const displayTime = getRandom(3000, 7000);
  setTimeout(() => {
    img.style.opacity = 0;
    setTimeout(() => container.removeChild(img), 1000);
  }, displayTime);
}

// スライドループを実行
function loopRandomImages() {
  if (isStopped) return; // 停止中なら処理しない

  showRandomImage();
  const nextDelay = getRandom(1000, 2000);

  loopTimeoutId = setTimeout(loopRandomImages, nextDelay);
}

toggleButton.addEventListener('click', () => {
  if (!isStopped) {
    // 現在は動作中 → 停止する
    isStopped = true;
    clearTimeout(loopTimeoutId);
    toggleButton.innerText = 'START';

    // ✅ ボタンの色を緑に
    toggleButton.style.background = 'green';
  } else {
    // 現在は停止中 → 再開する
    isStopped = false;
    toggleButton.innerText = 'STOP';
    loopRandomImages();

    // ✅ ボタンの色を赤に戻す
    toggleButton.style.background = 'crimson';
  }
});

// 初期スタート
loopRandomImages();
