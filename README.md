# pac
All GUIs for [Arch Linux](https://www.archlinux.org/)'s package manager pacman i tried so far do not show enough love for UI & UX. This is an WIP attempt to fix that.

### using
- [react](https://facebook.github.io/react)
- [redux](https://github.com/gaearon/redux)
- [electron](http://electron.atom.io/)
- [material-ui](http://material-ui.com/#/)
- [radium](http://projects.formidablelabs.com/radium/)

### behind the scenes
- this basically wraps the mystical pacman cli flag-ridden incantations, calling them with nodes `exec`.
- if you want to do stuff with `sudo`, you got to run the whole tool with `sudo`. i'd like to know a better way to programmatically call node's `exec` with sudo rights. anyone?

### first impression:
![pac3a](https://cloud.githubusercontent.com/assets/3755413/8052483/492115d0-0e88-11e5-854b-4c06c9e214b0.png)
![pac3b](https://cloud.githubusercontent.com/assets/3755413/8052484/4921f48c-0e88-11e5-9791-624c43c5046f.png)
