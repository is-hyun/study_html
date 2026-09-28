document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".mpl-card");
  const playerTitle = document.querySelector(".song-title");
  const playerArtist = document.querySelector(".song-artist");
  const playerImg = document.querySelector(".pl-info img");

  // 1. 저장된 노래 정보 확인
  const savedTitle = localStorage.getItem("currentTitle");
  const savedArtist = localStorage.getItem("currentArtist");
  const savedImgSrc = localStorage.getItem("currentImgSrc");

  let targetTitle = savedTitle;

  // localStorage에 저장된 값이 없다면 HTML에 적힌 기본 플레이어 정보를 기준으로 삼음
  if (!savedTitle || !savedArtist || !savedImgSrc) {
    targetTitle = playerTitle.innerText; // 기본값 ("Walking with you")
  } else {
    // 저장된 값이 있으면 플레이어 UI를 그 정보로 세팅
    playerTitle.innerText = savedTitle;
    playerArtist.innerText = savedArtist;
    playerImg.src = savedImgSrc;
  }

  // targetTitle과 일치하는 카드에 active-card 클래스 부여
  cards.forEach((card) => {
    const cardName = card.querySelector(".mpl-name").innerText;
    if (cardName === targetTitle) {
      card.classList.add("active-card");
    }
  });

  // 2. 노래 카드 클릭 이벤트
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // 기존에 활성화 해제
      const currentActive = document.querySelector(".mpl-card.active-card");
      if (currentActive) {
        currentActive.classList.remove("active-card");
      }

      // 클릭한 카드에 활성화 클래스 추가
      card.classList.add("active-card");

      // 카드에서 정보 추출
      const clickedName = card.querySelector(".mpl-name").innerText;
      const clickedArtist = card.querySelector(".mpl-artist").innerText;
      const clickedImgSrc = card.querySelector(".mpl-thumb").src;

      // 플레이어 정보 변경
      playerTitle.innerText = clickedName;
      playerArtist.innerText = clickedArtist;
      playerImg.src = clickedImgSrc;

      // 데이터 저장
      localStorage.setItem("currentTitle", clickedName);
      localStorage.setItem("currentArtist", clickedArtist);
      localStorage.setItem("currentImgSrc", clickedImgSrc);
    });
  });
});
