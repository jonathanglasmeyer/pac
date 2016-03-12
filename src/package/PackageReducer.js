export default (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_PACKAGES':
      return action.packages;
    default:
      return state;
  }
};
