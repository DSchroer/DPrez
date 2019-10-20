require("reveal.js/css/reset.css");
require("reveal.js/css/reveal.css");
require("reveal.js/css/theme/white.css");

require("highlight.js/styles/default.css");

const Reveal = require("reveal.js");
window.Reveal = Reveal;

const hljs = require("highlight.js");
hljs.initHighlightingOnLoad();

Reveal.initialize({
  controls: false
});

Reveal.registerPlugin("md", require("reveal.js/plugin/markdown/markdown"));
