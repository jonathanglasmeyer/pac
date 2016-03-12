export default (state = null, action) => {
  switch (action.type) {
    case 'STATUS':
      return {status: action.status};
    default:
      return state;
  }
};
