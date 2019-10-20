#!/usr/bin/env node

const commander = require("commander");
const program = new commander.Command();
program.version(require("../package.json").version);
program.arguments("<slides>");
program.option("-w, --watch", "watch mode");
program.option("-t, --theme <theme>", "theme");
program.action(slides => {
  run(slides, program.watch, program.theme);
});

if (!process.argv.slice(2).length) {
  program.help();
}

const wp = require("webpack");
const configBuilder = require("./wp-config");
const sl = require("./slide-loader");
const path = require("path");
const fs = require("fs");

function run(slides, watch, theme) {

  if (theme) {
    theme = JSON.parse(fs.readFileSync(theme).toString()) || {};
  } else {
    theme = {};
  }

  globalThis.slides = () => sl.loadSlides(slides, theme);
  globalThis.theme = () => theme.theme || "white";
  globalThis.codeTheme = () => theme["code-theme"] || "default";
  globalThis.title = () => path.basename(slides, path.extname(slides));

  const outPath = path.resolve(
    path.dirname(slides),
    path.basename(slides, path.extname(slides)) + ".html"
  );
  const config = configBuilder(outPath);
  const compiler = wp(config);

  if (watch) {
    compiler.watch(
      {
        aggregateTimeout: 60,
        poll: undefined
      },
      (err, stats) => {
        if (err) {
          error(err);
        }
        console.log(stats.toString());
      }
    );
  } else {
    compiler.run((err, stats) => {
      if (err) {
        error(err);
      }
      console.log(stats.toString());
    });
  }
}

function error(err) {
  console.error(err);
  process.exit(1);
}

program.parse(process.argv);
