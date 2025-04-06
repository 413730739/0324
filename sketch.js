let btnTamkang, btnTamkangET, btnTamkangET2, btnQuiz; // 新增 btnQuiz 為全域變數
let spriteTamkang, spriteTamkangET, spriteTamkangET2, spriteQuiz; // 新增 spriteQuiz
let spriteIndexTamkang = 0; // 第一個精靈動畫索引
let spriteIndexTamkangET = 0; // 第二個精靈動畫索引
let spriteIndexTamkangET2 = 0; // 第三個精靈動畫索引
let spriteIndexQuiz = 0; // 第四個精靈動畫索引
let spriteTimerTamkang = 0; // 第一個精靈動畫計時器
let spriteTimerTamkangET = 0; // 第二個精靈動畫計時器
let spriteTimerTamkangET2 = 0; // 第三個精靈動畫計時器
let spriteTimerQuiz = 0; // 第四個精靈動畫計時器
let iframeContainer; // 用於顯示網站內容的框
let isHoverTamkang = false; // 是否滑鼠在第一個按鈕上
let isHoverTamkangET = false; // 是否滑鼠在第二個按鈕上
let isHoverTamkangET2 = false; // 是否滑鼠在第三個按鈕上
let isHoverQuiz = false; // 是否滑鼠在第四個按鈕上

function preload() {
  // 載入圖片精靈
  spriteTamkang = loadImage('all.png', () => {
    console.log('all.png 載入成功');
  }, () => {
    console.error('無法載入 all.png，請檢查檔案路徑');
  });

  spriteTamkangET = loadImage('all-2.png', () => {
    console.log('all-2.png 載入成功');
  }, () => {
    console.error('無法載入 all-2.png，請檢查檔案路徑');
  });

  spriteTamkangET2 = loadImage('3.png', () => {
    console.log('3.png 載入成功');
  }, () => {
    console.error('無法載入 3.png，請檢查檔案路徑');
  });

  spriteQuiz = loadImage('4.png', () => {
    console.log('4.png 載入成功');
  }, () => {
    console.error('無法載入 4.png，請檢查檔案路徑');
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background("#b5e2fa"); // 淡藍色背景 (RGB)

  // 建立 "自我介紹" 按鈕
  btnTamkang = createButton('自我介紹');
  btnTamkang.position(20, 50); // 按鈕位置
  styleButton(btnTamkang); // 設定按鈕樣式
  btnTamkang.mousePressed(() => {
    showIframe('./自我介紹.pdf'); // 使用相對路徑顯示 PDF
  });
  btnTamkang.mouseOver(() => isHoverTamkang = true); // 滑鼠移入
  btnTamkang.mouseOut(() => isHoverTamkang = false); // 滑鼠移出

  // 建立 "作品簡介" 按鈕
  btnTamkangET = createButton('作品簡介');
  btnTamkangET.position(20, 120); // 按鈕位置（與上一個按鈕相隔 50）
  styleButton(btnTamkangET); // 設定按鈕樣式
  btnTamkangET.mousePressed(() => {
    showIframe('https://413730739.github.io/1140303/');
  });
  btnTamkangET.mouseOver(() => isHoverTamkangET = true); // 滑鼠移入
  btnTamkangET.mouseOut(() => isHoverTamkangET = false); // 滑鼠移出

  // 建立 "淡江教科" 按鈕
  btnTamkangET2 = createButton('淡江教科');
  btnTamkangET2.position(20, 190); // 按鈕位置（與上一個按鈕相隔 70）
  styleButton(btnTamkangET2); // 設定按鈕樣式
  btnTamkangET2.mousePressed(() => {
    showIframe('https://413730739.github.io/0317/');
  });
  btnTamkangET2.mouseOver(() => isHoverTamkangET2 = true); // 滑鼠移入
  btnTamkangET2.mouseOut(() => isHoverTamkangET2 = false); // 滑鼠移出

  // 建立 "測驗題" 按鈕
  btnQuiz = createButton('測驗題');
  btnQuiz.position(20, 260); // 按鈕位置（與上一個按鈕相隔 70）
  styleButton(btnQuiz); // 設定按鈕樣式
  btnQuiz.mousePressed(() => {
    showIframe('https://413730739.github.io/0310/');
  });
  btnQuiz.mouseOver(() => isHoverQuiz = true); // 滑鼠移入
  btnQuiz.mouseOut(() => isHoverQuiz = false); // 滑鼠移出

  // 建立 iframe 容器
  iframeContainer = createDiv('');
  iframeContainer.style('display', 'none'); // 預設隱藏
  iframeContainer.style('position', 'absolute');
  iframeContainer.style('top', '50%');
  iframeContainer.style('left', '50%');
  iframeContainer.style('width', `${windowWidth * 0.75}px`); // 寬度為視窗的四分之三
  iframeContainer.style('height', `${windowHeight * 0.75}px`); // 高度為視窗的四分之三
  iframeContainer.style('transform', 'translate(-50%, -50%)'); // 置中
  iframeContainer.style('background-color', 'white');
  iframeContainer.style('border', '2px solid black');
  iframeContainer.style('box-shadow', '0px 4px 8px rgba(0, 0, 0, 0.2)');

  // 當視窗大小改變時，更新 iframe 容器的大小
  window.addEventListener('resize', () => {
    iframeContainer.style('width', `${windowWidth * 0.75}px`);
    iframeContainer.style('height', `${windowHeight * 0.75}px`);
  });

  // 加入關閉按鈕
  let closeButton = createButton('關閉');
  closeButton.parent(iframeContainer);
  closeButton.style('position', 'absolute');
  closeButton.style('top', '10px');
  closeButton.style('right', '10px');
  closeButton.mousePressed(() => {
    iframeContainer.style('display', 'none'); // 隱藏框
    iframeContainer.html(''); // 清空內容
  });
}

function draw() {
  background("#b5e2fa"); // 確保背景保持淡藍色

  // 在右上角顯示學號
  fill(0); // 設定文字顏色為黑色
  textSize(20); // 設定文字大小
  textAlign(RIGHT, TOP); // 將文字對齊到右上角
  text("學號：OOOOO0739", width - 20, 20); // 在右上角繪製文字，距離邊緣 20px

  // 顯示第一個按鈕的精靈動畫
  if (isHoverTamkang) {
    displaySprite(spriteTamkang, 18, 1867, 84, 20, 320, spriteIndexTamkang, (index) => spriteIndexTamkang = index, spriteTimerTamkang, (timer) => spriteTimerTamkang = timer);
  }

  // 顯示第二個按鈕的精靈動畫
  if (isHoverTamkangET) {
    displaySprite(spriteTamkangET, 14, 1003, 71, 20, 320, spriteIndexTamkangET, (index) => spriteIndexTamkangET = index, spriteTimerTamkangET, (timer) => spriteTimerTamkangET = timer);
  }

  // 顯示第三個按鈕的精靈動畫
  if (isHoverTamkangET2) {
    displaySprite(spriteTamkangET2, 6, 373, 73, 20, 320, spriteIndexTamkangET2, (index) => spriteIndexTamkangET2 = index, spriteTimerTamkangET2, (timer) => spriteTimerTamkangET2 = timer);
  }

  // 顯示第四個按鈕的精靈動畫
  if (isHoverQuiz) {
    displaySprite(spriteQuiz, 8, 555, 83, 20, 320, spriteIndexQuiz, (index) => spriteIndexQuiz = index, spriteTimerQuiz, (timer) => spriteTimerQuiz = timer);
  }
}

// 顯示精靈動畫的函式
function displaySprite(sprite, frameCount, spriteWidth, spriteHeight, x, y, spriteIndex, updateIndex, spriteTimer, updateTimer) {
  let frameWidth = spriteWidth / frameCount; // 計算每張小圖片的寬度
  if (millis() - spriteTimer > 100) { // 每 100 毫秒切換一張圖片
    spriteIndex = (spriteIndex + 1) % frameCount;
    updateIndex(spriteIndex); // 更新動畫索引
    updateTimer(millis()); // 更新計時器
  }
  image(sprite, x, y, frameWidth, spriteHeight, spriteIndex * frameWidth, 0, frameWidth, spriteHeight);
}

// 顯示 iframe 的函式
function showIframe(url) {
  iframeContainer.html(`<iframe src="${url}" width="100%" height="100%" frameborder="0"></iframe>`);
  iframeContainer.style('display', 'block'); // 顯示框
}

// 設定按鈕樣式的函式
function styleButton(button) {
  button.style('background-color', '#e7c6ff'); // 按鈕背景顏色
  button.style('border', '2px solid #9d4edd'); // 按鈕邊框顏色
  button.style('color', '#240046'); // 按鈕文字顏色
  button.style('font-size', '20px'); // 按鈕文字大小
  button.style('padding', '10px 20px'); // 按鈕內邊距
  button.style('border-radius', '5px'); // 按鈕圓角
  button.style('cursor', 'pointer'); // 滑鼠指標樣式
}
