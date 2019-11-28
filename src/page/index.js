const Reveal = require("reveal.js");
window.Reveal = Reveal;

var sections = document.getElementsByTagName("section");
Array.from(sections).forEach(section => {
  section.setAttribute("data-background-image", background);
});

Reveal.initialize({
  controls: false,
  hash: true,
  overview: false,
  width: theme.width || 960,
	height: theme.height || 700,
	margin: theme.margin || 0.1,
});