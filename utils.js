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
  previewImg,
  iframe,
  overlay
) {
  const originalRect = card.getBoundingClientRect();
  clone.style.top = originalRect.top + "px";
  clone.style.left = originalRect.left + "px";
  clone.style.width = originalRect.width + "px";
  clone.style.height = originalRect.height + "px";

  setTimeout(() => {
    if (githubButton) githubButton.remove();
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

  const rect = card.getBoundingClientRect();
  iframe.style.display = "block";

  clone.style.position = "absolute";
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

  document.body.appendChild(clone);
  overlay.classList.add("active");

  void clone.offsetWidth;

  clone.style.top = "5%";
  clone.style.left = "5%";
  clone.style.width = "90vw";
  clone.style.maxWidth = "90vw";
  clone.style.height = "90vh";

  overlay.addEventListener(
    "click",
    () =>
      overlayOnClickEventListener(
        card,
        clone,
        githubButton,
        previewImg,
        iframe,
        overlay
      ),
    { once: true }
  );
}

function createCard(cardData, customInnerHTML) {
  const card = document.createElement("div");
  card.className = "card shadow-sm m-2";
  card.style.flex = "0 0 320px";
  card.style.display = "flex";
  card.style.flexDirection = "column";
  if (cardData.screenshot) card.dataset.screenshot = cardData.screenshot;
  if (cardData.github) card.dataset.github = cardData.github;
  if (cardData.live) card.dataset.live = cardData.live;

  card.innerHTML = customInnerHTML
    ? customInnerHTML(cardData)
    : defaultCardInnerHTML(cardData);

  card.style.maxWidth = "480px";
  card.style.minWidth = "200px";
  card.style.margin = "0 auto";

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
