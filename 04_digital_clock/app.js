// 상태 관리 변수
let isRunning = false;
let currentMode = "STOP WATCH"; // "STOP WATCH" 또는 "TIMER"

// 스톱워치용 변수
let swStartTime = 0;
let swElapsedTime = 0;
let swTimer = null;

// 타이머용 변수 (5분 = 300초)
const TIMER_DEFAULT_SECONDS = 300;
let timerRemainingSeconds = TIMER_DEFAULT_SECONDS;
let timerInterval = null;

// DOM 요소 선택
const title = document.getElementById("title");
const modeBtn = document.getElementById("mode");
const displayTime = document.getElementById("display-time");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

// ==========================================
// 1. 공통 화면 업데이트 및 포맷 함수
// ==========================================
function renderDisplay() {
  if (currentMode === "STOP WATCH") {
    // 스톱워치 포맷: 00:00:00.00 (밀리초 포함)
    let hour = Math.floor(swElapsedTime / (1000 * 60 * 60));
    let min = Math.floor((swElapsedTime / (1000 * 60)) % 60);
    let sec = Math.floor((swElapsedTime / 1000) % 60);
    let msec = Math.floor((swElapsedTime % 1000) / 10);

    hour = String(hour).padStart(2, "0");
    min = String(min).padStart(2, "0");
    sec = String(sec).padStart(2, "0");
    msec = String(msec).padStart(2, "0");

    displayTime.textContent = `${hour}:${min}:${sec}.${msec}`;
  } else {
    // 타이머 포맷: 00:05:00 (밀리초 제외)
    let hour = Math.floor(timerRemainingSeconds / 3600);
    let min = Math.floor((timerRemainingSeconds % 3600) / 60);
    let sec = timerRemainingSeconds % 60;

    hour = String(hour).padStart(2, "0");
    min = String(min).padStart(2, "0");
    sec = String(sec).padStart(2, "0");

    displayTime.textContent = `${hour}:${min}:${sec}`;
  }
}

// 스톱워치 실시간 업데이트
function updateStopwatch() {
  swElapsedTime = Date.now() - swStartTime;
  renderDisplay();
}

// 타이머 실시간 업데이트 (1초 마다 실행)
function updateTimer() {
  if (timerRemainingSeconds > 0) {
    timerRemainingSeconds--;
    renderDisplay();
  } else {
    // 타이머 종료 시 처리
    clearInterval(timerInterval);
    isRunning = false;
    alert("타이머가 종료되었습니다");
  }
}

// ==========================================
// 2. 이벤트 리스너 설정
// ==========================================

// MODE 버튼 클릭: 스톱워치 <-> 타이머 모드 전환
modeBtn.addEventListener("click", () => {
  if (isRunning) return; 

  if (currentMode === "STOP WATCH") {
    currentMode = "TIMER";
    title.textContent = "TIMER";
    title.classList.add("timer-mode");
  } else {
    currentMode = "STOP WATCH";
    title.textContent = "STOP WATCH";
    title.classList.remove("timer-mode");  
  }
  
  renderDisplay();
});

// START 버튼 클릭
startBtn.addEventListener("click", () => {
  if (isRunning) return;

  if (currentMode === "STOP WATCH") {
    swStartTime = Date.now() - swElapsedTime;
    swTimer = setInterval(updateStopwatch, 10);
  } else {
    // 타이머가 0초라면 시작하지 않음
    if (timerRemainingSeconds <= 0) return;
    timerInterval = setInterval(updateTimer, 1000);
  }
  isRunning = true;
});

// STOP 버튼 클릭
stopBtn.addEventListener("click", () => {
  if (!isRunning) return;

  if (currentMode === "STOP WATCH") {
    clearInterval(swTimer);
    swElapsedTime = Date.now() - swStartTime;
  } else {
    clearInterval(timerInterval);
  }
  isRunning = false;
});

// RESET 버튼 클릭
resetBtn.addEventListener("click", () => {
  isRunning = false;

  if (currentMode === "STOP WATCH") {
    clearInterval(swTimer);
    swStartTime = 0;
    swElapsedTime = 0;
  } else {
    clearInterval(timerInterval);
    timerRemainingSeconds = TIMER_DEFAULT_SECONDS; // 5분(300초)으로 다시 복구
  }

  renderDisplay();
});

// 앱 시작 시 최초 1회 화면 렌더링
renderDisplay();
