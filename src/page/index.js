const Reveal = require("reveal.js");
window.Reveal = Reveal;

Reveal.initialize({
  controls: false,
  hash: true,
  width: theme.width || 960,
	height: theme.height || 700,
	margin: theme.margin || 0.1,
});
