import {LOAD_PACKAGES} from '../constants/ActionTypes';

function getPackagesFromStdout(stdout) {
  return stdout.split('\n').map(line => line.split(' ')[0]);
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

  return async (perform) => {
    exec('pacman -Qen').then(result => {
      const packages = getPackagesFromStdout(result.stdout);
      perform({type: LOAD_PACKAGES, packages});
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
