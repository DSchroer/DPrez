#!/usr/bin/env node

const commander = require("commander");
const program = new commander.Command();
program.version(require("../package.json").version);
program.arguments("<slides>");
program.option("-w, --watch", "watch mode");
program.option("-p, --port <port>", "watch server port");
program.option("-t, --theme <theme>", "theme");
program.action(slides => {
  run(slides, program.watch, program.theme);
});

if (!process.argv.slice(2).length) {
  program.help();
}

const wp = require("webpack");
const configBuilder = require("./webpack-config");
const sl = require("./slide-loader");
const path = require("path");
const fs = require("fs");
var liveServer = require("live-server");
const themeLoaderFn = require("./theme-loader");

function run(slides, watch, themePath) {

  const themeLoader = themeLoaderFn.bind(undefined, themePath);

  global.title = () => path.basename(slides, path.extname(slides));
  global.slides = () => sl.loadSlides(slides, themeLoader);

  global.theme = () => themeLoader().theme || "white";
  global.themeValue = () => themeLoader();
  global.codeTheme = () => themeLoader()["code-theme"] || "default";

  const watchPaths = [slides];
  if(themePath){
    watchPaths.push(themePath);
  }

  const config = configBuilder(watchPaths);
  const compiler = wp(config);

  if (watch) {

    var params = {
      host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
      port: program.port,
      open: true, // When false, it won't load your browser by default.
      file: `${title()}.html`, // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    };

    let started = false;
    compiler.watch(
      {
        aggregateTimeout: 60,
        poll: undefined
      },
      (err, stats) => {
        if (err) {
          error(err);
        }
        
        if(!started){
          liveServer.start(params);
          started = true;
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
