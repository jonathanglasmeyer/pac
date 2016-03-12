import _ from 'lodash';
import moment from 'moment';
const exec = window.require('child-process-promise').exec;

const FORMAT = 'ddd DD MMM YYYY hh:mm:ss Z';

const parseStdout = (stdout) => {
  return stdout.trim().split('\n\n')
    .map((packageLines) => _.fromPairs(packageLines.split('\n')
        .map((line) => line.split(/\s+\:\s+/))));
};

/**
 * Calls pacman's command for listing packages, parses stdout
 * and returns a nice list of date sorted package objects.
 */
export const getPackages = async (aur) => {
  const cmd = aur ? 'pacman -Qemi' : 'pacman -Qeni';
  try {
    const {stdout} = await exec(cmd, {maxBuffer: 800 * 1024});
    const packages = parseStdout(stdout);

    const packagesParsed = packages.map((pac) => {
      const date = moment(pac['Install Date'], FORMAT);
      return {
        description: pac.Description,
        date,
        name: pac.Name,
        size: pac['Installed Size'],
      };
    });

    const packagesDateSorted = _.sortBy(packagesParsed, (pac) => pac.date.unix()).reverse();
    return packagesDateSorted;
  } catch (e) {
    console.info('[pacman.js] ', 'e');
  }
};

/**
 * Uninstalls a package and returns a status with success or error information.
 */
export const uninstallPackage = async (packageName) => {
  const cmd = `sudo pacman -Rs --noconfirm ${packageName}`;
  try {
    const msg = 'Not really uninstalling in DEVELOPMENT.';
    const {stdout} = __DEV__ ? {stdout: msg} : await exec(cmd, {capture: ['stdout', 'stderr']});
    return {type: 'success', text: stdout.toString()};
  } catch ({stdout, stderr}) {
    const text = `${stdout.toString()}\n${stderr.toString()}`;
    return {text, type: 'error'};
  }
};

// [Q]uery
// [e]xplicitly installed
// [m] : from aur
// [i] : info
// const aurPackages = 'pacman -Qemi';
// const normalPackages = 'pacman -Qeni';
