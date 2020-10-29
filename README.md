# kz-map-overlay

A Vue-powered overlay intended for CSGO KZ streamers.

---

### Installation

1. Make sure below requirements are met.
2. Download and install [GSISocket](https://bitbucket.org/Sikarii/gsisocket).
3. Download the [latest release](https://bitbucket.org/Sikarii/kz-map-overlay/downloads).
4. Add `index.html` to your streaming software as a browser source.

### Configuration

Everything meant to be configured can be found under [/conf/](src/conf/), this includes the following:

- [The template](src/conf/template.js.html) for the overlay.
- [Configuration file](src/conf/config.js) for settings.
- [Components](src/conf/components/) for components such as the record row.

**Keep in mind that any files in `/conf/` do not get transpiled by babel, so make sure the features are available in older versions of browsers, OBS for example currently runs Chrome 75**.

### Components

- Any components can be made freely and have all features of Vue2.
- These components, as noted above, **do not get transpiled by Babel**.
- New components must be added to `componentsToLoad` in [the config file](src/conf/config.js).

### Building

1. Make sure [Node](https://nodejs.org) is installed.
2. Clone this repository.
3. Run `npm install` inside the cloned repository.
4. Run `npm run build` after node_modules are installed.
5. You're done, the build result will be under `/build/`.

Alternatively run `npm run dev` if you're looking to test changes locally.  
This will watch the source files for any changes and compile on changes for you.
