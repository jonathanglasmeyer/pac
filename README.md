# pac
A GUI for the Arch Linux package manager `pacman`.

![pac-new-2](https://cloud.githubusercontent.com/assets/3755413/12868021/148a9808-ccfd-11e5-8807-c5c8d9f74f6d.png)

### tech used
- [react](https://facebook.github.io/react)
- [redux](https://github.com/gaearon/redux)
- [electron](http://electron.atom.io/)
- CSS modules

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

