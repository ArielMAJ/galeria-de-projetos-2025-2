import { generateCardsIntoSection } from "/utils.js";

/* Lista de portfólios: adicionem novos itens aqui via PR */
const portfolios = [
  {
    title: "Portfólio em React (TS)",
    description: "",
    github: "https://github.com/ArielMAJ/arielmaj.github.io",
    live: "https://ariel.artadevs.tech/", // URL do site em produção. Se não funcionar, deixe vazio e adicione uma screenshot
    screenshot: "", // URL de imagem opcional; se vazio, será mostrado o iframe do site
    authorName: "Prof. Ariel Menezes",
    authorPhoto: "https://avatars.githubusercontent.com/u/69123486?s=96&v=4", // URL de foto opcional. Utilize o do seu perfil do GitHub.
  },
];

function customInnerHTML(cardData) {
  return `
    <div class="card-body d-flex align-items-start gap-3 p-2">
      ${
        cardData.authorPhoto
          ? `<img src="${cardData.authorPhoto}" alt="${
              cardData.authorName || ""
            }" class="rounded-circle" width="70" height="70">`
          : `<div class="rounded-circle bg-secondary" style="width:70px;height:70px;"></div>`
      }
      <div class="flex-grow-1 text-start">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h3 class="card-title mb-1" style="font-size:0.95rem;">${
              cardData.title
            }</h3>
            ${
              cardData.authorName
                ? `<small class="text-muted d-block mb-1">${cardData.authorName}</small>`
                : ""
            }
          </div>
        </div>
        <p class="card-text text-muted mb-0" style="font-size:0.8rem;">${
          cardData.description || ""
        }</p>
      </div>
    </div>

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

function render() {
  generateCardsIntoSection("portfolios", portfolios, customInnerHTML);
}

render();
