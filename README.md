# pac
A GUI for the Arch Linux package manager `pacman`.
![pac-new](https://cloud.githubusercontent.com/assets/3755413/12867963/b8587984-ccfb-11e5-8fe6-ce0b16f390c4.png)

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

