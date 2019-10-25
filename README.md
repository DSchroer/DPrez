# DPrez

DPrez is a simple to use presentation builder that uses markdown and reveal.js to produce simple yet consistent results.

Features include:

- Syntax Highlights
- Basic Theming
- Offline rendering

### Installation

You can install it via npm as follows:

```
npm install dprez
```

### Usage

DPrez works by reading your `.md` files and creating html presentations out of them.

To separate the file into multiple slides add the magic `<!-- slide -->` comment between them.

Simply point it to the correct file:

```
dprez ./path/to/md [--watch] [--theme <themefile>]
```

Then open the generated html file in your browser.

### Sections

If you want to add a multi part slide, you can use the `<!-- hide -->` comment to add a second stage to a given slide.

### Themes

When generating the presentation it is possible to specify the theme. Theme files have options to configure your presentation and are assumed to be json files.

All properties in a theme file are optional.

```json
{
  "theme": "beige | black | blood | league | moon | night | serif | simple | sky | solarized | white",
  "code-theme": "a11y-dark | a11y-light | agate | an-old-hope | androidstudio | arduino-light | arta | ascetic | atelier-cave-dark | atelier-cave-light | atelier-dune-dark | atelier-dune-light | atelier-estuary-dark | atelier-estuary-light | atelier-forest-dark | atelier-forest-light | atelier-heath-dark | atelier-heath-light | atelier-lakeside-dark | atelier-lakeside-light | atelier-plateau-dark | atelier-plateau-light | atelier-savanna-dark | atelier-savanna-light | atelier-seaside-dark | atelier-seaside-light | atelier-sulphurpool-dark | atelier-sulphurpool-light | atom-one-dark-reasonable | atom-one-dark | atom-one-light | brown-paper | codepen-embed | color-brewer | darcula | dark | darkula | docco | dracula | far | foundation | github-gist | github | gml | googlecode | grayscale | gruvbox-dark | gruvbox-light | hopscotch | hybrid | idea | ir-black | isbl-editor-dark | isbl-editor-light | kimbie.dark | kimbie.light | lightfair | magula | mono-blue | monokai-sublime | monokai | night-owl | nord | obsidian | ocean | paraiso-dark | paraiso-light | pojoaque | purebasic | qtcreator_dark | qtcreator_light | railscasts | rainbow | routeros | school-book | shades-of-purple | solarized-dark | solarized-light | sunburst | tomorrow-night-blue | tomorrow-night-bright | tomorrow-night-eighties | tomorrow-night | tomorrow | vs | vs2015 | xcode | xt256 | zenburn",
  "background": "./image.png",
  "width": 960,
  "height": 700,
  "margin": 0.1,
}
```

### Animations
You can achieve animations by writing special style code that targets particular elements. In this example the hello header is moved in from the right.

```md
## hello

<style>
.present #hello {
  animation-name: example;
  animation-duration: 1s;
}

@keyframes example {
  from {transform: translate(1000px, 0);}
  to {transform: translate(0,0)}
}
</style>
```

For full slide animations you can use:
`section.present.slide-1` assuming that your slide is number 1. Slide numbers begin at 0.

To animate all slides simply use `section.present`.

### Printing

While the generated presentation doesnt have the ability to print, you can use the tool `decktape` to quickly make a pdf from your presentation.
```cmd
npm i decktape
npx decktape ./slides.html out.pdf
```

### Tips And Tricks

* Use `class="stretch"` to make an element fill as much space as possible
* Use `data-src` instead of `src` to lazy load an iframe or video

### Roadmap

The roadmap is in no particular order and may be subject to change.

The current plan is to add:

- JS Plugin support
