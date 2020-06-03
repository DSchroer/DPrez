// @ts-check
const fs = require("fs");
const path = require("path");

/**
 * Loads a theme from a given path
 * @param {string} themePath 
 */
module.exports = function(themePath) {
    let theme = {};
    if (themePath) {
      theme = JSON.parse(fs.readFileSync(themePath).toString()) || {};
      if(theme.background){
        theme.background = path.resolve(path.dirname(themePath), theme.background);
      }
    }
    return theme;
}