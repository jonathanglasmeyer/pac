export default (state = [], action) => {
  switch (action.type) {
    case 'LOAD_PACKAGES':
      return action.packages;
    default:
      return state;
  }
};
