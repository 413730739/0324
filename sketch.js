let btnTamkang, btnTamkangET;
let spriteTamkang, spriteTamkangET; // 精靈圖片
let spriteIndexTamkang = 0; // 第一個精靈動畫索引
let spriteIndexTamkangET = 0; // 第二個精靈動畫索引
let spriteTimerTamkang = 0; // 第一個精靈動畫計時器
let spriteTimerTamkangET = 0; // 第二個精靈動畫計時器
let iframeContainer; // 用於顯示網站內容的框
let isHoverTamkang = false; // 是否滑鼠在第一個按鈕上
let isHoverTamkangET = false; // 是否滑鼠在第二個按鈕上

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
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background("#b5e2fa"); // 淡藍色背景 (RGB)

  // 建立 "淡江大學" 按鈕
  btnTamkang = createButton('自我介紹');
  btnTamkang.position(20, 50); // 按鈕位置
  styleButton(btnTamkang); // 設定按鈕樣式
  btnTamkang.mousePressed(() => {
    showIframe('https://www.tku.edu.tw/');
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
  let btnTamkangET2 = createButton('淡江教科');
  btnTamkangET2.position(20, 190); // 按鈕位置（與上一個按鈕相隔 70）
  styleButton(btnTamkangET2); // 設定按鈕樣式
  btnTamkangET2.mousePressed(() => {
    showIframe('https://413730739.github.io/0317/');
  });

  // 建立 iframe 容器
  iframeContainer = createDiv('');
  iframeContainer.style('display', 'none'); // 預設隱藏
  iframeContainer.style('position', 'absolute');
  iframeContainer.style('top', '50%');
  iframeContainer.style('left', '50%');
  iframeContainer.style('width', '1500px');
  iframeContainer.style('height', '800px');
  iframeContainer.style('transform', 'translate(-50%, -50%)'); // 置中
  iframeContainer.style('background-color', 'white');
  iframeContainer.style('border', '2px solid black');
  iframeContainer.style('box-shadow', '0px 4px 8px rgba(0, 0, 0, 0.2)');

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

  // 顯示第一個按鈕的精靈動畫
  if (isHoverTamkang) {
    displaySprite(spriteTamkang, 18, 1867, 84, 20, 320, spriteIndexTamkang, (index) => spriteIndexTamkang = index, spriteTimerTamkang, (timer) => spriteTimerTamkang = timer);
  }

  // 顯示第二個按鈕的精靈動畫
  if (isHoverTamkangET) {
    displaySprite(spriteTamkangET, 14, 1003, 71, 20, 320, spriteIndexTamkangET, (index) => spriteIndexTamkangET = index, spriteTimerTamkangET, (timer) => spriteTimerTamkangET = timer);
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
