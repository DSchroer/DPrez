const Reveal = require("reveal.js");
window.Reveal = Reveal;

Reveal.initialize({
  controls: false
});

Reveal.registerPlugin("md", require("reveal.js/plugin/markdown/markdown"));

const hljs = require("highlight.js");
window.hljs = hljs;
hljs.initHighlightingOnLoad();
