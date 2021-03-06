const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const marked = require("marked");

const slideTemplate = fs
  .readFileSync(path.resolve(__dirname, "./page/slide.ejs"))
  .toString();

function loadImage(src) {
  if (!src) {
    return;
  }

  const imageLoc = path.resolve(src);
  return (
    "data:image/png;base64, " + fs.readFileSync(imageLoc).toString("base64")
  );
};

module.exports.loadImage = loadImage;

module.exports.loadSlides = (pathStr, themeBuilder) => {
  const dir = path.dirname(pathStr);

  const data = fs.readFileSync(pathStr).toString();

  const slideData = data.split(/<!--\s*slide\s*-->/);

  const renderer = new marked.Renderer();

  renderer.code = (code, language) => {
    const highlight = require("highlight.js");
    const adjustedCode = highlight.highlight(language, code);
    return `<pre><code class="hljs language-${language}">${adjustedCode.value}</code></pre>`
  }

  renderer.image = (href, title, text) => {
    if (href && path.extname(href) === ".svg") {
      return loadSVG(href);
    }
    return `<img src="${loadImage(href)}" alt="${text}">`;
  };

  function loadSVG(src) {
    const imageLoc = path.resolve(dir, src);
    return fs.readFileSync(imageLoc).toString();
  }

  return slideData
    .map((slide, index) => {
      const fragmentData = slide.split(/<!--\s*hide\s*-->/).map(s => s.trim());
      const mainSlide = fragmentData.splice(0, 1)[0];

      const markedOptions = {
        renderer: renderer,
      };

      return ejs.render(slideTemplate, {
        slide: marked(mainSlide, markedOptions),
        themeBuilder,
        loadImage,
        index,
        fragments: fragmentData.map(frag => marked(frag, markedOptions))
      });
    })
    .join("\n");
};
