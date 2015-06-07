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
    console.info('[PacActions.js] ', 'start');
    exec('pacman -Qeni', {maxBuffer: 800*1024})
      .then(result => {
        console.info('[PacActions.js] ', 'got them from stdout');
        const packages = getPackagesFromStdout(result.stdout);
        console.info('[PacActions.js] ', 'end parsing');
        perform({type: LOAD_PACKAGES, packages});
      })
      .catch(err => console.info('[PacActions.js] ', err));
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
