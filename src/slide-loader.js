const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const marked = require("marked");

const slideTemplate = fs
  .readFileSync(path.resolve(__dirname, "./page/slide.ejs"))
  .toString();

module.exports.loadSlides = function loadSlides(pathStr, theme) {
  const dir = path.dirname(pathStr);

  const data = fs.readFileSync(pathStr).toString();

  const slideData = data.split(/<!--\s*slide\s*-->/);

  const renderer = new marked.Renderer();

  renderer.image = (href, title, text) => {
    return `<img src="${loadImage(href)}" alt="${text}">`;
  };

  function loadImage(src) {
    if (!src) {
      return;
    }

    const imageLoc = path.resolve(dir, src);
    return (
      "data:image/png;base64, " + fs.readFileSync(imageLoc).toString("base64")
    );
  }

  return slideData
    .map((slide, index) => {
      const fragmentData = slide.split(/<!--\s*hide\s*-->/).map(s => s.trim());
      const mainSlide = fragmentData.splice(0,1)[0];

      return ejs.render(slideTemplate, {
        slide: marked(mainSlide, { renderer: renderer }),
        theme,
        loadImage,
        index,
        fragments: fragmentData.map(frag => marked(frag, { renderer: renderer }))
      });
    })
    .join("\n");
};
