const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const slideTemplate = fs.readFileSync(path.resolve(__dirname, "./slide.ejs")).toString();

module.exports.loadSlides = function loadSlides(path){
    const data = fs.readFileSync(path).toString();
    const slideData = data.split(/<!--\s*slide\s*-->/);

    return slideData.map(slide => ejs.render(slideTemplate, { slide } )).join("\n");
}