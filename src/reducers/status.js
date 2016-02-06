export default (state = null, action) => {
  switch (action.type) {
    case 'STATUS':
      return action.status;
    default:
      return state;
  }
};
