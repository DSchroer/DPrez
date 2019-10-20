const Reveal = require("reveal.js");
window.Reveal = Reveal;

Reveal.initialize({
  controls: false
});

const hljs = require("highlight.js");
hljs.initHighlightingOnLoad();

Reveal.addEventListener("slidechanged", function(event) {

});

function OnSlide(fn) {
  console.log(document.currentScript)
}
window.OnSlide = OnSlide;