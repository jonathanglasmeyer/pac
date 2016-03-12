import _ from 'lodash';
import moment from 'moment';
const exec = window.require('child-process-promise').exec;

const FORMAT = 'ddd DD MMM YYYY hh:mm:ss Z';

const parseStdout = (stdout) => {
  return stdout.trim().split('\n\n')
    .map((packageLines) => _.fromPairs(packageLines.split('\n')
        .map((line) => line.split(/\s+\:\s+/))));
};

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
