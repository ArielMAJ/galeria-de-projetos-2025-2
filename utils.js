function defaultCardInnerHTML(cardData) {
  return `
    <h3>${cardData.title}</h3>
    <p>${cardData.description || ""}</p>
    <div class="preview-wrapper">
      <img src="${
        cardData.screenshot || ""
      }" alt="Preview" class="preview-img" />
      <iframe src="" class="preview-iframe"></iframe>
    </div>
    <a class="github-button" href="${
      cardData.github || "#"
    }" target="_blank" rel="noopener noreferrer"></a>
  `;
}

function overlayOnClickEventListener(
  card,
  clone,
  githubButton,
  closeBtn,
  previewImg,
  iframe,
  overlay,
  onKeyDown
) {
  if (onKeyDown) document.removeEventListener("keydown", onKeyDown);

  const originalRect = card.getBoundingClientRect();
  clone.style.top = originalRect.top + "px";
  clone.style.left = originalRect.left + "px";
  clone.style.width = originalRect.width + "px";
  clone.style.height = originalRect.height + "px";

  setTimeout(() => {
    if (githubButton) githubButton.remove();
    if (closeBtn) closeBtn.remove();
  }, 100);

  setTimeout(() => {
    if (previewImg) previewImg.remove();
    if (iframe) iframe.remove();
  }, 300);

  setTimeout(() => {
    clone.remove();
    overlay.classList.remove("active");
  }, 700);
}

function cardOnClickEventListener(card) {
  const clone = card.cloneNode(true);

  const githubButton = clone.querySelector(".github-button");
  const iframe = clone.querySelector("iframe");
  const previewImg = clone.querySelector(".preview-img");
  const previewIframe = clone.querySelector(".preview-iframe");
  const overlay = document.querySelector(".overlay");
  const closeBtn = clone.querySelector(".card-close");

  const rect = card.getBoundingClientRect();
  iframe.style.display = "block";

  clone.style.position = "fixed";
  clone.style.top = rect.top + "px";
  clone.style.left = rect.left + "px";
  clone.style.width = rect.width + "px";
  clone.style.height = rect.height + "px";
  clone.style.margin = 0;
  clone.style.zIndex = 1000;
  clone.style.transition = "all .8s ease";
  clone.style.boxShadow = "0 10px 30px rgba(0,0,0,.2)";
  clone.style.background = getComputedStyle(card).backgroundColor || "#fff";

  if (card.dataset.screenshot) {
    previewImg.src = card.dataset.screenshot;
    previewImg.style.display = "block";
    previewIframe.style.display = "none";
  } else {
    previewIframe.src = card.dataset.live || "";
    previewIframe.style.display = "block";
    previewImg.style.display = "none";
  }

  if (iframe) iframe.src = card.dataset.live || "";
  if (githubButton) {
    githubButton.href = card.dataset.github || "#";
    githubButton.style.display = card.dataset.github ? "block" : "none";
    githubButton.innerText = "Ver no GitHub ↗️";
  }

  closeBtn.style.display = "flex";

  document.body.appendChild(clone);
  overlay.classList.add("active");

  void clone.offsetWidth;

  clone.style.top = "3dvh";
  clone.style.left = "3dvw";
  clone.style.margin = 0;
  clone.style.width = "94dvw";
  clone.style.maxWidth = "94dvw";
  clone.style.height = "94dvh";

  const closeCardEvent = () =>
    overlayOnClickEventListener(
      card,
      clone,
      githubButton,
      closeBtn,
      previewImg,
      iframe,
      overlay,
      onKeyDown
    );

  const onKeyDown = (e) => {
    if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
      closeCardEvent();
    }
  };
  document.addEventListener("keydown", onKeyDown);
  overlay.addEventListener("click", closeCardEvent, { once: true });
  closeBtn.addEventListener("click", closeCardEvent, { once: true });
}

function createCard(cardData, customInnerHTML) {
  const card = document.createElement("div");
  card.className = "card shadow-sm m-0";
  card.style.flex = "0 0 320px";
  card.style.display = "flex";
  card.style.flexDirection = "column";

  if (cardData.screenshot) card.dataset.screenshot = cardData.screenshot;
  if (cardData.github) card.dataset.github = cardData.github;
  if (cardData.live) card.dataset.live = cardData.live;

  card.innerHTML = customInnerHTML
    ? customInnerHTML(cardData)
    : defaultCardInnerHTML(cardData);

  const closeBtn = document.createElement("button");
  closeBtn.className = "card-close";
  closeBtn.type = "button";

  closeBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  `;

  card.appendChild(closeBtn);

  card.addEventListener("click", () => cardOnClickEventListener(card));
  return card;
}

export function generateCardsIntoSection(
  sectionId,
  cardList,
  customInnerHTML = null,
  clearSection = true
) {
  console.log("Generating cards into section:", sectionId);
  const section = document.getElementById(sectionId);
  if (!section) return;

  if (clearSection) section.innerHTML = "";

  cardList.forEach((cardData) => {
    section.appendChild(createCard(cardData, customInnerHTML));
  });
}
