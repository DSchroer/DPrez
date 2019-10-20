const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const marked = require("marked");

const slideTemplate = fs
  .readFileSync(path.resolve(__dirname, "./slide.ejs"))
  .toString();

module.exports.loadSlides = function loadSlides(path, theme) {
  const data = fs.readFileSync(path).toString();
  if (theme) {
    theme = JSON.parse(fs.readFileSync(theme).toString()) || {};
  } else {
    theme = {};
  }

  const slideData = data.split(/<!--\s*slide\s*-->/);

  return slideData
    .map(slide => ejs.render(slideTemplate, { slide: marked(slide), theme }))
    .join("\n");
};
