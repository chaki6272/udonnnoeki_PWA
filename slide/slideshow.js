
// slideshow.js

// ▼ 設定エリア ▼
const imageFolder = 'ss';
const csvFile = `${imageFolder}/ss.csv`;
const slideDelay = 3000;

let currentIndex = 0;
let imageData = [];
let slideInterval;

async function fetchCSV() {
  const res = await fetch(csvFile);
  const text = await res.text();
  return text.trim().split('\n').slice(1).map(line => {
    const [no, ss_name] = line.split(',');
    return { no, ss_name };
  });
}

function createSlideShow(images) {
  const track = document.getElementById('slide-track');
  track.innerHTML = '';

  const loopImages = images.concat(images[0]); // 1枚目のクローン追加

  loopImages.forEach(data => {
    const img = document.createElement('img');
    img.src = `${imageFolder}/${data.ss_name}`;
    img.classList.add('slide-image');
    track.appendChild(img);
  });
}

function moveToSlide(index) {
/*  const track = document.getElementById('slide-track');
  const offsetPercent = index * 100;

  track.style.transition = 'transform 0.6s ease-in-out';
  track.style.transform = `translateX(-${offsetPercent}vw)`;
*/

  const track = document.getElementById('slide-track');
  const slideItems = track.querySelectorAll('.slide-image');
  if (slideItems.length === 0) return;

  // 画像1枚の幅＋margin-right（ここでは8px想定）
  const slideWidth = slideItems[0].offsetWidth + 8;

  const offset = index * slideWidth;

  track.style.transition = 'transform 0.6s ease-in-out';
  track.style.transform = `translateX(-${offset}px)`;

  if (index === imageData.length) {
    setTimeout(() => {
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
      currentIndex = 0;
    }, 700);
  }
}

function startSlideShow() {
  slideInterval = setInterval(() => {
    currentIndex++;
    moveToSlide(currentIndex);
  }, slideDelay);
}

function stopSlideShow() {
  clearInterval(slideInterval);
}

function initSlideShow() {
  fetchCSV().then(images => {
    imageData = images;
    createSlideShow(imageData);
    startSlideShow();

    const container = document.getElementById('slideshow');
    container.addEventListener('mouseenter', stopSlideShow);
    container.addEventListener('mouseleave', startSlideShow);

document.querySelector('.nav.prev').onclick = () => {
  // 「.nav.prev」のボタンがクリックされたとき

  stopSlideShow();
  // 自動スライド（setIntervalなど）を一旦止める

  currentIndex = (currentIndex - 1 + imageData.length) % imageData.length;
  // ★ここが少し複雑
  // 現在の画像インデックスを「1つ前」に戻す
  // -1 すると 0 より小さくなる可能性があるので
  // 画像の総数を加えて（負の数を正の数に変える）→
  // % imageData.length でインデックスを循環させる
  // 例：0 → (0 - 1 + 5) % 5 = 4（最後の画像へ戻る）

  moveToSlide(currentIndex);
  // 指定された画像インデックスのスライドを表示する

  startSlideShow();
  // 自動スライドを再開する
};

    document.querySelector('.nav.next').onclick = () => {
      stopSlideShow();
      currentIndex = (currentIndex + 1) % imageData.length;
      moveToSlide(currentIndex);
        startSlideShow(); // ← 追加
    };
  });
}

document.addEventListener('DOMContentLoaded', initSlideShow);
