import _fromPairs from 'lodash/fromPairs';
const exec = window.require('child-process-promise').exec;

const getPackagesFromStdout = (stdout) =>
  stdout.split('\n\n')
    .map((packageLines) => _fromPairs(packageLines.split('\n')
        .map((line) => line.split(/\s+\:\s+/))));

export const loadPackages = ({aur = false} = {}) => async (dispatch) => {
  const cmd = aur ? 'pacman -Qemi' : 'pacman -Qeni';
  const {stdout} = await exec(cmd, {maxBuffer: 800 * 1024});
  const packages = getPackagesFromStdout(stdout);
  dispatch({type: 'LOAD_PACKAGES', packages});
};

export const uninstall = (pac) => async (dispatch) => {
  const cmd = `sudo pacman -Rns --noconfirm ${pac.Name}`;
  await exec(cmd);
  dispatch(loadPackages());
};

  // [Q]uery
  // [e]xplicitly installed
  // [m] : from aur
  // [i] : info
  // const aurPackages = 'pacman -Qemi';
  // const normalPackages = 'pacman -Qeni';
