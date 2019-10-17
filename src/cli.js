#!/usr/bin/env node

const commander = require('commander');
const program = new commander.Command();
program.version(require("../package.json").version);
program.arguments('<slides>');
program.option('-w, --watch', 'watch mode')
program.action((slides) => {
    
    run(slides, program.watch);
});

const wp = require("webpack");
const configBuilder = require("./wp-config");
const sl = require("./slide-loader");
const path = require("path");

function run(slides, watch){
    const outPath = path.resolve(path.dirname(slides), path.basename(slides, path.extname(slides)) + ".html")
    const config = configBuilder(() => sl.loadSlides(slides), outPath);
    const compiler = wp(config);

    if(watch){
        compiler.watch({
            aggregateTimeout: 60,
            poll: undefined
        }, (err, stats) => {
            if(err){
                error(err);
            }
            console.log(stats.toString());
        })
    }else{
        compiler.run((err, stats) => {
            if(err){
                error(err);
            }
            console.log(stats.toString());
        });
    }
}

function error(err){
    console.error(err);
    process.exit(1);
}

program.parse(process.argv);
