import _fromPairs from 'lodash/fromPairs';
const exec = window.require('child-process-promise').exec;
import _sortBy from 'lodash/sortBy';
import moment from 'moment';
const format = 'ddd DD MMM YYYY hh:mm:ss Z';

const getPackagesFromStdout = (stdout) => {
  return stdout.trim().split('\n\n')
    .map((packageLines) => _fromPairs(packageLines.split('\n')
        .map((line) => line.split(/\s+\:\s+/))));
};

export const loadPackages = ({aur = false} = {}) => async (dispatch) => {
  const cmd = aur ? 'pacman -Qemi' : 'pacman -Qeni';
  try {
    const {stdout} = await exec(cmd, {maxBuffer: 800 * 1024});
    const packages = getPackagesFromStdout(stdout);

    const packagesParsed = packages.map((pac) => {
      const date = moment(pac['Install Date'], format);
      return {
        description: pac.Description,
        date,
        name: pac.Name,
        size: pac['Installed Size'],
      };
    });
    const packagesDateSorted = _sortBy(packagesParsed, (pac) => pac.date.unix()).reverse();
    const packagesWithDummy = [
    {description: '...', date: moment().subtract(10, 'days'), name: 'Test'},
      ...packagesDateSorted,
    ];
    dispatch({type: 'LOAD_PACKAGES', packages: packagesWithDummy});
  } catch (e) {
    console.error('[index.js] ', e);
  }
};

export const uninstall = (pacName) => async (dispatch) => {
  const cmd = `sudo pacman -Rs --noconfirm ${pacName}`;
  try {
    const {stdout} = await exec(cmd, {capture: ['stdout', 'stderr']});

    const status = {type: 'success', text: stdout.toString()};
    dispatch({type: 'STATUS', status});

    dispatch(loadPackages());
  } catch ({stdout, stderr}) {
    const text = `${stdout.toString()}\n${stderr.toString()}`;
    const status = {text, type: 'error'};
    dispatch({type: 'STATUS', status});
  }
};

export const setStatus = (status) => ({type: 'STATUS', status});


  // [Q]uery
  // [e]xplicitly installed
  // [m] : from aur
  // [i] : info
  // const aurPackages = 'pacman -Qemi';
  // const normalPackages = 'pacman -Qeni';
