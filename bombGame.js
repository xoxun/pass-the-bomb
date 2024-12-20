document.addEventListener("DOMContentLoaded", () => {
  const maxTimeInput = document.getElementById("maxTime");
  const startButton = document.getElementById("startButton");
  const statusDisplay = document.getElementById("status");
  const timerDisplay = document.getElementById("timer");

  const audioContainer = document.getElementById("audioContainer"); // 오디오 컨테이너
  const audioSource = document.getElementById("audioSource"); // 소리 파일 source 태그
  const bombImage = document.getElementById("bomb_img"); // 폭탄 이미지
  const settingContainer = document.getElementById("game-setting"); // 폭탄 이미지

  const defaultBombImage =
    "https://xoxun.github.io/pass-the-bomb/assets/bomb_img2.png"; // 터지는 순간 이미지
  const explosionBombImage =
    "https://xoxun.github.io/pass-the-bomb/assets/bomb_img3.png"; // 터지는 순간 이미지

  let countdownInterval; // 타이머 Interval
  let explosionTimeout; // 폭발 Timeout

  startButton.addEventListener("click", startGame);

  // 오디오 재생 함수
  function playAudio(fileName, loop = false) {
    audioSource.src = `assets/${fileName}.mp3`; // 소리 파일 경로 설정
    audioContainer.loop = loop; // 반복 여부 설정
    audioContainer.load(); // 오디오 파일 다시 로드
    audioContainer.play();
  }

  // 오디오 멈춤 함수
  function stopAudio() {
    audioContainer.pause();
    audioContainer.currentTime = 0; // 소리 시작점 초기화
  }

  function startGame() {
    // 기존 타이머 정리
    clearInterval(countdownInterval);
    clearTimeout(explosionTimeout);

    bombImage.src = defaultBombImage;

    // 최대 시간 설정 (최소 10초)
    const maxTime = Math.max(10, parseInt(maxTimeInput.value));
    const randomTime = Math.floor(Math.random() * (maxTime - 10 + 1)) + 10;

    // 초기 상태 설정
    let remainingTime = randomTime;
    statusDisplay.textContent = "폭탄이 곧 터집니다...";
    timerDisplay.textContent = `남은 시간: ${remainingTime}초`;

    // 카운트다운 소리 재생
    playAudio("count-down", true);
    settingContainer.style.display = "none";

    // 타이머 카운트다운
    countdownInterval = setInterval(() => {
      remainingTime -= 1;
      timerDisplay.textContent = `남은 시간: ${remainingTime}초`;
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    // 랜덤 시간 후 폭발 처리
    explosionTimeout = setTimeout(() => {
      clearInterval(countdownInterval);

      stopAudio(); // 카운트다운 소리 중지
      playAudio("explosion"); // 폭발 소리 재생
      settingContainer.style.display = "flex";

      bombImage.src = explosionBombImage; // 터지는 이미지로 변경
      statusDisplay.textContent = "💥 폭탄이 터졌습니다! 💥";
      timerDisplay.textContent = "게임 종료!";
    }, randomTime * 1000);
  }
});
