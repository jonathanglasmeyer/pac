import {LOAD_PACKAGES} from '../constants/ActionTypes';
import _ from 'lodash';

function getPackagesFromStdout(stdout) {
  console.info('[PacActions.js] ', 'start');
  return stdout.split('\n\n')
    .map(packageLines => _.zipObject(packageLines.split('\n')
        .map(line => line.split(/\s+\:\s+/))))

}

// http://nodejs.org/api.html#_child_processes
// debugger;
const exec = window.require('child-process-promise').exec;

// // executes `pwd`
//   sys.print('stdout: ' + stdout);
//   sys.print('stderr: ' + stderr);
//   if (error !== null) {
//     console.log('exec error: ' + error);
//   }


export function loadPackages() {
  return perform => {
    // [Q]uery 
    // [e]xplicitly installed 
    // [m] : from aur
    // [i] : info
    exec('pacman -Qemi').then(result => {
      const packages = getPackagesFromStdout(result.stdout);
      console.info('[PacActions.js] ', 'end');
      perform({type: LOAD_PACKAGES, packages});
    });
  };
}

export function uninstall(package_) {
  return perform => {
    exec('ls').then(({stdout}) => {
      console.info('[PacActions.js] ', stdout);
      perform(loadPackages());
    });
  };
}


// export function incrementIfOdd() {
//   return (perform, { counter }) => {
//     if (counter % 2 === 0) {
//       return;
//     }
//     perform(increment());
//   };
// }

// export function increment() {
//   return {
//     type: LOAD_PACKAGES
//   };
// }

// export function incrementAsync() {
//   return perform => {
//     setTimeout(() => {
//       perform(increment());
//     }, 1000);
//   };
// }

// export function decrement() {
//   return {
//     type: DECREMENT_COUNTER
//   };
// }
