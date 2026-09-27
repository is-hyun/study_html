document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".mpl-card");
  const playerTitle = document.querySelector(".song-title");
  const playerArtist = document.querySelector(".song-artist");
  // 💡 [추가] 하단 플레이어의 이미지 태그를 선택합니다.
  const playerImg = document.querySelector(".pl-info img");

  // 1. [불러오기] 저장된 노래 정보, 아티스트, 이미지 주소 확인
  const savedTitle = localStorage.getItem("currentTitle");
  const savedArtist = localStorage.getItem("currentArtist");
  // 💡 [추가] 저장되어 있던 이미지 주소를 불러옵니다.
  const savedImgSrc = localStorage.getItem("currentImgSrc");

  if (savedTitle && savedArtist && savedImgSrc) {
    playerTitle.innerText = savedTitle;
    playerArtist.innerText = savedArtist;
    // 💡 [추가] 플레이어 이미지를 저장된 주소로 복구합니다.
    playerImg.src = savedImgSrc;

    // 페이지가 새로 열렸을 때, 저장된 노래 제목과 일치하는 카드에 활성화 클래스 부여
    cards.forEach((card) => {
      const cardName = card.querySelector(".mpl-name").innerText;
      if (cardName === savedTitle) {
        card.classList.add("active-card");
      }
    });
  }

  // 2. 노래 카드 클릭 이벤트
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // 기존에 선택되어 있던 다른 카드의 색상을 원래대로 돌려놓습니다.
      const currentActive = document.querySelector(".mpl-card.active-card");
      if (currentActive) {
        currentActive.classList.remove("active-card");
      }

      // 방금 내가 클릭한 카드에 선택 클래스를 붙여 색상을 고정합니다.
      card.classList.add("active-card");

      // 카드에서 정보 추출
      const clickedName = card.querySelector(".mpl-name").innerText;
      const clickedArtist = card.querySelector(".mpl-artist").innerText;
      // 💡 [추가] 클릭한 카드의 이미지(.mpl-thumb) 주소(src)를 뽑아옵니다.
      const clickedImgSrc = card.querySelector(".mpl-thumb").src;

      // 플레이어 정보 변경
      playerTitle.innerText = clickedName;
      playerArtist.innerText = clickedArtist;
      // 💡 [추가] 플레이어 이미지를 방금 가져온 주소로 교체합니다.
      playerImg.src = clickedImgSrc;

      // 데이터 저장 (새로고침/페이지 이동 시 유지용)
      localStorage.setItem("currentTitle", clickedName);
      localStorage.setItem("currentArtist", clickedArtist);
      // 💡 [추가] 뽑아온 이미지 주소도 함께 저장소에 기록합니다.
      localStorage.setItem("currentImgSrc", clickedImgSrc);
    });
  });
});
