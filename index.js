import { generateCardsIntoSection } from "/utils.js";

const classroomProjects = [
  {
    title: "📝 Exemplo Portfólio Gerado com IA",
    description:
      "Um exemplo de portfólio pessoal simples, com HTML/CSS puro, gerado com a ajuda de inteligência artificial. Uma observação é que fiz esse mesmo prompt em diferentes momentos e o resultado foi praticamente o mesmo (e já encontrei outros portfólios exatamente iguais a este).",
    github: "https://github.com/ArielMAJ/frontend-exploratorio",
    live: "https://frontend-exploratorio.vercel.app/",
    screenshot: "",
  },
  {
    title: "📝 Exemplo Básico HTML/CSS/JS",
    description:
      "Um website simples e construído rapidamente para demonstrar todas as funcionalidades básicas de HTML, CSS e JS e Bootstrap.",
    github: "https://github.com/ArielMAJ/HTML-Website-Example",
    live: "https://example-website.artadevs.tech/",
    screenshot: "",
  },
  {
    title: "📝 Outro Exemplo Básico HTML/CSS/JS",
    description:
      "Um website simples e construído demonstrar todas as funcionalidades básicas de HTML, CSS e JS.",
    github: "https://github.com/ArielMAJ/Exemplos-Web",
    live: "https://exemplos.web.artadevs.tech/",
    screenshot: "",
  },
];

const extraProjects = [
  {
    title: "🚀 Página Inicial do GitHub",
    description:
      "Um repositório especial que altera o que é apresentado na página inicial do GitHub.",
    github: "https://github.com/ArielMAJ/ArielMAJ",
    live: "",
    screenshot: "./assets/special-github-repo.png",
  },
  {
    title: "📚 Portfólio Pessoal Completo",
    description:
      "Um exemplo de portfólio pessoal completo para utilizarem como base.",
    github: "https://github.com/ArielMAJ/arielmaj.github.io",
    live: "https://ariel.artadevs.tech/",
    screenshot: "",
  },
];

function render() {
  generateCardsIntoSection("classroom-projects", classroomProjects);
  generateCardsIntoSection("extra-projects", extraProjects);
}

render();
