### DPrez

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

### Themes

When generating the presentation it is possible to specify the theme. Theme files have options to configure your presentation and are assumed to be json files.

```json
{
  "background": "./image.png"
}
```

### Roadmap

The roadmap is in no particular order and may be subject to change.

The current plan is to add:

- CSS Theme support
- JS Plugin support
- PDF Rendering
- Better --watch mode
