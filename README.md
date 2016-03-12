# pac
A GUI for the Arch Linux package manager `pacman` built with [Electron](http://electron.atom.io/), [React](https://facebook.github.io/react), [Redux](https://github.com/rackt/redux) & [CSS Modules](https://github.com/css-modules/css-modules).

![pac-new-2](https://cloud.githubusercontent.com/assets/3755413/12868021/148a9808-ccfd-11e5-8807-c5c8d9f74f6d.png)

### Ideas used
- This project uses a [topical directory structure](http://marmelab.com/blog/2015/12/17/react-directory-structure.html).

### run it
- `npm install`
- build the app with `npm build:prod`
- start the app with `npm start`

### develop it
- `npm install`
- watch the app with `npm watch:dev`
- start the app with `npm start:dev` in another terminal

### How it works
- it calls pacman commands with node `exec`.
- that's why you have to start the thing with `sudo`. Got a better idea? :)

